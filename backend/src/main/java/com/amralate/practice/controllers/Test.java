package com.amralate.practice.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("this is working!");
    }
}
