<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment; 
use App\Patient;

class PaymentController extends Controller
{
    public function index (Request $request){
        $payments = Payment::select(
            'payments.id',
            'payments.created_at',
            'payments.amount',
            \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
        )
        ->join('patients','patients.id','patient_id')->get();
        return $payments;
    }

    public function store(Request $request){
        $payment = Payment::create([
            'patient_id' => $request->patient["id"],
            'status' => $request->status,
            'amount' => $request->amount
        ]);

        return response()->json([
            'payment' => $payment
        ]);
    }

    public function update(Request $request) {
        $rPayment = $request->payment;
        $payment = Payment::select(
            'amount', 
            'status',
            \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
        )
        ->join('patients','patients.id','=','patient_id')
        ->where('payments.id',$request->paymentId)
        ->first();

        $payment->amount = $rPayment["amount"];
        $payment->status = $rPayment["status"];
        $payment->save();

        return $payment ;    
    }

    public function view(Request $request, $slug){
        $payment = Payment::select(
                'amount', 
                'status',
                'patients.id as patient_id', 
                \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
            )
            ->join('patients','patients.id','=','patient_id')
            ->where('payments.id',$slug)
            ->first();

        return $payment;
    }

    public function filter(Request $request) {
        $search = $request->search;
        $filter = $request->filter;
        $patientId = $request->patientId;

        $payments = Payment::select(
            'payments.id',
            'payments.created_at',
            'payments.amount',
            \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
        )
        ->join('patients','patients.id','patient_id')
        ->where(\DB::raw('CONCAT(patients.first_name, patients.middle_name, patients.last_name)'), 'LIKE', "%$search%");

        if(isset($patientId) && !empty($patientId)) {
            $payments->where('patients.id', $patientId);
        }

        $payments = $payments->get();
        
        return $payments;
    }
}
