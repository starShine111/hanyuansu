package com.example.controller;

import com.example.config.PageConfig;
import com.example.dto.PageParam;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {
    @Autowired
    private PageConfig pageConfig;

    protected PageParam getPageParam(Integer pageNum,Integer pageSize){
        return pageConfig.normalize(pageNum,pageSize);
    }
}
