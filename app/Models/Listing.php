<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ListingImage;
use App\Models\Booking;
use App\Models\Review;
use App\Models\Listing;
class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'description',
        'address',
        'lat',
        'lng',
        'price_per_day',
        'guest_number',
        'bedrooms',
        'bathrooms',
        'start_date',
        'end_date',
    ];

    // 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images(){
        return $this->hasMany(ListingImage::class, 'listing_id');
    }
    public function bookings(){
        // listing_id awah
        return $this->hasMany(Booking::class, 'listing_id');
    }

    public function isAvailable($startDate, $endDate): bool{
        return !$this->bookings()->whereNull('cancelled_at')->whereIn('booking_status', ['pending','confirmed'])
        ->where(function($query) use ($startDate, $endDate){
            $query->where('start_date', '<', $endDate)->where('end_date', '>', $startDate);
        })->exists();

    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function listing(){
        return $this->hasMany(Listing::class);
    }
    public function host()
    {
    return $this->belongsTo(User::class, 'user_id');
    }
    public function availabilities(){
        return $this->hasMany(ListingAvailability::class);
    }
}

