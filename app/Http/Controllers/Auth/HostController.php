<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HostController extends Controller
{
    
     public function hostDashBoard()
    {
        return Inertia::render('hostDashboard_CRUD/hostDashBoard');

    }
    public function create(){
        return Inertia::render('hostDashboard_CRUD/Create');
    }
    
    public function store(Request $request)
    {
         $validated = $request->validate([
            'phone' => 'required|string|max:20',
            'location' => 'required|string|max:255',
        ]);

        $user = auth()->user();
        $user->role = 'host';    
        $user->phone = $validated['phone'];
        $user->location = $validated['location'];
        $user->save();
        return redirect()->route('host.Dashboard');
    }
}
