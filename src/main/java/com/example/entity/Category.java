package com.example.entity;

/**
 * Created by nurbek on 8/16/16.
 */
public class Category implements DomainObject {

    public Category(String cat_id) {
        this.cat_id = cat_id;
    }

    public Category() {
    }

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public String getCat_name() {
        return cat_name;
    }

    public void setCat_name(String cat_name) {
        this.cat_name = cat_name;
    }

    public String getCat_id() {
        return cat_id;
    }

    public void setCat_id(String cat_id) {
        this.cat_id = cat_id;
    }

    protected String cat_id ;
    protected int p_id = 0;
    protected String cat_name ="";





}
