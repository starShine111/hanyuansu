package com.example.mapper;

import com.example.entity.Product;
import com.example.entity.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper

public interface ProductMapper {
    List<ProductVO> selectByStatus(Integer status);

    void deleteById(Integer id);
    void batchDeleteByIds(@Param("ids") String ids);

    void updateStatus(Long id,String auditStatus, int status);

    void updateRejectReason(Long id, String reason);


}
