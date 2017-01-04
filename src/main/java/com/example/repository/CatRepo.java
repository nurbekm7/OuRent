package com.example.repository;

import com.example.entity.Category;
import com.example.entity.DomainObject;
import com.example.entity.Product;

import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/16/16.
 */
public interface CatRepo<V extends DomainObject> {

    List<Category> getAllCats();

    List<Category>  getSubCatsByID(String id);
    List<Category>  getCatsByID(String id);
    List<Product>  getProductsByID(String id);
    List<Product>  getProductByID(String id);
    List<Product>  getPopularProducts();
    List<Product>  getPopularProductsByID(String cat_id, String product_id);
    Map<String, String> deleteProductByID(String id);
    List<Product>  getProductByUserID(String id);
    List<Product>  putProduct(String pr_name, String img, String pr_desc,String price, String  deposit,
                              String pr_cost,boolean will_sell,boolean will_exchan,
                              String cat_id, String user_id);



}
