package com.example;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateAdmin {
    public static void main(String[] args){
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
        String encoded= encoder.encode("123456");
        System.out.println("INSERT INTO admin (username, password, nickname, role, status) VALUES ");
        System.out.println("('admin', '" + encoded + "', '超级管理员', 'super_admin', 'active');");
    }
}
