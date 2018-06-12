package com.example.controller;

import com.example.entity.Users;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.example.service.DataService;
import com.example.utils.Ajax;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;
import java.util.logging.Logger;

/**
 * Created by nurbek on 8/13/16.
 */
@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class DataController extends ExceptionHandlerController{
    private static final Logger LOG = Logger.getLogger(String.valueOf(DataController.class));

    org.slf4j.Logger logger = LoggerFactory.getLogger(DataController.class);
    @Autowired
    @Qualifier("dataService")
    private DataService dataService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Map<String, Object> register(@RequestParam("email") String email, @RequestParam("pass") String pass, @RequestParam("user_type") String user_type) throws RestException {

        logger.debug("Register: email = " + email + " pass = "+ pass + " user_type: " + user_type);
        try {
            if (email == null || email.equals("")) {
                return Ajax.errorResponse("EMAIL IS EMPTY");
            }


            List object = dataService.register(email, pass,user_type);
            return Ajax.registerSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(@RequestParam(name = "email", required = false) String email, @RequestParam(name = "mobile", required=false) String mobile, @RequestParam("pass") String pass) throws RestException {

        logger.debug("LOGIN: email = " + email+ " mobile = "+ mobile+ " pass = "+ pass);
        try {

            Object object = dataService.login(email, mobile,pass);
            return Ajax.registerSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/chPass", method = RequestMethod.POST)
    public Map<String, Object> chPass(@RequestParam("user_id") String user_id,@RequestParam("pass") String pass) throws RestException {

        logger.debug("Change Pass: pass = "+ pass + " user_id= " + user_id);
        try {
            if (pass == null || pass.equals("")) {
                return Ajax.errorResponse("pass IS EMPTY");
            }


            Object object = dataService.chPass(user_id, pass);
            return Ajax.registerSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/editProf", method = RequestMethod.POST)
    public Map<String, Object> editProf(@RequestBody Users users ) throws RestException {

        logger.info("EditProf: user_id = " + users.getUser_id());
        try {
            if (users.getUser_id() == 0 ) {
                return Ajax.errorResponse("UserId IS EMPTY");
            }

            Map result = null ;

            result  = dataService.editProf(users);

            return Ajax.editSuccess(result);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }





    @RequestMapping(value = "/getUserByID", method = RequestMethod.GET)
    public Map<String, Object> getUserByID(@RequestParam("user_id") String user_id) throws RestException {

        logger.debug("getUserByID: user_id = " + user_id);
        try {
            if (user_id == null || user_id.equals("")) {
                return Ajax.errorResponse("user_id IS EMPTY");
            }

            Object object = dataService.getUserByID(user_id);
            return Ajax.registerSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }



    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
    public Map<String, Object> getAllUsers() throws RestException {
        logger.debug("getAllUsers");
        try {
            Set<String> result = dataService.getAllUsers();
            return Ajax.successResponse(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getCustByID", method = RequestMethod.GET)
    public Map<String, Object> getCustByID(@RequestParam("user_id") String user_id) throws RestException {
        logger.debug("getCustByID: user_id = " + user_id);
        try {
            if (user_id == null || user_id.equals("")) {
                return Ajax.errorResponse("user_id IS EMPTY");
            }


            Object object = dataService.getCustByID(user_id);
            return Ajax.getCustomer(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getCompByID", method = RequestMethod.GET)
    public Map<String, Object> getCompByID(@RequestParam("user_id") String user_id) throws RestException {

        logger.debug("getCompByID: user_id: " + user_id);
        try {
            if (user_id == null || user_id.equals("")) {
                return Ajax.errorResponse("user_id IS EMPTY");
            }


            Object object = dataService.getCompByID(user_id);
            return Ajax.getCompany(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }



}
