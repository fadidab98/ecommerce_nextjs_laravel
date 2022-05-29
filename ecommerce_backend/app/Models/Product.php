<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_title',
        'product_description',
        'product_image',
        'product_sub_images',
        'product_color',
        'product_price',
        'category_id',
        'status'
    ];
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function cart(){
        return $this->belongsTo(Cart::class);
    }
}
