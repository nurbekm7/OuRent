package com.example.service;

import com.example.entity.Favorites;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */
public interface FavService {

    List<Favorites> getFavs(String id);
    List<Favorites> putFav(String product_id, String user_id);
}
