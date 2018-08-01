package com.example.repository;

import com.example.controller.RestException;
import com.example.entity.Category;
import com.example.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Array;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by nurbek on 8/16/16.
 */


@org.springframework.stereotype.Repository("catsRespitory")
public class CatRepoImpl extends JdbcDaoSupport implements CatRepo {



    @Autowired
    protected JdbcOperations jdbcOperations;

    @Autowired
    JdbcTemplate jdbcTemplate;


    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public List<Category> getAllCats() {

        String sql = "SELECT cat_id, cat_name, p_id FROM category where cat_id>=1 and cat_id <=10";


        List<Category> categories = new ArrayList<Category>();

        SqlRowSet rowSet = jdbcOperations.queryForRowSet(sql);


        while (rowSet.next()) {

            Category category = new Category();
            category.setCat_id(rowSet.getString("cat_id"));
            category.setCat_name(rowSet.getString("cat_name"));
            category.setP_id(rowSet.getInt("p_id"));
            categories.add(category);
        }
        return categories;
    }


    @Override
    public List<Category> getSubCatsByID(String cat_id) {

        String sql = "SELECT cat_id, cat_name, p_id FROM category where p_id= '" + cat_id +"'" ;


        List<Category> categories = new ArrayList<Category>();


        SqlRowSet rowSet = jdbcOperations.queryForRowSet(sql);


        while (rowSet.next()) {

            Category category = new Category();
            category.setCat_id(rowSet.getString("cat_id"));
            category.setCat_name(rowSet.getString("cat_name"));
            category.setP_id(rowSet.getInt("p_id"));
            categories.add(category);
        }
        return categories;
    }

    @Override
    public List<Category> getCatsByID(String cat_id) {

        String sql = "SELECT cat_id, cat_name, p_id FROM category where cat_id= '" + cat_id+"'"  ;


        List<Category> categories = new ArrayList<Category>();


        SqlRowSet rowSet = jdbcOperations.queryForRowSet(sql);


        while (rowSet.next()) {

            Category category = new Category();
            category.setCat_id(rowSet.getString("cat_id"));
            category.setCat_name(rowSet.getString("cat_name"));
            category.setP_id(rowSet.getInt("p_id"));
            categories.add(category);
        }
        return categories;
    }

