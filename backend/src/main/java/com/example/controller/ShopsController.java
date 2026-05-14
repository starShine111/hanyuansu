package com.example.controller;

import com.example.common.Result;
import com.example.dto.PageParam;
import com.example.entity.Shops;
import com.example.service.ShopsService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/shop")
public class ShopsController extends BaseController{
    @Resource
    private ShopsService shopsService;
//店铺列表
    @GetMapping("/pending")
    public Result pendingList(@RequestParam(required = false) Integer pageNum,
                       @RequestParam(required = false) Integer pageSize){
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<Shops> list=shopsService.pendingList(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }

    @GetMapping("/audited")
    public Result audited(@RequestParam(required = false) Integer pageNum,
                          @RequestParam(required = false) Integer pageSize){
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<Shops> list=shopsService.audited(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
    @GetMapping("/rejectedList")
    public Result rejectedList(@RequestParam(required = false) Integer pageNum,
                               @RequestParam(required = false) Integer pageSize){
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<Shops> list=shopsService.rejectedList(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
    @PostMapping("/approve")
    public Result approve(@RequestBody Map<String,Long> params){
        shopsService.approve(params.get("id"));
        return Result.success();
    }
    @PostMapping("/reject")
    public Result reject(@RequestBody Map<String,Object> params){
        Long id=Long.valueOf(params.get("id").toString());
        String reason=(String)params.get("reason");
        shopsService.reject(id,reason);
        return Result.success();
    }
}
