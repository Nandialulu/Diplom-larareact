<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use Carbon\Carbon;
use App\Models\Booking;

class ReviewController extends Controller
{
public function store(Request $request)
{
    $request->validate([
        'listing_id' => 'required',
        'booking_id' => 'required',
        'rating' => 'required|integer|min:1|max:5',
    ]);

    $booking = Booking::findOrFail($request->booking_id);

    // Энэ booking-д хамааралтай хүн мөн үү?
    if (!in_array(auth()->id(), [$booking->user_id, $booking->host_id])) {
        abort(403);
    }

    //  хоногийн шалгалт одоогоор өдөр тооцоогүй
    if (now()->gt(Carbon::parse($booking->checkout_date)->addDays())) {
        return back()->withErrors(['msg' => 'Review хугацаа дууссан']);
    }

    //  Давхар review хийхгүй
    $exists = Review::where('booking_id', $booking->id)
        ->where('user_id', auth()->id())
        ->exists();

    if ($exists) {
        return back()->withErrors(['msg' => 'Та аль хэдийн review бичсэн байна']);
    }

    //  Type тодорхойлох
    $type = auth()->id() == $booking->user_id
        ? 'guest_to_host'
        : 'host_to_guest';

    // Review хадгалах (publish хийхгүй!)
    $review = Review::create([
        'user_id'=> auth()->id(),
        'listing_id' => $request->listing_id,
        'booking_id' => $request->booking_id,
        'rating' => $request->rating,
        'comment' => $request->comment,
        'type' => $type,
        'published_at' => null
    ]);

    //Blind publish шалгах
    $this->publishIfReady($booking->id);

    return back()->with('success', 'Амжилттай');
}
    private function publishIfReady($bookingId)
    {
        $reviews = Review::where('booking_id', $bookingId)->get();

        //  Хоёулаа бичсэн бол
        if ($reviews->count() == 2) {
            foreach ($reviews as $r) {
                $r->update(['published_at' => now()]);
            }
            return;
        }

        //  14 хоног болсон бол ганцыг publish
        $booking = Booking::find($bookingId);

        if (now()->gt(
            Carbon::parse($booking->checkout_date)->addDays()
        )) {
            foreach ($reviews as $r) {
                if (!$r->published_at) {
                    $r->update(['published_at' => now()]);
                }
            }
        }
    }
      public function show(Booking $booking)
    {
        $booking->load([
            'listing',
            'reviews.user'
        ]);
        return Inertia::render('Review/Show', [
        'booking' => $booking,
        'reviews' => $booking->reviews,
        'auth' => auth()->user(),
        ]);
    }
}
