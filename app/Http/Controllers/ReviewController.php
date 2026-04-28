<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use App\Models\Booking;
use Carbon\Carbon;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $booking = Booking::with('listing')->findOrFail($request->booking_id);
        $userId = auth()->id();

        $isGuest = $userId == $booking->user_id;
        $isHost = $userId == $booking->listing->user_id;

        if (!$isGuest && !$isHost) {
            abort(403);
        }

        $checkoutDate = $booking->checkout_date ?? $booking->end_date;
// 
        if (now()->gt(Carbon::parse($checkoutDate)->addDays(1))) {
            return back()->withErrors([
                'msg' => 'Review бичих хугацаа дууссан байна.'
            ]);
        }

        $exists = Review::where('booking_id', $booking->id)
            ->where('user_id', $userId)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'msg' => 'Та аль хэдийн сэтгэгдэл бичсэн байна.'
            ]);
        }
        $type = $isGuest ? 'guest_to_host' : 'host_to_guest';
        Review::create([
            'user_id' => $userId,
            'listing_id' => $booking->listing_id,
            'booking_id' => $booking->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'type' => $type,
            'published_at' => null,
        ]);
        $this->publishIfReady($booking->id);
        return back()->with('success', 'Сэтгэгдэл амжилттай хадгалагдлаа.');
    }
        private function publishIfReady($bookingId)
        {
            $booking = Booking::findOrFail($bookingId);
            $reviews = Review::where('booking_id', $bookingId)->get();

            if ($reviews->count() >= 2) {
                Review::where('booking_id', $bookingId)
                    ->update(['published_at' => now()]);
                return;
            }

            $checkoutDate = $booking->checkout_date ?? $booking->end_date;

            if (now()->gt(Carbon::parse($checkoutDate)->addDays())) {
                Review::where('booking_id', $bookingId)
                    ->whereNull('published_at')
                    ->update(['published_at' => now()]);
            }
        }
    // host, guest setgegdel bichih
    public function show(Booking $booking)
{
    $booking->load([
        'listing',
        'listing.user',
        'user',
        'reviews.user'
    ]);

    $userId = auth()->id();

    $isGuest = $userId == $booking->user_id;
    $isHost = $userId == $booking->listing->user_id;

    if (!$isGuest && !$isHost) {
        abort(403);
    }

    return Inertia::render('Review/Show', [
        'booking' => $booking,
        'reviews' => $booking->reviews()
            ->with('user')
            ->latest()
            ->get(),
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}
    public function guestReview()
    {
        $userId = auth()->id();

        $reviews = Review::with(['user', 'listing', 'booking'])
            ->whereHas('booking', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->where('type', 'host_to_guest')
            ->latest()
            ->get();

        return Inertia::render('Guest/Review', [
            'reviews' => $reviews,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
public function hostReview()
{
    $hostId = auth()->id();

    $reviews = Review::with(['user', 'listing', 'booking'])
        ->where('type', 'guest_to_host')
        ->whereHas('listing', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })
        ->latest()
        ->get();

    return Inertia::render('Host/Review', [
        'reviews' => $reviews,
    ]);
}
}