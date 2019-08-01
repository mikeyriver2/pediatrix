<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment; 
use App\Patient;

class PaymentController extends Controller
{
    public function quickSearchPatients(Request $request){
        $patients = Patient::where('first_name','LIKE',"%".$request->full_name."%")
                            ->orWhere('last_name','LIKE',"%".$request->full_name."%")->get();
        return $patients;
    }
}
