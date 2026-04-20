<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class UserController extends Controller
{
    public function profile(){
          $user = auth()->user();

        return Inertia::render('Guest/profile', [
            'user' => $user
        ]);
    }
    
}
