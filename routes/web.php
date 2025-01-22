<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ImageController;

Route::post('api/upload-image', [ImageController::class, 'store']);
Route::get('api/results', [ImageController::class, 'index']);

Route::view('/', 'index');


// Protected routes
Route::group(['middleware' => 'auth'], function () {
    Route::view('/results', 'index');
});

// Authentication routes
Auth::routes();

