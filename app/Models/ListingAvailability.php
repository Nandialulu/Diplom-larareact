<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListingAvailability extends Model
{
    protected $fillable = [
        'listing_id',
        'start_date',
        'end_date'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}