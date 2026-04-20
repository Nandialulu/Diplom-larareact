<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\Review;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'hosts' => User::where('role', 'host')->count(),
                'guests' => User::where('role', 'user')->count(),
                'bookings' => Booking::count(),
                'listings' => Listing::count(),
                'revenue' => Booking::where('is_paid', 1)->sum('total_price'),
            ]
        ]);
    }
    public function guest()
    {
        $guests = User::where('role', 'user')->withCount('bookings')->latest()->get();
        return Inertia::render('admin/allGuest', [
            'guests' => $guests,
        ]);
    }

    public function host()
    {
        $hosts=User::where('role', 'host')->withCount('bookings')->latest()->get();
        return Inertia::render('admin/allHost',[
            'hosts' => $hosts,
        ]);
    }

    public function listing()
    {
        $listings=Listing::latest()->get();
        return Inertia::render('admin/allListing', [
            'listings' => $listings,
    ]);
    }

    public function AllBooking()
    {
        return Inertia::render('admin/AllBooking');
    }

    public function Bookingstory()
    {
        return Inertia::render('admin/Bookingstory');
    }

    public function AddCategory()
    {
        return Inertia::render('admin/AddCategory');
    }
    public function DetailGuest($id)
    {
        $guest = User::with('reports')
            ->withCount([
                'bookings',
                'cancelled',
                'pending',
                'reports'
            ])
            ->findOrFail($id);

        // risk score (simple MVP)
        $risk = 'low';

        if ($guest->cancelled_bookings_count > 3 || $guest->reports_count > 2) {
            $risk = 'medium';
        }

        if ($guest->reports_count > 5) {
            $risk = 'high';
        }

        $guest->risk_score = $risk;

        return Inertia::render('admin/DetailGuest', [
            'guest' => $guest
        ]);
    }
    // niit une bodoh
    public function DetailHost($id)
    {
        $host = User::with(['listings', 'reports', 'bookings', 'reviews'])->withCount(['listings', 'bookings', 'reports','bookings','cancelled','pending', 'reports'])->findOrFail($id);

        $host->total_earnings = $host->bookings->sum('total_price');

        $host->rating = round($host->reviews->avg('rating') ?? 0, 1);

        $risk = 'low';

        if (
            $host->reports_count > 2 ||
            $host->cancelled_bookings_count > 5
        ) {
            $risk = 'medium';
        }

        if (
            $host->reports_count > 5 ||
            $host->cancelled_bookings_count > 10
        ) {
            $risk = 'high';
        }

        $host->risk_score = $risk;
        return Inertia::render('admin/DetailHost', [
            'host' => $host
        ]);
    }
    public function Detaillisting($id){
        $listing = Listing::with('host:id,name,created_at', 'user', 'images')->findOrFail($id);

    return Inertia::render('admin/Detaillisting', [
        'listing' => $listing
    ]);
    }
    // asuudaltai harah
    public function updateStatus(Request $request, $id)
    {
        $guest = User::findOrFail($id);

        $request->validate([
            'status' => 'required|in:active,inactive,banned',
        ]);

        $guest->status = $request->status;
        $guest->save();

        return back()->with('success', 'Төлөв амжилттай шинэчлэгдлээ');
    }   
    // liting ustgah, pause hiih, zereg uildel hiij bna
    public function reject($id)
        {
            $listing = Listing::findOrFail($id);
            $listing->status = 'rejected';
            $listing->save();

            return back();
        }

        public function pause($id)
        {
            $listing = Listing::findOrFail($id);
            $listing->status = 'paused';
            $listing->save();

            return back();
        }

        public function destroy($id)
        {
            $listing = Listing::findOrFail($id);
            $listing->delete();
            return back();
        }
}