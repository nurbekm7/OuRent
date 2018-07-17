package com.example.repository;

import com.example.entity.Ads;
import com.example.entity.Category;
import com.example.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/24/16.
 */
@org.springframework.stereotype.Repository("AdsRepo")
public class AdsRepoImpl implements  AdsRepo<Ads> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Product> getAds(Ads ads) {

        String sql = "SELECT * FROM Ads where user_id = '" + ads.getUser_id() +"'" ;

        List<Ads> adsList;

        List<Product> productList = new ArrayList<Product>();

        adsList = jdbcOperations.query(sql, new BeanPropertyRowMapper<Ads>(Ads.class));


        for(int i =0; i<adsList.size(); i++) {
            String sql1 = "SELECT * FROM product where product_id = '" + adsList.get(i).getProduct_id() + "'";
            productList.addAll(jdbcOperations.query(sql1, new BeanPropertyRowMapper<Product>(Product.class)));
            productList.get(i).setView_count(adsList.get(i).getView_count());
        }

        for(int i =0; i < productList.size(); i++) {
            String sql2 = "SELECT * FROM category where cat_id = '" + productList.get(i).getCat_id() + "'";
            List<Category> categories =  jdbcOperations.query(sql2, new BeanPropertyRowMapper<Category>(Category.class));
            productList.get(i).setCategory(categories.get(0));
            if(productList.get(i).getCat_id() == 157 ) {
                productList.get(i).setPr_state("На проверке");
            }
        }

        return productList;
    }
}
