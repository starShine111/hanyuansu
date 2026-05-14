package com.example.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductVO {
    private Integer id;                    // ← 对应 id
    private String name;                  // ← 对应 name
    private String mainImage;
    private Integer shopId;               // ← 对应 shop_id
    private String shopName;              // ← 对应 shop_name
    private String auditStatus;          // ← 对应 audit_status
    private String auditReason;           // ← 对应 audit_reason
    private LocalDateTime submitTime;     // ← 对应 submit_time
    private LocalDateTime auditTime;      // ← 对应 audit_time
    private BigDecimal minPrice;          // ← 对应 min_price
    private BigDecimal maxPrice;          // ← 对应 max_price
    private Integer stockSum;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMainImage() {
        return mainImage;
    }

    public Integer getShopId() {
        return shopId;
    }

    public String getShopName() {
        return shopName;
    }

    public String getAuditStatus() {
        return auditStatus;
    }

    public String getAuditReason() {
        return auditReason;
    }

    public LocalDateTime getSubmitTime() {
        return submitTime;
    }

    public LocalDateTime getAuditTime() {
        return auditTime;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public Integer getStockSum() {
        return stockSum;
    }
}
