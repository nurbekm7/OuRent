package com.example.repository;

import com.example.entity.Company;
import com.example.entity.Customer;
import com.example.entity.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.*;

/**
 * Created by nurbek on 8/13/16.
 */
@org.springframework.stereotype.Repository("dataRespitory")
public class DataRepositoryImpl implements DataRepository {


    private static final Logger LOG = LoggerFactory.getLogger(DataRepositoryImpl.class);

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Users> register(Users object) {


        String sql ="SELECT COUNT(*) from users where email = '" + object.getEmail()+"'";
        Integer email = jdbcOperations.queryForObject(sql, Integer.class);


        try{


             if(email == 0){


                 jdbcOperations.update("INSERT INTO Users(" +
                         " email, pass, user_type )" +
                         "    VALUES ('"  + object.getEmail()+  "','"+object.getPass()+ "','"
                         + object.getUser_type()+"');");



                 if(object.getUser_type().equals("0"))
                 {
                     jdbcOperations.update("INSERT INTO Customer(" +
                             " ver_status)" + " VALUES (false);");
                 }
                 else
                 if(object.getUser_type().equals("1"))
                 {
                     jdbcOperations.update("INSERT INTO Company(" +
                             " ver_status)" +
                             "    VALUES (false);");
                 }

                 List<Users> userses = jdbcOperations.query("SELECT * from users where email = '" + object.getEmail() + "'",
                         new BeanPropertyRowMapper<Users>(Users.class));


                 return userses;


             }
             else {
                 return null;
             }
         } catch (Exception e)
         {
               e.printStackTrace();

               return null;

         }
    }





    @Override
    public Users login(String email,String mobile, String pass) {


        try{
            String sql = "";
            if(email == null || email.equals("")) {
                sql = "SELECT * from users where phone_num = '" + mobile + "' and pass = '" + pass + "'";
            } else {
                sql = "SELECT * from users where email = '" + email + "' and pass = '" + pass + "'";
            }

                List<Users> userses = jdbcOperations.query(sql, new BeanPropertyRowMapper<Users>(Users.class));

              if(userses.isEmpty()){
                  return null;
              }
            else
                return  userses.get(0);



        } catch (Exception e)
        {
            e.printStackTrace();

            return null;

        }
    }


    @Override
    public Map<String, String> chPass(String user_id,String pass) {


        Map<String, String> result =  new HashMap<>();

        try{

            String sql ="UPDATE users SET pass = '"+pass+ "' where  user_id = "+ user_id +" ";


                int res = jdbcOperations.update(sql);

              if(res == 0 ){
                  return null;
              }
            else {
                  result.put("user_id", user_id);
              }
                  return result;



        } catch (Exception e)
        {
            e.printStackTrace();

            return null;

        }
    }

    @Override
    public List<Users> getUserByID(String user_id) {

        String sql = "SELECT * FROM users where user_id = '" + user_id + "'";

        List<Users> userses =  new ArrayList<Users>();



        userses = jdbcOperations.query(sql, new BeanPropertyRowMapper<Users>(Users.class));

        if(userses.isEmpty())
            return null;
        else
        return userses;



    }

    @Override
    public Map<String, String> editProf(Users users ) {

        int tt =0;
        Map<String, String> userses =  new HashMap<>();

//      if (Objects.equals(user_type, "0"))
//          tt = jdbcOperations.update("update customer set fio = '"+ fio +"' , bdate= '"+ bday +"' where cust_id ="+ user_id );
//      else
//      if(Objects.equals(user_type, "1")){
//          tt = jdbcOperations.update("update company set comp_name = '" + fio + "' where comp_id =" + user_id);
//      }

        int t = jdbcOperations.update("update users set  user_name = '"+ users.getUser_name() + "'  where user_id ="+ users.getUser_id() );

        if(t==1){
        userses.put("user_name", users.getUser_name());
//        userses.put("email",users.getPhone_num());
//        userses.put("ava",url);
//        userses.put("bday", );
//        userses.put("user_id", users.getUser_id() );
        }

        if(userses.isEmpty())
            return null;
        else
        return userses;

    }


 @Override
    public List<String> uploadAVA(String filepath,String user_id) {


        List<String> files =  new ArrayList<String>();



       int t = jdbcOperations.update("update users set ava = '"+ filepath + "' where user_id ="+ user_id );

        if( t==1){

            files.add(filepath);

        }
        if(files.isEmpty())
            return null;
        else
        return files;



    }

    @Override
    public List<Customer> getCustByID(String cust_id) {

        String sql = "SELECT * FROM customer where cust_id = '" + cust_id + "'";

        List<Customer> customers;



        customers = jdbcOperations.query(sql, new BeanPropertyRowMapper<Customer>(Customer.class));

        if(customers.isEmpty())
        {
            return null;
        }
        else {
            return customers;
        }
    }

    @Override
    public List<Company> getCompByID(String comp_id) {

        String sql = "SELECT * FROM Company where comp_id = '" + comp_id + "'";

        List<Company> companies=  new ArrayList<Company>();



        companies = jdbcOperations.query(sql, new BeanPropertyRowMapper<Company>(Company.class));

        if(companies.isEmpty())
            return null;
        else
        return companies;


    }


    @Override
    public Set<String> getAllUsers() {
        Set<String> result = new HashSet<>();
        SqlRowSet rowSet = jdbcOperations.queryForRowSet("SELECT user_id, email FROM Users ");

        while (rowSet.next()) {
            result.add(rowSet.getString("email"));
        }
        return result;
    }
}