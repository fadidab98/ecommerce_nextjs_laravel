<?php

use App\Http\Controllers\API\Auth\UserController;
use App\Http\Controllers\API\Back\CategoryController;
use App\Http\Controllers\API\Back\PostController;
use App\Http\Controllers\API\Front\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/Home',[HomeController::class,'Home']);
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);



///////////////////////////////Category/////////////////////////




 Route::get('/category',[CategoryController::class,'index']);
Route::post('/create_category',[CategoryController::class,'create']);
Route::get('/category/{id}',[CategoryController::class,'show']);



/// ///////////////////////////Category_End////////////////////




///////////////////////////////Product////////////////////////





Route::post('/create_product',[PostController::class,'create']);
Route::get('/product',[PostController::class,'index']);
Route::get('/product/{id}',[PostController::class,'show']);




///////////////////////////////Product_End////////////////////
Route::middleware(['auth:sanctum','Isadmin'])->group( function () {
    Route::get('/checkingAuthenticatedAdmin', function (){
        return response()->json(['message'=>'You Are In','status'=>200],200);
    });

});
Route::middleware('auth:sanctum')->group( function () {
    Route::get('/checkingAuthenticated', function (){
        return response()->json(['message'=>'You Are In','status'=>200],200);
    });
    Route::post('/logout',[UserController::class,'logout']);
});
