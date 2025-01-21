<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    // Method to get all images
    public function index()
    {
        // Get all images from the database p
        $images = Image::all();

        // Return the images as a JSON response
        return response()->json([
            'images' => $images
        ]);
    }


    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max size 2MB
        ]);

        // Store the image file on the disk (public storage)
        $imagePath = $request->file('image')->store('images', 'public'); // Saves image in 'storage/app/public/images'

        // Save image information to the database, storing only the file path
        $image = Image::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'image' => $imagePath,  // Store the file path of the image
        ]);

        return response()->json(['message' => 'Image uploaded successfully!']);

        // Return response

    }
}
