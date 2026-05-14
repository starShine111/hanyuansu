package com.example.controller;

import com.example.service.AdminService;
import com.example.common.Result;
import com.example.dto.PageParam;
import com.example.entity.Admin;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController extends BaseController{
    @Resource
    private AdminService adminService;
    @GetMapping("/getAllAdmin")
    public Result getAllAdmin(@RequestParam(required = false) Integer pageNum,
                              @RequestParam(required = false) Integer pageSize){
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<Admin> list=adminService.getAllAdmin(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
}
