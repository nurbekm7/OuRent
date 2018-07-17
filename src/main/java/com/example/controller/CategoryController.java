package com.example.controller;

import com.example.entity.Category;
import com.example.entity.Product;
import com.example.service.CatService;
import com.example.service.GoogleMail;
import com.example.storage.StorageService;
import com.example.utils.Ajax;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.*;

/**
 * Created by nurbek on 8/16/16.
 */
@RestController
@RequestMapping(value = "/category", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryController extends ExceptionHandlerController {

    org.slf4j.Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    @Qualifier("catService")
    private CatService catService;


    @Autowired
    StorageService storageService;

    @RequestMapping(value = "/getSubCatsByID", method = RequestMethod.GET)
    public Map<String, List<Category>> getSubCatsByID(@RequestParam("cat_id") String cat_id) throws RestException {
        logger.info("getSubCatsByID: cat_id= " +cat_id);
        try {
            if (cat_id == null || cat_id.equals("")) {
                return null;
            }
            List<Category> result =  catService.getSubCatsByID(cat_id);

            return Ajax.successResponseSubCats(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getCatByID", method = RequestMethod.GET)
    public Map<String, List<Category>> getCatsByID(@RequestParam("cat_id") String cat_id) throws RestException {
        logger.info("getCatByID: cat_id= " +cat_id);
        try {
            if (cat_id == null || cat_id.equals("")) {
                return null;
            }
            List<Category> result =  catService.getCatsByID(cat_id);

            return Ajax.successResponseSubCats(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }


    @RequestMapping(value = "/getAllCats", method = RequestMethod.GET)
    public Map<String,  List<Category>> getAllCats() throws RestException {
        logger.info("getAllCats");

        try {

            List<Category> result = catService.getAllCats();

            return Ajax.successResponseCats(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public Map<String, List<Product>> getProductsByID(@RequestParam("cat_id") String cat_id) throws RestException {
        logger.info("getProducts by cat_id: cat_id = " + cat_id);

        try {
            if (cat_id == null || cat_id.equals("")) {
                return null;
            }
            List<Product> result =  catService.getProductsByID(cat_id);

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            throw new RestException(e);
        }
    }

    @PostMapping("/post/images")
    public ResponseEntity<List<String>> handleFileUpload(@RequestParam("file") MultipartFile[] files, @RequestParam("user_id") String user_id) {
        List<String> message = new ArrayList<String>();
        try {
            String rootPath = "upload/products/" + user_id +"/" + UUID.randomUUID().toString() + "/"  ;
            for(MultipartFile file : files) {
                message.add(storageService.store(file, rootPath)) ;
            }
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @RequestMapping(value = "/putProduct", method = RequestMethod.POST)
    public Map putProduct(
            @RequestParam("user_id") String user_id,
            @RequestParam("pr_name") String pr_name,
            @RequestParam("pr_desc") String pr_desc,
            @RequestParam("price") String price,
            @RequestParam("deposit") String deposit,
            @RequestParam("pr_cost") String pr_cost,
            @RequestParam("will_sell") String will_sell,
            @RequestParam("will_exchan") String will_exchan,
            @RequestParam("file") MultipartFile[] files) throws RestException {

        logger.info("putProduct: user_id  = " + user_id +" pr_name = " + pr_name);

        Product pr = new Product();
        pr.setUser_id(Integer.valueOf(user_id));
        pr.setPr_name(pr_name);
        pr.setPr_desc(pr_desc);
        pr.setPrice(Double.valueOf(price));
        pr.setDeposit(Double.valueOf(deposit));
        pr.setPr_cost(Double.valueOf(pr_cost));
        pr.setWill_sell(Boolean.valueOf(will_sell));
        pr.setWill_exchan(Boolean.valueOf(will_exchan));

        try {

            List result = null ;
            if(files.length == 0){
                result =  catService.putProduct(pr);
            }
            else
            {
                String message = "";
                List<String> urls = new ArrayList<String>();
                String rootPath = "upload/products/" + user_id +"/" + UUID.randomUUID().toString() + "/"  ;

                for (MultipartFile file : files) {
                        urls.add(rootPath + file.getOriginalFilename());
                        storageService.store(file, rootPath);
                }

                logger.info(urls.toString());
                pr.setImg(urls);
                result =  catService.putProduct(pr);

                message = "You successfully uploaded " + files.length + " imgs!";
                logger.debug(message);


            }

            if(result != null) {
                try {
                    GoogleMail.Send("ourent.kz", "MN1302N96", "nurbekm7@gmail.com",
                            "New add product Request",
                            "New request to add product: " + pr_name + ".\n From: "+ user_id);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            }

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            for (String img: pr.getImg()) {
                storageService.deleteImg(img);
            }
            throw new RestException(e);
        }

//        return Ajax.emptyResponse();
    }

    @RequestMapping(value = "/getProductByID", method = RequestMethod.GET)
    public Map<String, List<Product>> getProductByID(@RequestParam("product_id") String product_id) throws RestException {
        logger.info("getProductByID: product_id  = " + product_id);

        try {
            if (product_id == null || product_id.equals("")) {
                return null;
            }

            List<Product> result =  catService.getProductByID(product_id);

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }


    @RequestMapping(value = "/deleteProductByID", method = RequestMethod.POST)
    public Map<String, Object> deleteProductByID(@RequestParam("product_id") String product_id) throws RestException {
        logger.info("deleteProductByID: product_id  = " + product_id);

        try {
            if (product_id == null || product_id.equals("")) {
                return null;
            }

            Map<String, String> result =  catService.deleteProductByID(product_id);

            return Ajax.deletingSuccess(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getProductByUserID", method = RequestMethod.GET)
    public Map<String, List<Product>> getProductByUserID(@RequestParam("user_id") String user_id) throws RestException {
        logger.info("getProductByUserID: user_id  = " + user_id);

        try {
            if (user_id == null || user_id.equals("")) {
                return null;
            }

            List<Product> result =  catService.getProductByUserID(user_id);

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/getPopularProducts", method = RequestMethod.GET)
    public Map<String, List<Product>> getPopularProducts() throws RestException {
        logger.info("getPopularProducts:");

        try {

            List<Product> result =  catService.getPopularProducts();

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }


    @RequestMapping(value = "/getPopularProductsByID", method = RequestMethod.GET)
    public Map<String, List<Product>> getPopularProductsByID(@RequestParam("cat_id") String cat_id, @RequestParam("product_id") String product_id) throws RestException {
        logger.info("getPopularProductsByID: " + cat_id);

        try {

            List<Product> result =  catService.getPopularProductsByID(cat_id, product_id);

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }

    @RequestMapping(value = "/searchProduct", method = RequestMethod.GET)
    public Map<String, List<Product>> searchProduct(@RequestParam("text") String text) throws RestException {
        logger.info("searchProduct: " + text);

        try {

            List<Product> result =  catService.searchProduct(text);

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);
        }
    }




}
