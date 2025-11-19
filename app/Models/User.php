<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'org_name',
        'business_id',
        'role_id',
        'business_description',
        'contact_person_name',
        'contact_phone',
        'document_verification',
        'holder_name',
        'account_number',
        'ifsc_code',
        'terms_accepted',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'document_verification' => 'boolean',
        'terms_accepted' => 'boolean',
    ];

    // 🔗 Relationship with Business
    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function onboarding()
{
    return $this->hasOne(Onboarding::class);
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
