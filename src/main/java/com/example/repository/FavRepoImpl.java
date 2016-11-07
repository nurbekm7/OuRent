package com.example.repository;

import com.example.entity.Favorites;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;

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

        favorites = jdbcOperations.query(sql, new BeanPropertyRowMapper<Favorites>(Favorites.class));

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
