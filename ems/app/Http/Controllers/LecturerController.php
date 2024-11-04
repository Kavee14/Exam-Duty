<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lecturers;
use Illuminate\Support\Facades\DB;

class LecturerController extends Controller
{
    public function index()
    {
        return Lecturers::all();
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'lec_id' => 'required|string|unique:lecturers,lec_id',
            'name' => 'required|string',
            'email' => 'required|email|unique:lecturers,email',
            'phone' => 'required|string',
            'Address' => 'required|string',
            'position' => 'required|string',
            'department' => 'required|string',
        ]);

        // Create lecturers
        // After creating the lecturers
        $lecturers = Lecturers::create($request->all());
        if (!$lecturers) {
            return response()->json(['message' => 'Lecturers creation failed'], 500);
        }

        // Generate password using the first 4 letters of name and last 3 digits of lec_id
        $password = strtolower(substr($lecturers->name, 0, 4)) . substr($lecturers->lec_id, -3);

        // Create corresponding user in the users table
        DB::table('users')->insert([
            'lec_id' => $lecturers->lec_id,
            'usertype' => 'user',
            'name' => $lecturers->name,
            'email' => $lecturers->email,
            'password' => bcrypt($password),
        ]);

        return response()->json(['message' => 'Lecturers created successfully, user account created.']);
    }

    public function update(Request $request, $lec_id)
    {
        $lecturers = Lecturers::findOrFail($lec_id);
        $lecturers->update($request->all());

        return response()->json(['message' => 'Lecturers updated successfully']);
    }

    public function destroy($lec_id)
    {
        Lecturers::destroy($lec_id);

        return response()->json(['message' => 'Lecturers deleted successfully']);
    }

    public function show($lec_id)
    {
        try {
            // Ensure 'Lecturer' is the correct model name and 'lec_id' is the correct column
            $lecturers = Lecturers::where('lec_id', $lec_id)->firstOrFail();

            return response()->json([
                'status' => true,
                'data' => $lecturers
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Lecturer not found'
            ], 404);
        }
    }

}
