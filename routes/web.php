<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\HostController;
use App\Http\Controllers\ListingController;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConversationController;
use App\Models\Message;
use App\Http\Controllers\ReviewController;

Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/allguest', [AdminDashboardController::class, 'guest'])->name('allGuest');
        Route::get('/allhost', [AdminDashboardController::class, 'host'])->name('allHost');
        Route::get('/allListing', [AdminDashboardController::class, 'listing'])->name('allListing');
        Route::get('/AllBooking', [AdminDashboardController::class, 'booking'])->name('AllBooking');
        Route::get('/Bookingstory', [AdminDashboardController::class, 'bookingstory'])->name('Bookingstory');
        Route::get('/AddCategory', [AdminDashboardController::class, 'AddCategory'])->name('AddCategory');
        Route::get('/DetailGuest/{id}',[AdminDashboardController::class, 'DetailGuest'])->name('DetailGuest');
        Route::get('/DetailHost/{id}',[AdminDashboardController::class, 'DetailHost'])->name('DetailHost');
        Route::get('/listing/{listing}', [AdminDashboardController::class, 'detailListing'])->name('Detaillisting');
        Route::patch('/admin/guests/{guest}/status', [AdminDashboardController::class, 'updateStatus'])
    ->name('admin.guests.updateStatus');
    });

Route::get('/map', [MapController::class,'index'])->name('map.index');
// Route::get('/DetailPage', [ListingController::class, 'detail'])->name('host.detail');

// home heseg deer 
Route::get('/', [HomeController::class, 'index'])->name('welcome');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');
Route::get('/dashboard', function () {
    return Inertia::render('Host/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/more-info', [ProfileController::class, 'UpdateMoreInfo'])->name('profile.UpdateMoreInfo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// BecomeHost space 
Route::middleware(['auth'])->group(function () {
    Route::get('/become-host', function () {
        return Inertia::render('Host/Dashboard');
    });

// Profile heseg, newtreegui bol loginruu usreh 
Route::middleware('auth')->group(function(){
    Route::get('/Profile', function(){
        return Inertia::render('Profile/Edit');
    });
});  
Route::post('/become-host', [HostController::class, 'store'])->name('host.store');
});
Route::get('/welcome', function(){    
    // name('welcome) ni redirect()->route('welcome') duudne
    return Inertia::render('Welcome');})->name('welcome');
Route::get('/service',function(){
    return Inertia::render('Service/Service');
});
Route::get('/comment',function(){
    return Inertia::render('Comment/Comment');
});

// host controller 
// navbaraas shiljih zamuud
Route::middleware(['auth'])->prefix('host')->name('host.')->group(function () {
    Route::get('/dashboard', [HostController::class, 'hostDashBoard'])->name('dashboard');
    Route::get('/profile', [HostController::class, 'profile'])->name('profile');
});

Route::middleware(['auth'])->prefix('guest')->name('guest.')->group(function () {
    Route::get('/dashboard', [GuestController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
});

require __DIR__.'/auth.php';
// prefix('host') ni prefix('host') ,/dashboard → /host/dashboard
Route::middleware('auth')->prefix('host')->name('host.')->group(function () {
    Route::get('/index', [ListingController::class, 'index'])->name('index');
    Route::get('/create', [ListingController::class, 'create'])->name('create');
    Route::post('/', [ListingController::class, 'store'])->name('store');

    Route::get('/listings/{id}/edit', [ListingController::class, 'edit'])->name('edit');
    Route::put('/listings/{listing}', [ListingController::class, 'update'])->name('update');
    Route::delete('/listings/{id}', [ListingController::class, 'destroy'])->name('destroy');

    Route::get('/booking-info', [ListingController::class, 'booking'])->name('BookingInfo');
    Route::get('/review', [ListingController::class, 'review'])->name('Review');

    Route::post('/listings/{id}/reject', [ListingController::class, 'reject'])->name('reject');
    Route::post('/listings/{id}/pause', [ListingController::class, 'pause'])->name('pause');
    Route::post('/listings/{id}/resume', [ListingController::class, 'resume'])->name('resume');
});

Route::get('/search', [ListingController::class, 'search'])->name('search');
Route::get('/listing/{listing}', [ListingController::class, 'show'])->name('detail');

Route::middleware(['auth'])->group(function () {
    Route::get('/booking/{id}', [BookingController::class, 'booking'])->name('host.booking');
    Route::post('/listing/{listing}/booking', [BookingController::class, 'store'])->name('booking.store');

    Route::get('/booking/{booking}/confirmation', [BookingController::class, 'confirmation'])->name('booking.confirmation');
        //  upload state machine 
    Route::patch('/host/bookings/{booking}/status',[BookingController::class, 'updateStatus'])->name('host.bookings.updateStatus');
});

Route::middleware(['auth'])->prefix('guest')->name('guest.')->group(function(){
    Route::get('/Mybooking',[GuestController::class, 'Mybooking'])->name('Mybooking');
    Route::get('/Review', [GuestController::class, 'Review'])->name('Review');
    Route::get('/Dashboard',[GuestController::class, 'dashboard'])->name('Dashboard');
});

    // payment controller 
Route::middleware(['auth'])->group(function () {
    Route::post('/bookings/{booking}/pay', [PaymentController::class, 'pay'])->name('payments.pay');
    Route::get('/payment/{booking}', [PaymentController::class, 'page'])->name('payment.page');
});
// turshilt hha
Route::post('/messages/send', [MessageController::class, 'send'])->middleware('auth');
Route::get('/chat/{id}', function ($id) {
    return Inertia::render('chat',['conversationId' => $id,'messages' =>Message::where('conversation_id', $id)->get()]);
});
Route::middleware('auth')->group(function () {
    // chat эхлүүлэх
    Route::post('/conversations/start/{hostId}', [ConversationController::class, 'start']);
    // message илгээх
    Route::post('/messages', [MessageController::class, 'store']);
    // message авах
    Route::get('/messages/{conversationId}',  [MessageController::class, 'getMessages']);
});

Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
Route::get('/review/{booking}', [ReviewController::class, 'show'])->name('reviews.show');
