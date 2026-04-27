<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Listing;
use App\Models\Booking;

class Review extends Model
{
    protected $fillable = [
    'user_id',
    'listing_id',
    'booking_id',
    'rating',
    'comment',
    'published_at',
    'type'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function listing()
    {
        return $this->belongsTo(Listing::class, 'listing_id');
    }
    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
