<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\HostController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// BecomeHost space
Route::middleware(['auth'])->group(function () {
    Route::get('/become-host', function () {
        return Inertia::render('Auth/BecomeHost');
    })->name('host.create');

// Profile heseg, newtreegui bol loginruu usreh 
Route::middleware('auth')->group(function(){
    Route::get('/Profile', function(){
        return Inertia::render('Profile/Edit');
    });
});  
Route::post('/become-host', [HostController::class, 'store'])
        ->name('host.store');
});
Route::get('/welcome', function(){
    return Inertia::render('Welcome');
    // name('welcome) ni redirect()->route('welcome') duudne
})->name('welcome');
Route::get('/service',function(){
    return Inertia::render('Service/Service');
});
Route::get('/comment',function(){
    return Inertia::render('Comment/Comment');
});
// host controller 
Route::controller(HostController::class)->group(function () {
    Route::get(
        'hostDashboard_CRUD/hostDashBoard',
        'hostDashBoard'
    )->name('host.Dashboard');
    // Route::get(
    //     'hostDashboard_CRUD/create',
    // [HostController::class, 'create']
    // );
});

require __DIR__.'/auth.php';

