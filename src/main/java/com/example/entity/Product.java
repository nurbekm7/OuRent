package com.example.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by nurbek on 8/17/16.
 */
public class Product implements DomainObject {

    public Product() {
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getPr_name() {
        return pr_name;
    }

    public void setPr_name(String pr_name) {
        this.pr_name = pr_name;
    }

    public String getPr_desc() {
        return pr_desc;
    }

    public void setPr_desc(String pr_desc) {
        this.pr_desc = pr_desc;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDeposit() {
        return deposit;
    }

    public void setDeposit(String deposit) {
        this.deposit = deposit;
    }

    public String getPr_cost() {
        return pr_cost;
    }

    public void setPr_cost(String pr_cost) {
        this.pr_cost = pr_cost;
    }

    public boolean getWill_sell() {
        return will_sell;
    }

    public void setWill_sell(boolean will_sell) {
        this.will_sell = will_sell;
    }

    public boolean getWill_exchan() {
        return will_exchan;
    }

    public void setWill_exchan(boolean will_exchan) {
        this.will_exchan = will_exchan;
    }


    public String getPr_date() {
        return pr_date;
    }

    public void setPr_date(String pr_date) {
        this.pr_date = pr_date;
    }

    public boolean isWill_exchan() {
        return will_exchan;
    }

    public List<String> getImg() {
        return img;
    }

    public void setImg(List<String> img) {
        this.img = img;
    }

    public int getView_count() {
        return view_count;
    }

    public void setView_count(int view_count) {
        this.view_count = view_count;
    }

    public String getPr_state() {
        return pr_state;
    }

    public void setPr_state(String pr_state) {
        this.pr_state = pr_state;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCat_id() {
        return cat_id;
    }

    public void setCat_id(String cat_id) {
        this.cat_id = cat_id;
    }


    public boolean isWill_sell() {
        return will_sell;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    protected int user_id ;
    private String product_id ;
    private String pr_name;
    private List<String> img = Arrays.asList("/upload/prod_default.png");
    private String pr_desc ="";
    private String price ="";
    private String deposit ="";
    private String pr_cost ="";
    private String pr_date ="";
    private int view_count = 0;
    private String pr_state ="0";
    private boolean will_sell = false;
    private boolean will_exchan = false;
    private String cat_id = "";
    private Category category = new Category();


}
