<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'event_id',
        'user_id',
        'quantity',
        'amount',
        'payment_status'
    ];

    public function event() {
        return $this->belongsTo(Event::class);
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

