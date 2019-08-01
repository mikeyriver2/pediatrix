<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'home_address',
        'phone_number',
        'email'
    ];

}
