package com.example.utils;

import com.example.entity.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/13/16.
 */
public class Ajax {

    public static Map<String, Object> successResponse(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "success");
        response.put("Emails", object);
        return response;
    }

    public static Map<String, Object> editSuccess(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "success");
        response.put("EditCust", object);
        return response;
    }

    public static Map<String, Object> emptyResponse() {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "success");
        return response;
    }

    public static Map<String, Object> errorResponse(String errorMessage) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "error");
        response.put("message", errorMessage);
        return response;
    }

    public static Map<String, Object> registerSuccess(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("User", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("User", object);
            return response;
        }
    }

    public static Map<String, Object> deletingSuccess(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("Product", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("Product", object);
            return response;
        }
    }


    public static Map<String, Object> getCustomer(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("Customer", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("Customer", object);
            return response;
        }
    }

    public static Map<String, Object> getCompany(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("Company", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("Company", object);
            return response;
        }
    }

    public static Map<String, Object> putReqSuccess(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("Req", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("Req", object);
            return response;
        }
    }


    public static Map<String, Object> putFavs(Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        if(object !=null) {
            response.put("result", "success");
            response.put("Favs", object);
            return response;
        }
        else {
            response.put("result", "fail");
            response.put("Favs", object);
            return response;
        }
    }


    public static Map<String,  List<Category>> successResponseCats(List<Category> categories) {
        Map<String,  List<Category>> response = new HashMap<String,  List<Category>>();
        response.put("Cats", categories);
        return response;
    }

    public static Map<String,  List<Category>> successResponseSubCats(List<Category> categories) {
        Map<String,  List<Category>> response = new HashMap<String,  List<Category>>();
        response.put("SubCats", categories);
        return response;
    }

    public static Map<String,  List<Product>> ResponseProducts(List<Product> products) {
        Map<String,  List<Product>> response = new HashMap<String,  List<Product>>();
        response.put("Products", products);
        return response;
    }
    public static Map<String,  List<Ads>> ResponseAds(List<Ads> ads) {
        Map<String,  List<Ads>> response = new HashMap<String,  List<Ads>>();
        response.put("Ads", ads);
        return response;
    }


    public static Map<String,  List<Favorites>> ResponseFavs(List<Favorites> favs) {
        Map<String,  List<Favorites>> response = new HashMap<String,  List<Favorites>>();
        response.put("Favs", favs);
        return response;
    }

    public static Map<String,  List<Requests>> ResponseReq(List<Requests> requestses) {
        Map<String,  List<Requests>> response = new HashMap<String,  List<Requests>>();
        response.put("Reqs", requestses);
        return response;
    }


}
