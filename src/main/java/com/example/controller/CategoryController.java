package com.example.controller;

import com.example.entity.Category;
import com.example.entity.Product;
import com.example.service.CatService;
import com.example.utils.Ajax;
import com.example.utils.Res;
import org.apache.commons.io.IOUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;
import sun.misc.ClassLoaderUtil;
import sun.misc.Launcher;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.logging.Logger;

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
    ServletContext servletContext;


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

    @RequestMapping(value = "/putProduct", method = RequestMethod.POST)
    public Map<String, List<Product>> putProduct(@RequestParam("pr_name") String pr_name,
                                                 @RequestParam("img") String img,
                                                 @RequestParam("pr_desc") String pr_desc,
                                                 @RequestParam("price") String price,
                                                 @RequestParam("deposit") String deposit,
                                                 @RequestParam("pr_cost") String pr_cost,
                                                 @RequestParam("will_sell") boolean will_sell,
                                                 @RequestParam("will_exchan") boolean will_exchan,
                                                 @RequestParam("cat_id") String cat_id,
                                                 @RequestParam("user_id") String user_id

                                                 ) throws RestException {

        logger.info("putProduct: user_id  = " + user_id +" pr_name = " + pr_name);

        try {

            List result =null ;
            if(Objects.equals(img, "null") || img.length()<100){

                img = "/upload/products/prod_default.png";
                 result =  catService.putProduct(pr_name, img,pr_desc,price,deposit,pr_cost,will_sell,will_exchan,cat_id,user_id);
            }
            else
            {

                String directory = "./upload/products/"+user_id+"/products/";


                String filename = UUID.randomUUID().toString() + ".png";

            String[] tokenimg = img.split(",");

              try {

                  String imgStr = tokenimg[1];

            BASE64Decoder decoder = new BASE64Decoder();
            byte[] data = decoder.decodeBuffer(imgStr);


             File ff = new File(directory);

            ff.mkdirs();



            BufferedImage image = ImageIO.read(new ByteArrayInputStream(data));


                  File file = new File(directory,filename);
             ImageIO.write(image, "png", file);




            String url =  "/upload/products/"+user_id+"/products/" + filename;

                  logger.info(url);

           result =  catService.putProduct(pr_name, url,pr_desc,price,deposit,pr_cost,will_sell,will_exchan,cat_id,user_id);

              } catch (ArrayIndexOutOfBoundsException e)
              {
                  e.printStackTrace();
              }

            }

            return Ajax.ResponseProducts(result);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RestException(e);

        }
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
