<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Listing;
use App\Models\Review;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $listings = Listing::where('user_id', $user->id)->get();

        $reviews = Review::whereIn('listing_id', $listings->pluck('id'))
            ->with('user')
            ->latest()
            ->get();
        return Inertia::render('Host/Dashboard', [
            'auth' => [
                'user' => $user
            ],
            'listings' => $listings,
            'reviews' => $reviews,
        ]);
    }
}
