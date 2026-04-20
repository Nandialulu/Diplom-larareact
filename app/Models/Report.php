<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
     protected $fillable = [
        'user_id',
        'reported_user_id',
        'reason'
    ];

    // гомдол гаргасан user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // гомдол авсан user
    public function reportedUser()
    {
        return $this->belongsTo(User::class, 'reported_user_id');
    }
}
