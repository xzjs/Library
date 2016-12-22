<?php

namespace App\Http\Controllers;

use App\Book;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = new User;
            $user->name = $request->name;
            $user->pwd = md5($request->pwd);
            $user->saveOrFail();
            return json_encode($user->id);
        } catch (\Exception $e) {
            return json_encode(0);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function login(Request $request)
    {
        try {
            $user = User::where('name', $request->name)->where('pwd', md5($request->pwd))->firstOrFail();
            return json_encode($user->id);
        } catch (\Exception $exception) {
            return json_encode(0);
        }

    }

    /**
     * 检测注册用户名是否重复
     * @param Request $request
     * @return string
     */
    public function check_username(Request $request){
        $user=User::where('name',$request->name)->first();
        if($user){
            return json_encode(false);
        }
        return json_encode(true);
    }
}
