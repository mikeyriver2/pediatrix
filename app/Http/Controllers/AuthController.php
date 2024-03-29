<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth; 
use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        $email = $request->email;
        $password = $request->password;

        $credential = [
            "email" => $email,
            "password" => $password
        ];

        // or $credentials = $request->only('email', 'password');

        if (Auth::attempt($credential)) {
            $user = Auth::user();
            $token = $user->createToken('Token Name')->accessToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ])->cookie('token', $token);

        } else {
            return response('Invalid Credentials', 401);
        }
    }

    public function logout(Request $request) {
        $cookie = \Cookie::forget('token');
        $token= $request->bearerToken();
        Auth::user()->AauthAcessToken()->delete();

        return response('Logout Success', 200)->withCookie($cookie);
    }
}
