<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function index(){
        return Inertia::render('Listing/Listing', [
            'title' => 'Байрнууд',
            'location' => 'Хан-Уул дүүрэг',
            'price' => 15000,
            'star' => 5,
        ]);
    }
}

