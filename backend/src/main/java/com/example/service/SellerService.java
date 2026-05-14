package com.example.service;


import com.example.entity.User;
import com.example.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SellerService {
    @Resource
    private UserRepository userRepository;
    @Resource
    private PasswordEncoder passwordEncoder;

//    登录验证
    public User login(String phone,String password){
        Optional<User> userOpt=userRepository.findByPhone(phone);
        return userOpt
                .filter(user -> passwordEncoder.matches(password,user.getPassword()))
                .filter(user -> user.getStatus()==1)
                .map(user -> {
                    user.setLastLoginAt(LocalDateTime.now());
                    return userRepository.save(user);
                })
                .orElse(null);

    }
//
////    查询所有商家(带商铺信息）
//    public Page<User> getSellersByPage(Pageable pageable){
//        return userRepository.findByRole(User.Role.seller,pageable);
//    }
//
////    分页查询买家
//    public Page<User> getBuyersByPage(Pageable pageable) {
//        return userRepository.findByRole(User.Role.buyer,pageable);
//    }
//    分页查询所有用户
    public Page<User> getAllUsersByPage(Pageable pageable){
        return userRepository.findAll(pageable);
    }

    public User getById(Long userId) {
        return userRepository.findById(userId);
    }


//    根据状态分页查询买家
//    public Page<User> getBuyersByStatus(Integer status, Pageable pageable) {
//        return userRepository.findByRoleAndStatus(User.Role.buyer, status, pageable);
//    }
//


}
