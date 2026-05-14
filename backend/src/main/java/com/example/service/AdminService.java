package com.example.service;

import com.example.mapper.AdminMapper;
import com.example.entity.Admin;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Resource
    private AdminMapper adminmapper;
    @Resource
    private PasswordEncoder passwordEncoder;
    public Admin login(String username, String password){
        Admin admin= adminmapper.selectByUsername(username);
//     验证密码（加密后对比）
        if (admin != null) {
            System.out.println("passwordEncoder 类型: " + passwordEncoder.getClass());
            boolean matches = passwordEncoder.matches(password, admin.getPassword());
            System.out.println("匹配结果: " + matches);
            if (matches) {
                return admin;
            }
        }
//        if(admin != null && passwordEncoder.matches(password,admin.getPassword())){
//            return admin;
//        }
        return null;
    }

    public void updateLastLoginTime(Integer id) {
        adminmapper.updateLastLoginTime(id);
    }


    public Admin getById(Long userId) {
        return adminmapper.getById(userId);
    }

    public PageInfo<Admin> getAllAdmin(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Admin> adminList=adminmapper.selectAll();
        PageInfo<Admin> pageInfo=new PageInfo<>(adminList);
        return pageInfo;
    }
}
