<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\Http\Controllers\Controller as Controller;


class BaseController extends Controller

{

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendResponse($result, $message, $status=200)
    {
    	$response = [
            'success' => true,
            'status' => $status,
            'data'    => $result,
        ];
        $response['message'] = $message;
        return response()->json($response, 200);
    }


    /**

     * return error response.

     *

     * @return \Illuminate\Http\Response

     */

    public function sendError($error, $errorMessages = [], $status = 200) {
    	$response = [
            'success' => false,
            'status' => $status,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $status);

    }

}