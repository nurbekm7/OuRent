package com.example.service;

import com.example.entity.Requests;
import com.example.repository.ReqRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nurbek on 8/22/16.
 */
@Service("ReqService")
public class ReqServiceImpl implements ReqService {


    @Autowired
    @Qualifier("ReqRepository")
    private ReqRepository reqRepository;


    private static final Logger LOG =  LoggerFactory.getLogger(DataServiceImpl.class);

    @Override
    public List<Requests> putRequest(String product_id, String user_id) {
        try {
            return  reqRepository.putRequest(new Requests(product_id, user_id));

        } catch (Exception e) {
            LOG.error("ERROR LOGIN Customer: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List getRequestByPrID(String product_id) {

        try {
            return reqRepository.getRequestByPrID(new Requests(product_id));
        } catch (Exception e) {
            LOG.error("ERROR Ads: " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List getRequestByUserID(String user_id) {

        try {
            return reqRepository.getRequestByUserID(user_id);
        } catch (Exception e) {
            LOG.error("ERROR Ads: " + e.getMessage(), e);
            return null;
        }
    }
}
