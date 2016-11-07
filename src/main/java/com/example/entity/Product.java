package com.example.entity;

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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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

    public boolean isWill_sell() {
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

    protected String pr_date ="";
    protected String product_id ;
    protected String pr_name;
    protected String img ="";
    protected String pr_desc ="";
    protected String price ="";
    protected String deposit ="";
    protected String pr_cost ="";
    protected boolean will_sell;
    protected boolean will_exchan;


    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }


    protected int user_id ;

    public String getCat_id() {
        return cat_id;
    }

    public void setCat_id(String cat_id) {
        this.cat_id = cat_id;
    }

    protected String cat_id ="";


}
