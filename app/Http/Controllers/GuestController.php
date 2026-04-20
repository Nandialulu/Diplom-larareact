<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Review;
use App\Models\Booking;

class GuestController extends Controller
{
  public function Mybooking(Request $request)
    {
        $user = auth()->user();

        $bookings = $user->bookings()
            ->with(['listing:id,title,price_per_day'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Guest/Mybooking', [
            'bookings' => $bookings,
        ]);
    }

    public function review(Request $request)
    {
        $user = auth()->user();

        $reviews = $user->reviews()
            ->with('listing:id,title')
            ->latest()
            ->get();

        return Inertia::render('Guest/Review', [
            'reviews' => $reviews,
        ]);
    }
      public function dashboard(Request $request)
    {
        $user = $request->user();

        $bookings = Booking::with('listing')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $reviews = Review::where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Guest/Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'bookings' => $bookings,
            'reviews' => $reviews,
        ]);
    }
}