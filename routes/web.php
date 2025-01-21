<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ImageController;

Route::view('/', 'index');

Route::post('api/upload-image', [ImageController::class, 'store']);
Route::get('api/results', [ImageController::class, 'index']);

Route::get('/results', function () {
    return view('index');
});

