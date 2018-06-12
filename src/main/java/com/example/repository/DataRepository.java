package com.example.repository;

import com.example.entity.Company;
import com.example.entity.Customer;
import com.example.entity.DomainObject;
import com.example.entity.Users;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by nurbek on 8/13/16.
 */
public interface DataRepository<V extends DomainObject> {



    List<Users>  register(Users object);

    Map<String, String> editProf (Users users);
    List uploadAVA (String filepath,String user_id);

    Set<String> getAllUsers();

    Users login(String email, String mobile, String pass);
    Map<String, String> chPass(String user_id,String pass);

    List<Users>  getUserByID(String id);
    List<Customer>  getCustByID(String id);
    List<Company>  getCompByID(String id);


}
