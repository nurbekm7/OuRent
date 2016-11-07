package com.example.repository;

import com.example.entity.DomainObject;
import com.example.entity.Favorites;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */
public interface FavRepo <V extends DomainObject> {


    List<Favorites> getFavs(V favs);

    List<Favorites> putFav(Favorites favs);
}
