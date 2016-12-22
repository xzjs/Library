<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/admin/login','AdminController@login');

Route::post('/book/search','BookController@search');
Route::resource('book','BookController');

Route::post('/user/login','UserController@login');
Route::resource('user','UserController');