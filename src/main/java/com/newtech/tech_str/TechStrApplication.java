package com.newtech.tech_str;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TechStrApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechStrApplication.class, args);
	}

}
