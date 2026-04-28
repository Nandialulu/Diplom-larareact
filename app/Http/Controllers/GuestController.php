<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Review;
use App\Models\Booking;

class GuestController extends Controller
{
    // guestiin zahialgiin medeelel
  public function Mybooking(Request $request)
    {
        $user = auth()->user();

        $bookings = $user->bookings()
            ->with(['listing:id,title,price_per_day'])->latest()->paginate(10);
    // booking render hiih 
        return Inertia::render('Guest/Mybooking', [
            'bookings' => $bookings,
        ]);
    }
    // guest-iin review harah
    public function review(Request $request)
    {
        $user = auth()->user();
        $reviews = $user->reviews()->with('listing:id,title')->latest()->get();
        return Inertia::render('Guest/Review', [
            'reviews' => $reviews,
        ]);
    }
    // undsen medeelel harah 
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $bookings = Booking::with('listing')>where('user_id', $user->id)->latest()->get();

        $reviews = Review::where('user_id', $user->id)->latest()->get();

        return Inertia::render('Guest/Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'bookings' => $bookings,
            'reviews' => $reviews,
        ]);
    }
    // zahiagalga tsutslah
    public function cancelBooking($id)
    {
        $user = auth()->user();
        // firstOrfail-Нөхцөлтэй хайлт хийх
        $booking = Booking::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        if (in_array($booking->booking_status, ['cancelled', 'completed'])) {
            return back()->with('error', 'Энэ захиалгыг цуцлах боломжгүй.');
        }

        $booking->update([
            'booking_status' => 'cancelled',
        ]);
        return back()->with('success', 'Захиалга амжилттай цуцлагдлаа.');
    }
}