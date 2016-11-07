package com.example.entity;

/**
 * Created by nurbek on 8/24/16.
 */
public class Favorites implements DomainObject {
    public Favorites() {
    }

    public Favorites(String user_id) {
        this.user_id = user_id;
    }

    public Favorites(String product_id, String user_id) {

        this.product_id =product_id;
        this.user_id = user_id;
    }

    public int getFav_id() {
        return fav_id;
    }

    public void setFav_id(int fav_id) {
        this.fav_id = fav_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    protected int fav_id;
    protected String product_id;



    protected String user_id;

}
