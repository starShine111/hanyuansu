package com.example.service;

import com.example.entity.Shops;
import com.example.mapper.ShopsMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopsService {
    @Resource
    private ShopsMapper shopsMapper;
    public PageInfo<Shops> pendingList(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Shops> list = shopsMapper.selectByStatus("pending");
        return new PageInfo<>(list);
    }
    public PageInfo<Shops> audited(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Shops> list = shopsMapper.selectByStatus("active");
        return new PageInfo<>(list);
    }

    public PageInfo<Shops> approve(Long id) {
        shopsMapper.updateStatus(id,"active");
        return new PageInfo<>();
    }
    public PageInfo<Shops> reject(Long id,String reason) {
        shopsMapper.updateStatus(id,"rejected");
        shopsMapper.updateRejectReason(id,reason);
        return new PageInfo<>();
    }

    public PageInfo<Shops> rejectedList(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Shops> list = shopsMapper.rejectedList("rejected");
        return new PageInfo<>(list);
    }
}
