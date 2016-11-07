package com.example.entity;

/**
 * Created by nurbek on 8/13/16.
 */
public class Customer implements DomainObject {


    public Customer() {
    }

    public String getIin() {
        return iin;
    }

    public void setIin(String iin) {
        this.iin = iin;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public String getBdate() {
        return bdate;
    }

    public void setBdate(String bdate) {
        this.bdate = bdate;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isVer_status() {
        return ver_status;
    }

    public void setVer_status(boolean ver_status) {
        this.ver_status = ver_status;
    }

    public int getCust_id() {
        return cust_id;
    }

    public void setCust_id(int cust_id) {
        this.cust_id = cust_id;
    }


    protected String fio = "";
    protected String iin = "";
    protected String bdate="";
    protected String photo = "";
    protected boolean ver_status;
    protected boolean ver_email;
    protected boolean ver_number;

    public boolean isVer_email() {
        return ver_email;
    }

    public void setVer_email(boolean ver_email) {
        this.ver_email = ver_email;
    }

    public boolean isVer_number() {
        return ver_number;
    }

    public void setVer_number(boolean ver_number) {
        this.ver_number = ver_number;
    }

    protected int cust_id;



}
