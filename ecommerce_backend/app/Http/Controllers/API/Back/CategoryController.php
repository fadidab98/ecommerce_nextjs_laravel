<?php

namespace App\Http\Controllers\API\Back;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    protected $path="../../ecommerce-next/public/uploads/category/";
    public function index(){
         $category = Category::all();
         return response()->json([
             'status'=>200,
             'data'=>$category
         ]);

    }
    public function create(Request $request){
        $validation = Validator::make($request->all(),[
            'title'=>'required|min:4',
            'description'=>'required|min:4',
            'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048'

        ]);
        if($validation->fails())
        {
            return response()->json([
                'error_message'=>$validation->messages()
            ]);
        }
        else{
            $imageName ='';
            if($request->hasFile('image')) {
                $image =  $request->image;
                $imageExtension = $image->extension();
                $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;

                $image->move(public_path($this->path), $imageName);

            }

            $category = Category::create([
                'category_name'=>$request->title,
                'category_description'=>$request->description,
                'category_image'=> $imageName,
                'category_amount'=>'100'
            ]);
            return response()->json([
                'status'=>200,
                'message'=>'Category Added Successfully'
            ]);
        }
    }
    public  function show($id)
    {
        $category = Category::find($id);
        if($category)
        {
            return response()->json([
                'status'=>200,
                'data'=>$category
            ]);
        }
        else{
            return  response()->json([

                'message'=>'Category Not Founded'
            ],404);
        }
    }
}
