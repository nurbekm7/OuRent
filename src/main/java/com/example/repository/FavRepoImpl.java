package com.example.repository;

import com.example.entity.Category;
import com.example.entity.Favorites;
import com.example.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nurbek on 8/24/16.
 */

@org.springframework.stereotype.Repository("FavRepo")
public class FavRepoImpl implements  FavRepo<Favorites> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Favorites> getFavs(Favorites favs) {


        String sql = "SELECT * FROM Favorites where user_id = '" + favs.getUser_id() +"'" ;

        List<Favorites> favorites;

        List<Product> productList = new ArrayList<Product>();

        favorites = jdbcOperations.query(sql, new BeanPropertyRowMapper<Favorites>(Favorites.class));


        for(int i =0; i< favorites.size(); i++) {
            String sql1 = "SELECT * FROM product where product_id = '" + favorites.get(i).getProduct_id() + "'";
            productList.addAll(jdbcOperations.query(sql1, new BeanPropertyRowMapper<Product>(Product.class)));
            favorites.get(i).setProduct(productList.get(0));
        }

        for(int i =0; i < productList.size(); i++) {
            String sql2 = "SELECT * FROM category where cat_id = '" + productList.get(i).getCat_id() + "'";
            List<Category> categories =  jdbcOperations.query(sql2, new BeanPropertyRowMapper<Category>(Category.class));
            productList.get(i).setCategory(categories.get(0));
            if(productList.get(i).getCat_id().equals("157")) {
                productList.get(i).setPr_state("На проверке");
            }
        }

        return favorites;

    }



    @Override
    public List<Favorites> putFav(Favorites fav) {

        try {
            String sql = "SELECT COUNT(*) from Favorites where product_id = '" + fav.getProduct_id() + "' and user_id = '"
                    + fav.getUser_id() + "'";
            Integer count = jdbcOperations.queryForObject(sql, Integer.class);

            if (count == 0) {


                jdbcOperations.update("INSERT INTO Favorites(" +
                        " product_id, user_id)" +
                        "    VALUES ('" + fav.getProduct_id() + "','" + fav.getUser_id() + "' );");


                List<Favorites> favoritesList = jdbcOperations.query("SELECT * from Favorites where product_id = '" + fav.getProduct_id() + "' and user_id = '" + fav.getUser_id()+"'",
                        new BeanPropertyRowMapper<Favorites>(Favorites.class));


                return favoritesList;
            } else

                return null;
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }

    }
}
