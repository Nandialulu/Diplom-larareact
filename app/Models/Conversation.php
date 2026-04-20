<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Message;
use App\Models\User;

class Conversation extends Model
{
    protected $fillable = [
        'user_id',
        'host_id'
    ];
    public function messages()
{
    return $this->hasMany(Message::class);
}
    public function guest()
{
    return $this->belongsTo(User::class, 'guest_id');
}
    public function host()
{
    return $this->belongsTo(User::class, 'host_id');
}
}
