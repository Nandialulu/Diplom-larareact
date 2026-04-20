<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Listing;

class ListingImage extends Model
{
    use HasFactory;
    protected $table = 'listing_img';
    protected $fillable = [
        'listing_id',
        'img_path'
    ];

    public function listing(){
        return $this->belongsTo(Listing::class, 'listing_id');
    }
}
