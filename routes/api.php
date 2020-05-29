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

Route::group(['prefix' => 'payments'], function(){
    Route::post('store','PaymentController@store');
    Route::put('','PaymentController@update');
    Route::get('','PaymentController@index');    
    Route::get('{slug?}','PaymentController@view');    
});

Route::post('records/store','RecordController@store');
Route::get('records/','RecordController@index');

Route::group(['prefix' => 'patients'], function(){
    Route::get('','PatientController@index');
    Route::get('{slug?}','PatientController@view');
    Route::get('qs','PaymentController@quickSearchPatients');
    Route::post('','PatientController@store');
    Route::put('','PatientController@update');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
