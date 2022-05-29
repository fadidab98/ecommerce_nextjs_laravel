<?php

namespace App\Http\Controllers\API\Back;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    protected $path='../../ecommerce-next/public/uploads/post';
    public function index()
    {
           $post= DB::table('products')
               ->join('categories','products.category_id','=','categories.id')
               ->select('products.*','categories.category_name AS categoryName')
               ->get();
           return response()->json([
               'status'=>200,
               'data'=>$post
           ]);


    }
    public function show($id)
    {
        $product = Product::findOrFail($id);
        if($product)
        {
            return response()->json([
                 "status"=>200,
                'data'=>$product
            ],200);
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Product Not Founded'
            ]);
        }
    }
    public function create(Request $request){
        $validation = Validator::make($request->all(),[
            'title'=>'required',
            'description'=>'required|min:15',
            'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'status'=>'required',
            'color'=>'required',
            'category_id'=>'required',
            'price'=>'required'
        ]);
        if($validation->fails())
        {
            return response()->json([
                'error_message'=>$validation->messages()
            ]);
        }
        else{
            $img = array();
            $imageName="";
            if($request->hasFile('image'))
            {
                $image = $request->image;
                $imageExtension = $image->extension();
                $imageName = time().'_'.rand(0,1000).'.'.$imageExtension;
                $image->move(public_path($this->path), $imageName);

            }
           if($request->hasFile('images'))
           {


                   $images = $request->images;
                   foreach ( $images as $image1)
                   {

                           $imageExtensions = $image1->getClientOriginalExtension();
                           $imageNames = time() . '-' . rand(0, 1000) . '.' . $imageExtensions;
                           $img[] = $imageNames;
                           $image1->move(public_path($this->path), $imageNames);
                       }





          }

         $product = Product::create([
             'product_title'=>$request->title,
             'product_description'=>$request->description,
             'product_image'=>$imageName,
             'product_sub_images'=>implode(',',$img),
             'product_color'=>$request->color,
             'product_price'=>$request->price,
             'category_id'=>$request->category_id,
             'status'=>$request->status

         ]);
           return response()->json([
               'status'=>200,
               'message'=>'Product Added Successfully'
               ]);
        }
    }
}
