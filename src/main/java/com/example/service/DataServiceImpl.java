package com.example.service;

import com.example.entity.Company;
import com.example.entity.Customer;
import com.example.entity.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.example.repository.DataRepository;

import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * Created by nurbek on 8/13/16.
 */
@Service("dataService")
public class DataServiceImpl implements DataService {


    private static final Logger LOG =  LoggerFactory.getLogger(DataServiceImpl.class);

    @Autowired
    @Qualifier("dataRespitory")
    private DataRepository dataRepository;

    @Override
    public List register(String mobile, String email, String pass, String user_type) {
         try {


            return  dataRepository.register(new Users(mobile, email, pass, user_type));


         } catch (Exception e) {
            LOG.error("ERROR REGISTER Customer: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Users> login(String mobile,String email, String pass) {
        try {
            return  dataRepository.login(mobile, email, pass);

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public Map<String, String> chPass(String user_id,String pass) {
        try {
            return  dataRepository.chPass(user_id,pass);

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }


 @Override
    public Map<String, String> editProf(String url, String fio, String tel, String bday, String user_id ,String user_type) {
        try {
            return  dataRepository.editProf(url,fio, tel,bday,user_id,user_type);

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List uploadAVA(String filepath,String user_id) {
        try {
            return  dataRepository.uploadAVA(filepath, user_id);

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public Set<String> getAllUsers() {
        return dataRepository.getAllUsers();
    }

    @Override
    public List<Users> getUserByID( String user_id) {
        try {
            return dataRepository.getUserByID(user_id);
        } catch (Exception e) {
            LOG.error("ERROR User: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Customer> getCustByID(String user_id) {
        try {
            return dataRepository.getCustByID(user_id);
        } catch (Exception e) {
            LOG.error("ERROR User: " + e.getMessage(), e);
            return null;
        }
    }
    @Override
    public List<Company> getCompByID(String user_id) {
        try {
            return dataRepository.getCompByID(user_id);
        } catch (Exception e) {
            LOG.error("ERROR User: " + e.getMessage(), e);
            return null;
        }
    }

}
