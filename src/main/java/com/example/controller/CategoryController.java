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
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.servlet.ServletContext;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

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

    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile[] files) {
        String message = "";
        try {
                storageService.store(files);
                message = "You successfully uploaded " + files.length + " imgs!";

            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + files.length + " img!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @RequestMapping(value = "/putProduct", method = RequestMethod.POST)
    public Map<String, Object> putProduct(@RequestBody Product pr ) throws RestException {

        logger.info("putProduct: user_id  = " + pr.getUser_id() +" pr_name = " + pr.getPr_name());

        try {

            List result = null ;
            if(Objects.equals(pr.getImg(), "null") || pr.getImg().length()<100){

                 pr.setImg("/upload/products/prod_default.png");
                 result =  catService.putProduct(pr.getPr_name(), pr.getImg(),
                                                 pr.getPr_desc(),
                                                 pr.getPrice(),
                                                 pr.getDeposit(),
                                                 pr.getPr_cost(),
                                                 pr.getWill_sell(),
                                                 pr.getWill_exchan(),
                                                 pr.getCat_id(),
                                                 String.valueOf(pr.getUser_id())
                 );
            }
            else
            {

                String directory = "./upload/products/"+pr.getUser_id()+"/products/";


                String filename = UUID.randomUUID().toString() + ".png";

            String[] tokenimg = pr.getImg().split(",");

              try {

                  String imgStr = tokenimg[1];

            BASE64Decoder decoder = new BASE64Decoder();
            byte[] data = decoder.decodeBuffer(imgStr);


             File ff = new File(directory);

            ff.mkdirs();



            BufferedImage image = ImageIO.read(new ByteArrayInputStream(data));


                  File file = new File(directory,filename);
             ImageIO.write(image, "png", file);




            String url =  "/upload/products/"+pr.getUser_id()+"/products/" + filename;

                  logger.info(url);

           result =  catService.putProduct(pr.getPr_name(), pr.getImg(),
                   pr.getPr_desc(),
                   pr.getPrice(),
                   pr.getDeposit(),
                   pr.getPr_cost(),
                   pr.getWill_sell(),
                   pr.getWill_exchan(),
                   pr.getCat_id(),
                   String.valueOf(pr.getUser_id()));

              } catch (ArrayIndexOutOfBoundsException e)
              {
                  e.printStackTrace();
              }

            }

            if(result != null) {
                try {
                    GoogleMail.Send("ourent.kz", "MN1302N96", "nurbekm7@gmail.com","New add product Request","New request to add product: " + pr.getPr_name() + ".\n From: "+ pr.getUser_id());
                } catch (MessagingException e) {
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
