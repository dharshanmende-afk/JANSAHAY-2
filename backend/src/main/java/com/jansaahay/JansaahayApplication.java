package com.jansaahay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JansaahayApplication {

    public static void main(String[] args) {
        SpringApplication.run(JansaahayApplication.class, args);
    }
}
