<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Listing;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BookingController extends Controller
{
     public function booking(Request $request, $id)
    {
        $listing = Listing::with('images','user')->findOrFail($id);

        return Inertia::render('Host/BookingCard', [
            'listing' => $listing,
            'from' => $request->from,
            'to' => $request->to,
            'adult' => $request->adult,
        ]);
    }
public function store(Request $request, Listing $listing)
{
    $validated = $request->validate([
        'from' => 'required|date',
        'to' => 'required|date',
        'adult' => 'required|integer|min:1',
        'payment_method' => 'required|in:cash,card',
        'message_to_host' => 'nullable|string|max:1000',
    ]);

    if (!auth()->check()) {
        return redirect()->route('login');
    }

    $startDate = Carbon::parse($validated['from'])->toDateString();
    $endDate = Carbon::parse($validated['to'])->toDateString();

    if ($endDate <= $startDate) {
        $endDate = Carbon::parse($startDate)->addDay()->toDateString();
    }

    $hasConflict = Booking::where('listing_id', $listing->id)
        ->whereIn('booking_status', ['pending', 'confirmed'])
        ->whereNull('cancelled_at')
        ->where(function ($q) use ($startDate, $endDate) {
            $q->where('start_date', '<', $endDate)
              ->where('end_date', '>', $startDate);
        })
        ->exists();

    if ($hasConflict) {
        return back()->withErrors([
            'date' => 'Сонгосон хугацаанд захиалга байна.'
        ]);
    }

    $nights = Carbon::parse($startDate)->diffInDays($endDate);
    $totalPrice = $nights * $listing->price_per_day;

    $booking = Booking::create([
        'user_id' => auth()->id(),
        'listing_id' => $listing->id,
        'start_date' => $startDate,
        'end_date' => $endDate,
        'total_price' => $totalPrice,
        'booking_status' => 'pending',
        'is_paid' => false,
    ]);

    if ($request->payment_method === 'card') {
        return redirect()->route('payment.page', $booking->id);
    }

    return redirect()->route('booking.confirmation', $booking->id);
}
    public function confirmation(Booking $booking)
    {
        abort_unless($booking->user_id === auth()->id(), 403);

        $booking->load('listing');

        return Inertia::render('Host/Confirmation', [
            'booking' => $booking,
        ]);
    }
    // action badge update hiij bga heseg
    public function updateStatus(Request $request, Booking $booking)
{
    $request->validate([
        'booking_status' => 'required|in:pending,confirmed,cancelled,completed',
    ]);

    // зөвшөөрөл шалгах (маш чухал)
    if ($booking->listing->user_id !== auth()->id()) {
        abort(403);
    }

    // статус солих
    $booking->update([
        'booking_status' => $request->booking_status,
    ]);

    return back();
}
}