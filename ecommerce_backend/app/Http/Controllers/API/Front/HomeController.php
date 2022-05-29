<?php

namespace App\Http\Controllers\API\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use  Illuminate\Support\Collection;

class HomeController extends Controller
{
    public  function home(){
      $topProduct = DB::table('products')
          ->join('categories','categories.id','=','products.category_id')
          ->where('products.status','=','1')
          ->select('products.*','categories.id AS categoryId','categories.category_name as categoryName')
          ->get()
          ->groupBy('categoryName')->map(function ($top){
              return $top->take(4);
          }

        );
      $topPro = new Collection($topProduct);
        return response()->json([
            'topProduct'=>$topPro
        ]);
    }

}
