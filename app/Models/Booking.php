<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Listing;
use App\Models\payment;
class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'listing_id',
        'start_date',
        'end_date',
        'total_price',
        'booking_status',
        'is_paid',
        'cancelled_at',
        'message_to_host',
        'guest_number',
    ];

    protected $casts = [
        'start_date'   => 'date',
        'end_date'     => 'date',
        'is_paid'      => 'boolean',
        'cancelled_at' => 'datetime',
    ];
    public function user(){
        return $this->belongsTo(User::class); //host holbootoi
    }
    
    public function listing(){
        return $this->belongsTo(Listing::class);
    }
    public function payment(){
        return $this->hasOne(payment::class);
    }
        // Booking-тэй холбогдсон reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

}
