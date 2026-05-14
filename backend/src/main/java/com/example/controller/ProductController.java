package com.example.controller;

import com.example.common.Result;
import com.example.service.ProductService;
import com.example.dto.PageParam;
import com.example.entity.ProductVO;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/admin/product")
public class ProductController extends BaseController{
    @Resource
    private ProductService productService;


    // 商品列表
    @GetMapping("/pending")
    public Result pendingList(@RequestParam(required = false) Integer pageNum,
                              @RequestParam(required = false) Integer pageSize) {
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<ProductVO> list = productService.pendingList(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
    @GetMapping("/audited")
    public Result activeList(@RequestParam(required = false) Integer pageNum,
                             @RequestParam(required = false) Integer pageSize) {
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<ProductVO> list = productService.audited(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
    @GetMapping("/rejected")
    public Result rejectedList(@RequestParam(required = false) Integer pageNum,
                               @RequestParam(required = false) Integer pageSize) {
        PageParam pageParam=getPageParam(pageNum,pageSize);
        PageInfo<ProductVO> list = productService.rejectedList(pageParam.getPageNum(),pageParam.getPageSize());
        return Result.success(list);
    }
    // 商品审核
    @PostMapping("/approve")
    public Result approve(@RequestBody Map<String,Long> params) {
        productService.approve(params.get("id"));
        return Result.success();
    }
    @PostMapping("/reject")
    public Result reject(@RequestBody Map<String,Object> params) {
        Long id=Long.valueOf(params.get("id").toString());
        String reason=(String) params.get("reason");
        productService.reject(id,reason);
        return Result.success();
    }

}
