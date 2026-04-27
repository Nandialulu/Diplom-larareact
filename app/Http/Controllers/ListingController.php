<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;
use App\Models\ListingImage;
use App\Models\Booking;
use App\Models\Review;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ListingController extends Controller
{
    // index hesgiiig sain harah relationship ashiglasan
    public function index(Request $request)
    {
    $search = $request->input('search');
    $listings = auth()->user()->listings()->with('images')->latest()->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('address', 'like', "%{$search}%")->orWhere('category', 'like', "%{$search}%");
            });
        })->paginate(10)->withQueryString();
    return Inertia::render('Host/Index', [
        'listings' => $listings,
        'search' => $search,
    ]);
    }
    // bairnuudiig home deer haruulah 
    public function home(){
        $listings = Listing::with('images')->paginate(10);
        return inertia::render('Home/Home', [
            'listings' => $listings
        ]);
    }
    // bair uusgeh
    public function create()
    {
        return Inertia::render('Host/Create');
    }
    // bair ustgah
    public function destroy($id){
        $listing=auth()->user()->listings()->findOrFail($id);
        $listing->delete();
        return redirect()->route('host.index')->with('success', ' Байр ажилттай устлаа');
    }
    // update hiih ahiad harah
    public function update(Request $request, Listing $listing)
    {
        $listing->update($request->only([
        'title',
        'category',
        'description',
        'address',
        'price_per_day',
        'guest_number',
        'bedrooms',
        'bathrooms',
    ]));
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('listingImg', 'public');
            $listing->image = $imagePath;
        }
    $listing->save();
    return redirect()->route('host.index')->with('success', 'Байрны мэдээлэл амжилттай шинэчлэгдлээ');
    }
//  ugugdliig shalgaad ugugdliin sand hadgalah
    public function store(Request $request)
    {
          if (!auth()->check()) {
        return redirect()->route('login');
    }
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'category' => 'required|string',
        'description' => 'required|string',
        'address' => 'required|string|max:255',
        'lat' => 'nullable|numeric',
        'lng' => 'nullable|numeric',
        'price_per_day' => 'required|numeric',
        'guest_number' => 'required|integer',
        'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'bedrooms' => 'required|integer',
        'bathrooms' => 'required|integer',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
    ]);
    $validated['user_id'] = auth()->id();
    $listing = Listing::create($validated);
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('listingImg', 'public');
            ListingImage::create([
                'listing_id' => $listing->id,
                'img_path' => $path,
            ]);
        }
    }
    $reviews = Review::with('listing_id', $listing->id)->whereNotNull('published_at')->get(); 
    return redirect()->route('host.index')->with('status', 'Амжилттай хадгалагдлаа');
    }

// show function
  public function show(Listing $listing)
    {
        $listing->load([
    'user:id,name,avatar,job,language,bio',
    'images',
    'reviews' => function ($query) {
        $query->latest()
            ->with('user:id,name,avatar');
    },
    'bookings' => function ($query) {
        $query->whereIn('booking_status', ['pending', 'confirmed'])
            ->whereNull('cancelled_at')
            ->whereDate('end_date', '>=', today());
    }
]);
        $bookedDates = [];

        foreach ($listing->bookings as $booking) {
            $start = Carbon::parse($booking->start_date);
            $end = Carbon::parse($booking->end_date)->copy()->subDay();

            if ($start->lte($end)) {
                $period = CarbonPeriod::create($start, $end);

                foreach ($period as $date) {
                    $bookedDates[] = $date->format('Y-m-d');
                }
            }
        }
        $listing->booked_dates = array_values(array_unique($bookedDates));
        return Inertia::render('Host/DetailPage', [
            'listing' => $listing,
            'host' => $listing->user,
            'reviews' => $listing->reviews,
        ]);
    }

// bair zasvar hiih
    public function edit($id, Listing $listing){
       $listing= Listing::findOrFail($id);
       return inertia('Host/Edit', compact('listing'));
    }
        // tusdan controller uusgeh bsn 
    public function search(Request $request)
        {
            $lat = $request->lat;
            $lng = $request->lng;
            $query = Listing::with('images');
            //Distance filter
            if ($lat && $lng) {
                $query->selectRaw("
                    listings.*,
                    (6371 * acos(
                        cos(radians(?)) *
                        cos(radians(lat)) *
                        cos(radians(lng) - radians(?)) +    
                        sin(radians(?)) *
                        sin(radians(lat))
                    )) AS distance
                ", [$lat, $lng, $lat])     //radians(?) гэдэг нь user input-ийг шууд SQL string дотор оруулаагүй гэсэн үг.
                ->having('distance', '<', 10)
                ->orderBy('distance', 'asc');
        }
        //Date filter
        if ($request->start_date && $request->end_date) {
            $start = $request->start_date;
            $end = $request->end_date;
            // 
            $query->where(function ($q) use ($start, $end) {
                $q->where('start_date', '<=', $end)
                ->where('end_date', '>=', $start);
            });
        }
        //Guest filter
        if ($request->guest_number) {
            $query->where('guest_number', '>=', $request->guest_number);
        }
            // Result
            $listings = $query->paginate(10);

            return Inertia::render('SearchResult', [
                'listings' => $listings
            ]);
        }
        // ene c bas  zahialga, zahialgiin medeelel shalgah 
        public function booking(){
        $bookings = Booking::with(['user', 'listing'])->whereHas('listing', function($query){
                $query->where('user_id', auth()->id());
            })->latest()->get();
        // role shalgaj fronendru ilgeeh
        if(auth()->user()->role === 'host') {
            return inertia('Host/BookingInfo', [
                'bookings' => $bookings,
            ]);
        } else {
        // bish bol guest uut view damjina
            return inertia('Guest/Mybooking', [
                'bookings' => $bookings,
            ]);
        }
    }   
    public function review(){
        return Inertia::render('Host/Review');
    }
    // admin hiih uildel ыхүц
    public function pause($id)
    {
        $listing = auth()->user()->listings()->findOrFail($id);
        $listing->status = 'paused';
        $listing->save();

        return back()->with('success', 'Listing түр хаагдлаа');
    }

    public function resume($id)
    {
        $listing = auth()->user()->listings()->findOrFail($id);
        $listing->status = 'active'; // эсвэл approved
        $listing->save();

        return back()->with('success', 'Listing дахин нээгдлээ');
    }

    public function reject($id)
    {
        $listing = auth()->user()->listings()->findOrFail($id);
        $listing->status = 'rejected';
        $listing->save();

        return back()->with('success', 'Listing татгалзлаа');
    }
}

