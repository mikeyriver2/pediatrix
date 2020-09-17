<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'AuthController@login');

Route::middleware(['preAuth','auth:api'])->group(function(){
    Route::get('user', function(Request $request){
        return $request->user();
    });
    Route::get('', 'Controller@dashboardIndex');
    Route::group(['prefix' => 'patients'], function(){
        Route::get('','PatientController@index');
        Route::get('qs','PatientController@quickSearchPatients');
        Route::post('store','PatientController@store');
        Route::put('','PatientController@update');
        Route::get('filter', 'PatientController@filter');
        Route::get('{slug?}','PatientController@view');
    });
    
    Route::group(['prefix' => 'payments'], function(){
        Route::post('store','PaymentController@store');
        Route::put('','PaymentController@update');
        Route::get('','PaymentController@index');    
        Route::get('filter', 'PaymentController@filter');
        Route::get('{slug?}','PaymentController@view');    
    });
    
    Route::group(['prefix' => 'records'], function(){
        Route::post('store','RecordController@store');
        Route::get('','RecordController@index');
        Route::get('filter', 'RecordController@filter');
        Route::get('{slug?}','RecordController@view');
        Route::put('','RecordController@update');
    });
    Route::group(['prefix' => 'appointments'], function(){
        Route::post('store','AppointmentsController@store');
    });
    Route::get('logout', 'AuthController@logout');
});
