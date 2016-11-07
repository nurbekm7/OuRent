package com.example.entity;

/**
 * Created by nurbek on 8/13/16.
 */
public class Users implements DomainObject  {

    protected int user_id;
    protected String ava = "";
    protected String email = "";
    protected String pass="";
    protected String phone_num = "";
    protected String city = "";
    protected String notif_by_stat = "";
    protected String notif_by_com="";
    protected String reg_date ;
    protected String user_type = "";

    public Users(String email, String pass, String user_type) {

        this.email = email;
        this.pass = pass;
        this.user_type = user_type;
    }

    public Users() {
    }


    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getAva() {
        return ava;
    }

    public void setAva(String ava) {
        this.ava = ava;
    }

    public String getPhone_num() {
        return phone_num;
    }

    public void setPhone_num(String phone_num) {
        this.phone_num = phone_num;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNotif_by_stat() {
        return notif_by_stat;
    }

    public void setNotif_by_stat(String notif_by_stat) {
        this.notif_by_stat = notif_by_stat;
    }

    public String getNotif_by_com() {
        return notif_by_com;
    }

    public void setNotif_by_com(String notif_by_com) {
        this.notif_by_com = notif_by_com;
    }

    public String getReg_date() {
        return reg_date;
    }

    public void setReg_date(String reg_date) {
        this.reg_date = reg_date;
    }




    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
