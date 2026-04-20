<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Listing;
use App\Models\Review;
use App\Models\Booking;
use App\Models\Report;
use App\Models\Message;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'location',
        'bio',
        'language',
        'job',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }  
    public function isHost()
    {
        return $this->role === 'host';
    }

    public function isGuest(){
        return $this->role== 'user';
    }
    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
    public function reviews(){
        return $this->hasMany(Review::class);
    }
    public function bookings(){
        return $this->hasMany(Booking::class, 'user_id'); 
    }
    public function cancelled(){
        return $this->hasMany(Booking::class)->where('booking_status', 'cancelled');
    }
    public function pending(){
        return $this->hasMany(Booking::class)->where('booking_status', 'pending');
    }
    // user-d irsen gomdol
    public function reports()
    {
        return $this->hasMany(Report::class, 'reported_user_id');
    }

    //user uuruu hiisen gomdol
    public function givenReports()
    {
        return $this->hasMany(Report::class, 'user_id');
    }
    public function sentMessages(){
        return $this->hasMany(Message::class, 'sender_id');
    }
}
