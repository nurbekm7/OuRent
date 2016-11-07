package com.example.service;


import com.example.entity.Favorites;
import com.example.repository.FavRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */

@Service("FavService")
public class FavServiceImpl  implements FavService{


    private static final Logger LOG =  LoggerFactory.getLogger(CatServiceImpl.class);
    @Autowired
    @Qualifier("FavRepo")
    private FavRepo favRepo;


    @Override
    public List<Favorites> getFavs(String user_id) {
        try {
            return favRepo.getFavs(new Favorites(user_id));
        } catch (Exception e) {
            LOG.error("ERROR Favs: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Favorites> putFav(String product_id, String user_id) {
        try {
            return  favRepo.putFav(new Favorites(product_id, user_id));

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }
}
