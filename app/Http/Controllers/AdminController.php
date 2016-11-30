<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * 管理员登录
     * @param Request $request
     * @return string 为0即为错误，大于0为管理员的id
     */
    public function login(Request $request){
        try {
            $name = $request->input('name');
            $pwd = md5($request->input('pwd'));
            $admin = Admin::where('name', $name)->where('pwd', $pwd)->firstOrFail();
            return json_encode($admin->id);
        }catch (Exception $e){
            return json_encode(0);
        }
    }
}
