package com.example.mapper;

import com.example.entity.Admin;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

    Admin selectByUsername(String username);

    void updateLastLoginTime(Integer id);

    Admin getById(Long userId);

    List<Admin> selectAll();
}
