<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'artist',
        'category',
        'description',
        'date',
        'time',
        'venue',
        'city',
        'price',
        'total_seats',
        'poster',
        'status',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function ticketsSold()
    {
        return $this->bookings()->where('payment_status', 'paid')->sum('quantity');
    }

    public function getCreatedAtAttribute($value)
    {
        return date('d M y - h:i A', strtotime($value));
    }

    public function getUpdatedAtAttribute($value)
    {
        return date('d M y - h:i A', strtotime($value));
    }
}
