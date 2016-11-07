package com.example.controller;

import com.example.entity.Requests;
import com.example.service.ReqService;
import com.example.utils.Ajax;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/22/16.
 */


@RestController
@RequestMapping(value = "/request", produces = MediaType.APPLICATION_JSON_VALUE)
public class RequestController extends ExceptionHandlerController {

    @Autowired
    @Qualifier("ReqService")
    private ReqService reqService;

    @RequestMapping(value = "/putRequest", method = RequestMethod.POST)
    public Map<String, Object> putRequest(@RequestParam("product_id") String product_id, @RequestParam("user_id") String user_id) throws RestException {
        try {
            if (product_id == null || product_id.equals("")) {
                return Ajax.errorResponse("product_id IS EMPTY");
            }


            Object object = reqService.putRequest(product_id, user_id);
            return Ajax.putReqSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getRequestByPrID", method = RequestMethod.GET)
    public Map<String, List<Requests>> getRequestByPrID(@RequestParam("product_id") String product_id) throws RestException {
        try {
            if (product_id == null || product_id.equals("")) {
                return null;
            }
            List<Requests> result =  reqService.getRequestByPrID(product_id);

            return Ajax.ResponseReq(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getRequestByUserID", method = RequestMethod.GET)
    public Map<String, List<Requests>> getRequestByUserID(@RequestParam("user_id") String user_id) throws RestException {
        try {
            if (user_id == null || user_id.equals("")) {
                return null;
            }
            List<Requests> result =  reqService.getRequestByUserID(user_id);

            return Ajax.ResponseReq(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

}
