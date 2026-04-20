<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Listing;
use App\Models\Review;
use App\Models\Booking;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateMoreInfo(Request $request)
    {
        $user = $request->user();

        $data = $request->all();

        if ($request->hasFile('avatar')) {

            if ($user->avatar && \Storage::disk('public')->exists($user->avatar)) {
                \Storage::disk('public')->delete($user->avatar);
            }

            $path = $request->file('avatar')->store('avatars', 'public');

            $data['avatar'] = $path;
        }

        $user->update($data);

        return back()->with('success', 'Амжилттай хадгаллаа');
    }


     public function profile()
    {
        return Inertia::render('Host/profile');
    }
    public function dashboard()
    {
        $user = auth()->user();

        $listings = Listing::all(); 
        $reviews = Review::all();
        $bookings = Booking::all();

        return Inertia::render('admin/Dashboard', [
            'auth' => ['user' => $user],
            'listings' => $listings,
            'reviews' => $reviews,
            'bookings' => $bookings,
        ]);
    }
}