<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;
use Inertia\Inertia;
// ene controller in home.jsx ruu listing ugugdliig damjuulj baina
class HomeController extends Controller
{
    public function index(){
        $listings = Listing::with('images')->withAvg('reviews','rating')->withCount('reviews')->get();
        // засах монголоор орчуулах
        $categories = [
        ['id' => 1, 'name' => 'apartment'],
        ['id' => 2, 'name' => 'house'],
        ['id' => 3, 'name' => 'villa'],
        ['id' => 4, 'name' => 'cabin'],
        ['id' => 5, 'name' => 'trending'],
        ['id' => 6, 'name' => 'bungalow'],
        ['id' => 7, 'name' => 'New'],
        ['id' => 8, 'name' => 'other'],
    ];
        return Inertia::render('Home/Home', [
            'listings' => $listings,
            'categories' => $categories,
        ]);
    }
}
