package com.example.service;

import com.example.entity.Requests;

import java.util.List;

/**
 * Created by nurbek on 8/22/16.
 */
public interface ReqService {

   List<Requests> putRequest(String product_id, String user_id);
   List<Requests> getRequestByPrID(String product_id);
   List<Requests> getRequestByUserID(String user_id);
}
