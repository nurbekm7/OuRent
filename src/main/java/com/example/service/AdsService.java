package com.example.service;

import com.example.entity.Ads;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */
public interface AdsService {

    List<Ads> getAds(String user_id);
}
