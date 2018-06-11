package com.example.entity;

/**
 * Created by nurbek on 8/24/16.
 */
public class Ads implements DomainObject {
    public Ads() {
    }
    public Ads(String user_id) {
        this.user_id = user_id;
    }

    protected int ad_id ;
    protected String product_id;
    protected String user_id;

    public int getView_count() {
        return view_count;
    }

    public void setView_count(int view_count) {
        this.view_count = view_count;
    }

    protected int view_count = 0;


    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getAd_id() {
        return ad_id;
    }

    public void setAd_id(int ad_id) {
        this.ad_id = ad_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }


}
