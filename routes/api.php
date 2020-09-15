<?php

use Illuminate\Support\Facades\Route;

// Questions
Route::apiResource('/questions', 'QuestionController');

// Categories
Route::apiResource('/categories', 'CategoryController');

// Replies
Route::apiResource('/questions/{question}/replies', 'ReplyController');
