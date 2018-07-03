package com.example;

import com.example.config.JpaConfig;
import com.example.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class Application  implements CommandLineRunner {
	@Autowired
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class,args); }

	@Override
	public void run(String... arg) throws Exception {
//		storageService.deleteAll();
//		storageService.init();
	}
}
