<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    
    public function register(Request $request)
    {
        $user = new User;

        $validated = $request->validate([
            'email' => 'required|unique:users',
            'fullName' => 'required',
            'password' => 'required',
        ]);

        if($validated) {
            $user->full_name = $request->fullName;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();
            
            if (Auth::attempt(array_merge($user->toArray(), ['password' => $request->password]))) {
                $request->session()->regenerate();
            }
        }
        if(Auth::check()) {
            return [
                "fullName" => $request->fullName,
                "email" => $request->email,
                "isLogin" => true
            ];
        }
    }
    
    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        return Auth::user();
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
        }
        if(Auth::check()) {
            return [
                "isLogin" => true
            ];
        }
        return [];
    }

    public function getchUserData()
    {
        if(Auth::check()) {
            $user = Auth::user();
            return [
                "fullName" => $user->full_name,
                "email" => $user->email,
                "isLogin" => true
            ];
        }
        return [];
    }
}

