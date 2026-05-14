package com.example.mapper;

import com.example.entity.Shops;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper

public interface ShopsMapper {
    List<Shops> selectByStatus(String status);
    void updateStatus(Long id, String status);
    void updateRejectReason(Long id, String reason);


    List<Shops> rejectedList(String rejected);
}
