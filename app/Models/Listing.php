<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price_per_day',
        'guest_number',
        'bedrooms',
        'bathrooms',     
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
