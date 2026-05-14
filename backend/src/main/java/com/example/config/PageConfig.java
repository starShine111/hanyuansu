package com.example.config;

import com.example.dto.PageParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PageConfig {
    @Value("${page.default-page-num:1}")
    private Integer defaultPageNum;

    @Value("${page.default-page-size:10}")
    private Integer defaultPageSize;

    @Value("${page.max-page-size:100}")
    private Integer maxPageSize;

    public Integer getDefaultPageNum() {
        return defaultPageNum;
    }

    public Integer getDefaultPageSize() {
        return defaultPageSize;
    }

    public Integer getMaxPageSize() {
        return maxPageSize;
    }

//    参数规范化方法
    public PageParam normalize(Integer pageNum,Integer pageSize){
        if(pageNum==null||pageNum<=0){
            pageNum=defaultPageNum;
        }
        if (pageSize==null||pageSize<=0){
            pageSize=defaultPageSize;
        }
        if(pageSize>maxPageSize){
            pageSize=maxPageSize;
        }
        return new PageParam(pageNum,pageSize);
    }
}
