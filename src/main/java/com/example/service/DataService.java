package com.example.service;

import com.example.entity.Company;
import com.example.entity.Customer;
import com.example.entity.Users;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by nurbek on 8/13/16.
 */
public interface DataService {

    List register(String mobile, String email, String pass, String user_type);

      Set<String> getAllUsers();
    List<Users> login (String mobile, String email, String pass);
    Map<String, String> chPass (String user_id, String pass);
    Map<String, String> editProf (String url, String fio, String tel, String bday, String user_id, String user_type);
    List uploadAVA (String filepath,String user_id);
    List<Users> getUserByID(String id);
    List<Customer> getCustByID(String id);
    List<Company> getCompByID(String id);

}
