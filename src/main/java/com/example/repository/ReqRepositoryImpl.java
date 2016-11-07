package com.example.repository;

import com.example.entity.Requests;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;

import java.util.List;

/**
 * Created by nurbek on 8/22/16.
 */

@org.springframework.stereotype.Repository("ReqRepository")
public class ReqRepositoryImpl implements ReqRepository {


    private static final Logger LOG = LoggerFactory.getLogger(DataRepositoryImpl.class);

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Requests> putRequest(Requests requests) {

        try {
            String sql = "SELECT COUNT(*) from requests where product_id = '" + requests.getProduct_id() + "' and user_id = '"
                    + requests.getUser_id() + "'";
            Integer count = jdbcOperations.queryForObject(sql, Integer.class);

            if (count == 0) {


                jdbcOperations.update("INSERT INTO Requests(" +
                        " product_id, user_id)" +
                        "    VALUES ('" + requests.getProduct_id() + "','" + requests.getUser_id() + "' );");


                List<Requests> requestsList = jdbcOperations.query("SELECT * from requests where product_id = '" + requests.getProduct_id() + "' and user_id = '" + requests.getUser_id()+"'",
                        new BeanPropertyRowMapper<Requests>(Requests.class));


                return requestsList;
            } else

                return null;
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }

    }


    @Override
    public List<Requests> getRequestByPrID(Requests requests) {

        String sql = "SELECT * FROM Requests where product_id = '" + requests.getProduct_id() +"'" ;

        List<Requests> requestses;

        requestses = jdbcOperations.query(sql, new BeanPropertyRowMapper<Requests>(Requests.class));

        if(requestses.isEmpty())
            return null;
        else
            return requestses;
    }

    @Override
    public List<Requests> getRequestByUserID(String user_id) {

        String sql = "SELECT * FROM Requests where user_id = '" + user_id +"'" ;

        List<Requests> requestses;

        requestses = jdbcOperations.query(sql, new BeanPropertyRowMapper<Requests>(Requests.class));

        if(requestses.isEmpty())
        return null;
        else
            return requestses;
    }
}
