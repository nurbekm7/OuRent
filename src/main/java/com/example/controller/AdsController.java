package com.example.controller;

import com.example.entity.Ads;
import com.example.service.AdsService;
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

/**
 * Created by nurbek on 8/24/16.
 */

@RestController
@RequestMapping(value = "/ads", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdsController extends ExceptionHandlerController {

    @Autowired
    @Qualifier("AdsService")
    private AdsService adsService;

    @RequestMapping(value = "/getAdsByUserID", method = RequestMethod.GET)
    public Map<String, List<Ads>> getAds(@RequestParam("user_id") String user_id) throws RestException {
        try {
            if (user_id == null || user_id.equals("")) {
                return null;
            }
            List<Ads> result =  adsService.getAds(user_id);

            return Ajax.ResponseAds(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }


}
