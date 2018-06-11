package com.example.repository;

import com.example.entity.Ads;
import com.example.entity.DomainObject;
import com.example.entity.Product;

import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */
public interface AdsRepo <V extends DomainObject>{

    List<Product> getAds(V ads);
}