    @Override
    public List<Product> getProductsByID(String cat_id) {

        String sql = "SELECT * FROM product where cat_id = " + cat_id  ;

        List<Product> products =  new ArrayList<Product>();



        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));



        return products;
    }


    @Override
    public List<Product> getProductByID(String product_id) {

        String sql = "SELECT * FROM product where product_id = '" + product_id +"'" ;

        List<Product> products =  new ArrayList<Product>();
        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));
        return products;
    }

    @Override
    public List<Product> getPopularProducts() {

        String sql = "SELECT * FROM product where cat_id != 157 ORDER BY RANDOM() LIMIT 4 ";

        List<Product> products;
        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));
        return products;
    }

    @Override
    public List<Product> searchProduct(String text) {

        String sql = "select * from product where LOWER(pr_name) LIKE LOWER('%" + text + "%')";

        List<Product> products;
        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));
        return products;
    }

    @Override
    public List<Product> getPopularProductsByID(String cat_id , String product_id) {

        String sql = "SELECT * FROM product where cat_id = "+cat_id+" and product_id !="+product_id+" ORDER BY RANDOM() LIMIT 4 ";

        List<Product> products =  new ArrayList<Product>();
        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));
        return products;
    }


    @Override
    public Map<String, String> deleteProductByID(String product_id) {

        Map<String, String> result =  new HashMap<>();

        String sql ="DELETE FROM ads where product_id = '" + product_id +"'; " +"DELETE FROM favorites where product_id = '" + product_id +"'; " +"DELETE FROM requests where product_id = '" + product_id +"'; " + "DELETE FROM product where product_id = '" + product_id +"'; " ;

        List<Product> products =  new ArrayList<Product>();
        int c = jdbcOperations.update(sql);

        if(c == 0)
            return null;
        else
        {
            result.put("product_id", product_id);
        }

        return result;
    }

    @Override
    public List<Product> getProductByUserID(String user_id) {

        String sql = "SELECT * FROM product where user_id = '" + user_id +"'" ;

        List<Product> products =  new ArrayList<Product>();


        products = jdbcOperations.query(sql, new BeanPropertyRowMapper<Product>(Product.class));



        return products;
    }

    private java.sql.Array createSqlArray(List<String> list){
        java.sql.Array imgArray = null;
        try {
            imgArray = jdbcTemplate.getDataSource().getConnection().createArrayOf("text", list.toArray());
        } catch (SQLException ignore) {
        }
        return imgArray;
    }

    @Override
    public Product putProduct(Product pr) throws RestException {

        String sql = "SELECT COUNT(*) FROM product where pr_name = '" + pr.getPr_name() +"' and user_id= '" + pr.getUser_id() +"'";

        Integer name = jdbcOperations.queryForObject(sql, Integer.class);


            if (name == 0) {

                String insertSql = "INSERT INTO Product(pr_name, img, pr_desc,price, deposit,pr_cost, will_sell, will_exchan, cat_id, user_id) VALUES (?,?,?,?,?,?,?,?,?,?)";

//                jdbcOperations.update("INSERT INTO Product(" +
//                        " pr_name, img, pr_desc,price, deposit,pr_cost, will_sell, will_exchan, cat_id, user_id)" +
//                        "    VALUES ('" + pr.getPr_name() + "','" + pr.getImg() + "','"
//                        + pr.getPr_desc() + "','" + pr.getPrice() + "','" + pr.getDeposit() + "','" + pr.getPr_cost() +
//                        "','" + pr.getWill_sell() + "','" + pr.getWill_exchan() + "','" + pr.getCat_id() + "','" + pr.getUser_id() + "');");

                jdbcTemplate.update(insertSql,
                        pr.getPr_name(),
                        createSqlArray(pr.getImg()),
                        pr.getPr_desc()
                        , pr.getPrice()
                        , pr.getDeposit()
                        ,  pr.getPr_cost()
                        ,  pr.getWill_sell()
                        ,  pr.getWill_exchan()
                        ,  pr.getCat_id()
                        ,  pr.getUser_id()
                );


                String sql1 = "SELECT product_id FROM product where pr_name = '" + pr.getPr_name()  + "' and user_id= '" + pr.getUser_id() + "'";


//                String product_id = jdbcOperations.queryForObject(sql1, String.class);
                int product_id = getJdbcTemplate().queryForObject(sql1, Integer.class);






                jdbcOperations.update("INSERT INTO Ads(" +
                        " product_id, user_id)" +
                        " VALUES ('" + product_id + "','" + pr.getUser_id() + "')");



                Product product = new Product();
//                        jdbcOperations.query("SELECT * from product where pr_name = '" +  pr.getPr_name()  +
//                                "' and user_id= '" + pr.getUser_id() + "'",
//                        new BeanPropertyRowMapper<Product>(Product.class));

                try {

                    String sql4 = "SELECT * from product where pr_name = '" +  pr.getPr_name()  +
                            "' and user_id= '" + pr.getUser_id() + "'";
                    PreparedStatement ps = jdbcTemplate.getDataSource().getConnection().prepareStatement(sql4);
                    ResultSet rs = ps.executeQuery();

                    while(rs.next()) {

                        System.out.println("Product: " + rs.getString(1));
                        System.out.println("---------------");
                        product.setProduct_id(rs.getString(1));
                        product.setPr_name(rs.getString(2));
                        product.setImg(Arrays.asList( (String[]) rs.getArray(3).getArray()));
                        product.setPr_desc(rs.getString(4));
                        product.setPrice(rs.getDouble(5));
                        product.setDeposit(rs.getDouble(6));
                        product.setPr_cost(rs.getDouble(7));
                        product.setWill_sell(rs.getBoolean(8));
                        product.setWill_exchan(rs.getBoolean(9));
                        product.setCat_id(rs.getInt(10));
                        product.setPr_date(rs.getString(11));
                        product.setUser_id(rs.getInt(12));
                    }

                } catch (Exception e) {

                    System.out.println(e.getMessage());
                    e.printStackTrace();
                }


                return product;

            } else
                throw new RestException("Already");

    }
}
