<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($id)
    {
        // category id биш, category name ашиглаж filter хийх
        $listings = Listing::with('images')->where('category', $id)->get();

        return Inertia::render('categories/Show', [
            'listings' => $listings,
            'category' => $id,
        ]);
    }
}