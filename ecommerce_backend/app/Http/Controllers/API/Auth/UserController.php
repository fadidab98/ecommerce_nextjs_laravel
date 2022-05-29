<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request){
        $validation = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required|min:7'
        ]);
        if($validation->fails())
        {
            return response()->json([
                'message_error'=>$validation->messages()

            ]);
        }
        else{
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'error_message'=>'InValid Data'
                ]);

            }

            else{
                if($user->role ==1) //1= admin
                {
                    $role="admin";
                    $token =   $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else // 0 = moderator
                {
                    $role="user";
                    $token = $user->createToken($user->email.'_token',['server:user'])->plainTextToken;
                }


               $cookies = cookie('jwt',$token, 60*24);


                return response()->json([
                    'status'=>200,
                    'token'=>$token,
                    'username'=>$user->name,
                    'userId'=>$user->id,

                    'role'=>$user->role,
                    'message'=>"Logged In Successfully"
                ])->withCookie($cookies);
            }

        }

    }




    public function register(Request $request){

        $validation= Validator::make($request->all(),[

            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:7',

        ]);
        if($validation->fails())
        {
            return response()->json([
                'message_error'=>$validation->messages()
            ]);
        }
        else{

                $user = User::create([
                    'name'=>'XXX',
                    'email'=>$request->email,
                    'password'=>Hash::make($request->password),
                    'status'=>'0'


                ]);

            $token = $user->createToken($user->email.'_token',['server:user'])->plainTextToken;
            return response()->json([
                'status'=>200,
                'token'=>$token,
                'username'=>$user->name,
                'userId'=>$user->id,

                'role'=>0,
                'message'=>"Sign In Successfully"
            ]);
        }

    }
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Logged Out Successfully'
        ]);



    }
}
