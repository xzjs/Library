<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books=Book::all();
        return json_encode($books);
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
            $book = new Book;
            $book->fill($request->all());
            $book->img = $this->upload_file($request->file('img'), 'img');
            $book->txt = $this->upload_file($request->file('txt'), 'txt');
            $book->saveOrFail();
            return json_encode(true);
        } catch (\Exception $e) {
            return json_encode($e->getMessage());
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
        Book::destroy($id);
        return json_encode(true);
    }

    /**
     * 保存文件
     * @param $file 文件
     * @param $type 类型
     * @return string 保存的文件名
     */
    private function upload_file($file, $type)
    {
        $extension = $file->extension();
        $name = time() . '.' . $extension;
        if ($type == 'img') {
            $destination_path = 'uploads/imgs/';
        } else {
            $destination_path = 'uploads/txts/';
        }
        $file->move($destination_path, $name);
        return $name;
    }
}
