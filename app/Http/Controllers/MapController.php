<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class MapController extends Controller
{
    public function index(){
        return Inertia::render('MapPage',[
            'markers' => [
                ['lat' => 47.918873, 'lng' => 106.917701],
                ['lat' => 47.920000, 'lng' => 106.915000],
            ]
        ]);
    }
}
