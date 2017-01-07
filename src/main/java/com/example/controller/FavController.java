package com.example.controller;

import com.example.entity.Favorites;
import com.example.service.FavService;
import com.example.utils.Ajax;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by nurbek on 8/24/16.
 */

@RestController
@RequestMapping(value = "/favs", produces = MediaType.APPLICATION_JSON_VALUE)
public class FavController  extends ExceptionHandlerController{

    @Autowired
    @Qualifier("FavService")
    private FavService favService;

    private static final Logger LOG = Logger.getLogger(String.valueOf(FavController.class));



    @RequestMapping(value = "/getFavsByUserID", method = RequestMethod.GET)
    public Map<String, List<Favorites>> getAds(@RequestParam("user_id") String user_id) throws RestException {

        LOG.info("getFavsByUserID: user_id = " + user_id);
         try {
            if (user_id == null || user_id.equals(null) || user_id.equals("")) {
                return null;
            }
            List<Favorites> result =  favService.getFavs(user_id);

            return Ajax.ResponseFavs(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/putFav", method = RequestMethod.POST)
    public Map<String, Object> putFav(@RequestParam("product_id") String product_id, @RequestParam("user_id") String user_id) throws RestException {
        LOG.info("putFav: product_id = " + product_id+ " user_id =" + user_id);

        try {
            if (product_id == null || product_id.equals(null) || user_id.equals(null)) {
                return null;
            }


            Object object = favService.putFav(product_id, user_id);
            return Ajax.putFavs(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }
}
