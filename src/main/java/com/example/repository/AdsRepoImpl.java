package com.example.repository;

import com.example.entity.Ads;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */
@org.springframework.stereotype.Repository("AdsRepo")
public class AdsRepoImpl implements  AdsRepo<Ads> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Ads> getAds(Ads ads) {

        String sql = "SELECT * FROM Ads where user_id = '" + ads.getUser_id() +"'" ;

        List<Ads> adses =  new ArrayList<Ads>();

        adses = jdbcOperations.query(sql, new BeanPropertyRowMapper<Ads>(Ads.class));

        return adses;
    }
}
