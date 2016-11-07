package com.example.repository;

import com.example.entity.DomainObject;
import com.example.entity.Requests;

import java.util.List;

/**
 * Created by nurbek on 8/22/16.
 */
public interface ReqRepository<V extends DomainObject> {

    List<Requests> putRequest(Requests requests);
    List<Requests> getRequestByPrID(Requests requests);
    List<Requests> getRequestByUserID(String user_id);
}
