package com.example.entity;

/**
 * Created by nurbek on 8/18/16.
 */
public class Company implements DomainObject  {

    public String getComp_name() {
        return comp_name;
    }

    public void setComp_name(String comp_name) {
        this.comp_name = comp_name;
    }

    public String getMain_office() {
        return main_office;
    }

    public void setMain_office(String main_office) {
        this.main_office = main_office;
    }

    public String getAdresses() {
        return adresses;
    }

    public void setAdresses(String adresses) {
        this.adresses = adresses;
    }

    public String getWork_time() {
        return work_time;
    }

    public void setWork_time(String work_time) {
        this.work_time = work_time;
    }

    public String getWeb_site() {
        return web_site;
    }

    public void setWeb_site(String web_site) {
        this.web_site = web_site;
    }

    public String getServ_categ() {
        return serv_categ;
    }

    public void setServ_categ(String serv_categ) {
        this.serv_categ = serv_categ;
    }

    public boolean isVer_status() {
        return ver_status;
    }

    public void setVer_status(boolean ver_status) {
        this.ver_status = ver_status;
    }


    public int getComp_id() {
        return comp_id;
    }

    public void setComp_id(int comp_id) {
        this.comp_id = comp_id;
    }


    protected String comp_name = "";
    protected String main_office = "";
    protected String adresses ="";
    protected String work_time = "";
    protected String web_site = "";
    protected String serv_categ = "";
    protected boolean ver_status;

    protected int comp_id;

    public Company() {
    }


}
