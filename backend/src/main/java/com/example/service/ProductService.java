package com.example.service;

import com.example.entity.Product;
import com.example.mapper.ProductMapper;
import com.example.entity.ProductVO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Resource
    private ProductMapper productMapper;

    public PageInfo<ProductVO> pendingList(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<ProductVO> list=productMapper.selectByStatus(0);
        return new PageInfo<>(list);
    }

    public PageInfo<ProductVO> audited(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<ProductVO> list=productMapper.selectByStatus(1);
        return new PageInfo<>(list);
    }
    public PageInfo<ProductVO> rejectedList(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<ProductVO> list=productMapper.selectByStatus(2);
        return new PageInfo<>(list);
    }
    public PageInfo<ProductVO> rejected(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<ProductVO> list=productMapper.selectByStatus(2);
        return new PageInfo<>(list);
    }
    public PageInfo<Product> approve(Long id) {
        productMapper.updateStatus(id,"approved",1);
        return new PageInfo<>();
    }

    public PageInfo<Product> reject(Long id, String reason) {
        productMapper.updateStatus(id,"rejected",2);
        productMapper.updateRejectReason(id,reason);
        return new PageInfo<>();
    }
}
