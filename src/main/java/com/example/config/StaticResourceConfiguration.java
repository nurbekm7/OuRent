package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by nurbek on 11/28/16.
 */
@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);
//        registry.addResourceHandler("/upload/**").addResourceLocations("file:C:\\Users\\admin\\Desktop\\OuRent\\web\\upload");
//        registry.addResourceHandler("/upload/**").addResourceLocations("file:/home/nurbek/Documents/Ourent/web/upload");
        registry.addResourceHandler("/upload/**").addResourceLocations("file:/home/trans-coder/apps/ourent/prod/upload/");
    }
}