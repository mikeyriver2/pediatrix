<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Record;
use \App\Patient;

class RecordController extends Controller
{
    public function store(Request $request){
        $record = Record::create([
            'patient_id' => $request->patient["id"],
            'weight' => $request->weight,
            'temperature' => $request->temperature,
            'diagnosis' => $request->diagnosis,
            'prescription' => $request->prescription,
            'type' => "General Consultation"
        ]);

        return response()->json([
            'record' => $record
        ]);
    }
}
