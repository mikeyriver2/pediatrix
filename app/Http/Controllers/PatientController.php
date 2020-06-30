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

    public function quickSearchPatients(Request $request){
        $fullName = $request->full_name;
        if ($fullName === '') {
            $patients = Patient::limit(5)->orderBy('id','desc')->get();
        } else {
            $patients = Patient::where('first_name','LIKE',"%".$request->full_name."%")
                ->orWhere('last_name','LIKE',"%".$request->full_name."%")
                ->limit(5)
                ->get();
        }
        return $patients;
    }

    public function filter(Request $request){
        $search = $request->search;
        $filter = $request->filter;

        // Save code for future reference
        // $patients = Patient::select(
        //                 \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as display'),
        //                 \DB::raw('CONCAT("/patients/",patients.id) as redirectUrl')
        //             )
        //             ->where(\DB::raw('CONCAT(patients.first_name, patients.middle_name, patients.last_name)'), 'LIKE', "%$search%")
        //             ->get();

        $patients = Patient::select(
                        'patients.*'
                    )
                    ->where(\DB::raw('CONCAT(patients.first_name, patients.middle_name, patients.last_name)'), 'LIKE', "%$search%");

        if (isset($filter) && strtolower($filter) !== "all") {
            $filter = $filter === "Inpatient" ? "in_patient" : "out_patient";
            $patients = $patients->where('type', $filter);
        }

        return $patients->get();
    }
}
