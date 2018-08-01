package com.example.service;

import com.example.controller.RestException;
import com.example.entity.Category;
import com.example.entity.Product;

import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/16/16.
 */
public interface CatService {


    List<Category> getAllCats();
    List<Category> getSubCatsByID(String id);
    List<Category> getCatsByID(String id);
    List<Product> getProductsByID(String id);
    Product putProduct(Product pr) throws RestException;

    List<Product> getProductByID(String id);
    List<Product> getPopularProducts();
    List<Product> getPopularProductsByID(String cat_id, String product_id);
    Map<String, String> deleteProductByID(String id);
    List<Product> getProductByUserID(String id);
    List<Product> searchProduct(String text);




}
