<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function login(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            // Find user by email
            $user = User::where('email', $request->email)->first();

            // Check if user exists and password matches
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid email or password'
                ], 401);
            }

            // Return successful response
            return response()->json([
                'status' => 'success',
                'user' => [
                    'lec_id' => $user->lec_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                ]
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during login'
            ], 500);
        }
    }
    
    public function getUserById($lec_id)
    {
        try {
            // Since lec_id is a string column and not the primary key,
            // we should use where() instead of find()
            $user = User::where('lec_id', $lec_id)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => [
                    'lec_id' => $user->lec_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching user'
            ], 500);
        }
    }

    // You might want to add these additional methods for a complete user management system
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'lec_id' => 'nullable|string|exists:lecturers,lec_id'
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'lec_id' => $request->lec_id,
                'usertype' => $request->usertype ?? 'user'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'user' => [
                    'lec_id' => $user->lec_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                ]
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during registration'
            ], 500);
        }
    }

    public function updateUser(Request $request, $lec_id)
    {
        try {
            $user = User::where('lec_id', $lec_id)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'sometimes|string|min:6|confirmed',
            ]);

            $updateData = $request->only(['name', 'email']);
            if ($request->has('password')) {
                $updateData['password'] = Hash::make($request->password);
            }

            $user->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => [
                    'lec_id' => $user->lec_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                ]
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating user'
            ], 500);
        }
    }
}