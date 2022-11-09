<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\{User};

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ChangePasswordRequest;

class AuthController extends BaseController {
  /**
    * Login api
    *
    * @return \Illuminate\Http\Response
    */

  public function login(LoginRequest $request) {
    if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
      $success['token'] =  $request->user()->createToken('Ellie')->plainTextToken;
      $success['user'] =  Auth::user();
      return $this->sendResponse($success, 'Login Successfull');
      /*$success['status'] =  200;
      $success['message'] =  'Login Successful';
      return response()->json($success, 200);*/
    }
    else {
      return $this->sendError('Invalid Login', 202);
      //return $this->sendError("Invalid Login");
    }
  }
  
  public function logout() {
    $user = Auth::user(); 
    $user->currentAccessToken()->delete();
    $success['status'] =  200;
    return response()->json($success, 200);
  }

  public function changePassword(ChangePasswordRequest $request){
    $user = User::find(auth()->user()->id);
    if(isset($user->id)){
      if(Hash::check($request->current_password, $user->password)){
        $user->password = $request->new_password;
        $user->save();
        return $this->sendResponse('', 'Password changed successfully');
      }
      else{
        return $this->sendError('Incorrect Current password');
      }
    }
    else{
      $data['message'] =  "Login First";
      $data['status'] =  202;
    }
    return response()->json($data, 202);
  }

}