package com.example.service;

import com.example.entity.Ads;
import com.example.repository.AdsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */

@Service("AdsService")
public class AdsServiceImpl implements AdsService {

    private static final Logger LOG =  LoggerFactory.getLogger(CatServiceImpl.class);
    @Autowired
    @Qualifier("AdsRepo")
    private AdsRepo adsRepo;

    @Override
    public List<Ads> getAds(String user_id) {

        try {
            return adsRepo.getAds(new Ads(user_id));
        } catch (Exception e) {
            LOG.error("ERROR Ads: " + e.getMessage(), e);
            return null;
        }
    }
}
