<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/gettasklist', [TaskController::class, 'getTaskList']);
Route::get('/gettrashlist', [TaskController::class, 'getTrashList']);
Route::post('/addtask', [TaskController::class, 'addTask']);
Route::post('/addtask', [TaskController::class, 'addTask']);
Route::post('/updatetask', [TaskController::class, 'updateTask']);
Route::post('/movetotrash', [TaskController::class, 'moveToTrash']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/fetchuserdata', [UserController::class, 'getchUserData']);

Route::inertia('/', 'Approute');

Route::inertia('/{path?}', 'Approute')->where('path', '.*');

