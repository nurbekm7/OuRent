package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class DataController extends ExceptionHandlerController{
    private static final Logger LOG = Logger.getLogger(String.valueOf(DataController.class));

    @Autowired
    @Qualifier("dataService")
    private DataService dataService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Map<String, Object> register(@RequestParam("email") String email, @RequestParam("pass") String pass, @RequestParam("user_type") String user_type) throws RestException {
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
    public Map<String, Object> login(@RequestParam("email") String email, @RequestParam("pass") String pass) throws RestException {
        try {
            if (email == null || email.equals("")) {
                return Ajax.errorResponse("EMAIL IS EMPTY");
            }


            Object object = dataService.login(email, pass);
            return Ajax.registerSuccess(object);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/editProf", method = RequestMethod.POST)
    public Map<String, Object> editProf(@RequestParam("ava") String ava, @RequestParam("fio") String fio, @RequestParam("tel") String tel, @RequestParam("bday") String bday,@RequestParam("user_id") String user_id ) throws RestException {
        try {
            if (fio == null || fio.equals("")) {
                return Ajax.errorResponse("fio IS EMPTY");
            }

            Map<String, String> result = null ;

            if(ava.length()<100 || Objects.equals(ava, "null"))
            {


                result  = dataService.editProf(ava,fio, tel,bday,user_id);

            }else
            {

                String directory = "C:\\Users\\admin\\Desktop\\OuRent\\OuRent\\OuRent\\demo\\src\\main\\resources\\static\\upload\\users\\"+user_id+"\\ava\\";

                String filename = user_id + ".png";

                String[] tokenimg = ava.split(",");

                try {

                    String imgStr = tokenimg[1];

                    BASE64Decoder decoder = new BASE64Decoder();
                    byte[] data = decoder.decodeBuffer(imgStr);



                    File ff = new File(directory);

                    ff.mkdirs();



                    BufferedImage image = ImageIO.read(new ByteArrayInputStream(data));


                    ImageIO.write(image, "png", new File(directory,filename));



                    String url =  "\\upload\\users\\"+user_id+"\\ava\\"+ filename;

                    result  = dataService.editProf(url,fio, tel,bday,user_id);
                } catch (ArrayIndexOutOfBoundsException e)
                {
                    e.printStackTrace();
                }

            }

            return Ajax.editSuccess(result);

        } catch (Exception e) {
            throw new RestException(e);
        }
    }





    @RequestMapping(value = "/getUserByID", method = RequestMethod.GET)
    public Map<String, Object> getUserByID(@RequestParam("user_id") String user_id) throws RestException {
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
        try {
            Set<String> result = dataService.getAllUsers();
            return Ajax.successResponse(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getCustByID", method = RequestMethod.GET)
    public Map<String, Object> getCustByID(@RequestParam("user_id") String user_id) throws RestException {
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