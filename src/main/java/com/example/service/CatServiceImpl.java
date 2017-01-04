package com.example.service;

import com.example.entity.Category;
import com.example.entity.Product;
import com.example.repository.CatRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by nurbek on 8/16/16.
 */
@Service("catService")
public class CatServiceImpl implements CatService {


    private static final Logger LOG =  LoggerFactory.getLogger(CatServiceImpl.class);

    @Autowired
    @Qualifier("catsRespitory")
    private CatRepo catRepo;

    @Override
    public List<Category> getAllCats() {
        return catRepo.getAllCats();
    }

    @Override
    public List<Category> getSubCatsByID( String cat_id) {
        try {
            return catRepo.getSubCatsByID(cat_id);
        } catch (Exception e) {
            LOG.error("ERROR SubCats: " + e.getMessage(), e);
           return null;
        }
    }
    @Override
    public List<Category> getCatsByID( String cat_id) {
        try {
            return catRepo.getCatsByID(cat_id);
        } catch (Exception e) {
            LOG.error("ERROR SubCats: " + e.getMessage(), e);
           return null;
        }
    }

    @Override
    public List<Product> getProductsByID(String cat_id) {
        try {
            return catRepo.getProductsByID(cat_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Product> getProductByUserID(String user_id) {
        try {
            return catRepo.getProductByUserID(user_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Product> putProduct(String pr_name, String img, String pr_desc,String price, String  deposit, String pr_cost,boolean will_sell,boolean will_exchan, String cat_id, String user_id) {
        try {
            return catRepo.putProduct(pr_name, img,pr_desc,price,deposit,pr_cost,will_sell,will_exchan, cat_id, user_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }



    @Override
    public List<Product> getProductByID(String product_id) {
        try {
            return catRepo.getProductByID(product_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Product> getPopularProducts() {
        try {
            return catRepo.getPopularProducts();
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<Product> getPopularProductsByID(String cat_id, String product_id) {
        try {
            return catRepo.getPopularProductsByID(cat_id, product_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

    @Override
    public Map<String, String> deleteProductByID(String product_id) {
        try {
            return catRepo.deleteProductByID(product_id);
        } catch (Exception e) {
            LOG.error("ERROR GET Products : " + e.getMessage(), e);
            return null;
        }
    }

}
