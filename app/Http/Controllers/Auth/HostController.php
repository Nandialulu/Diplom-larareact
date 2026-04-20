<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class HostController extends Controller
{

    public function hostDashBoard()
    {
    $user = auth()->user();

    // herve host bish bol host boloh form ywuulah
    if (!$user->isHost()) {
        return Inertia::render('Auth/BecomeHost');
    }
    return Inertia::render('Host/Dashboard');
    }

    // Phone + location ilgeeh 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:20',
            'location' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        // 
        $exists = User::where('phone', $validated['phone'])
                          ->where('location', $validated['location'])->where('id', '!=', auth()->id())
                          ->exists();
        if($exists){
            return back()->withErrors([
                'phone'=>'Энэ утасны дугаар болон байршлын хослол бүртгэлтэй байна.',
                'location'=>'Энэ утасны дугаар болон байршлын хослол бүртгэлтэй байна.'
            ]);
        }
        $user = auth()->user();
        $user->phone = $validated['phone'];
        $user->location = $validated['location'];
        $user->role = 'host';
        $user->save();

        return redirect()->route('host.dashboard')
            ->with('success', 'Таны role шинэчлэгдлээ: ' . $user->role);
    }
        public function profile()
        {
            $user = auth()->user();

            if ($user->role !== 'host') {
                abort(403, 'Зөвхөн host хандах боломжтой.');
            }
            
            return Inertia::render('Host/profile', [
                'user' => $user,
            ]);
        }
}
