<?php

use Illuminate\Support\Facades\Route;

// Questions
Route::apiResource('/questions', 'QuestionController');

// Categories
Route::apiResource('/categories', 'CategoryController');

// Replies
Route::apiResource('/questions/{question}/replies', 'ReplyController');

// Likes
Route::post('/replies/{reply}/like', 'LikeController@like');
Route::delete('/replies/{reply}/like', 'LikeController@unlike');

// Authentication
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});
