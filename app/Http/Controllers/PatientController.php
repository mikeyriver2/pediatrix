<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;

class PatientController extends Controller
{
    public function index(Request $request){
        $patients = Patient::all();
        return response()->json([
            'patients' => $patients,
        ]);
    }

    public function store(Request $request){
        $patient = Patient::create([
            'first_name' => $request->firstName,
            'middle_name'=> $request->middleName,
            'last_name' => $request->lastName,
            'home_address' => $request->address,
            'phone_number' => $request->phoneNumber,
            'email' => $request->email
        ]);
        
        return response()->json([
            'patient' => $patient,
        ]);
    }

    public function view(Request $request, $slug){
        $patient = Patient::find($slug);
        return $patient;
    }

    public function update(Request $request){
        $patient = Patient::where('id',$request->id)->update([
            'first_name' => $request->first_name,
            'middle_name'=> $request->middle_name,
            'last_name' => $request->last_name,
            'home_address' => $request->home_address,
            'phone_number' => $request->phone_number,
            'email' => $request->email
        ]);

        return $patient;
    }
}
