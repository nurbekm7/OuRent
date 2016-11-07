package com.example.entity;

/**
 * Created by nurbek on 8/22/16.
 */
public class Requests implements DomainObject {

    public Requests() {
    }

    public Requests(String product_id, String user_id) {
        this.product_id = product_id;
        this.user_id = user_id;
    }

    public int getRequest_id() {
        return request_id;
    }

    public void setRequest_id(int request_id) {
        this.request_id = request_id;
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

    public String getRq_date() {
        return rq_date;
    }

    public void setRq_date(String rq_date) {
        this.rq_date = rq_date;
    }

    public boolean isRq_status() {
        return rq_status;
    }

    public void setRq_status(boolean rq_status) {
        this.rq_status = rq_status;
    }

    public Requests(String product_id) {
        this.product_id = product_id;
    }




    protected int request_id;



    protected String product_id;
    protected String user_id;
    protected String rq_date ="";
    protected boolean rq_status;





}
