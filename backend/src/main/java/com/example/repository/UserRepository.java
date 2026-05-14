package com.example.repository;

import com.example.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findById(Long userId);
    Optional<User> findByPhone(String phone);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByRole(User.Role role);
//    根据角色分页查询
    Page<User> findByRole(User.Role role, Pageable pageable);
//    统计某个角色的数量
    long countByRole(User.Role role);
    Boolean existsByPhone(String phone);

//    ========== 多条件查询 ==========
    Page<User> findByPhoneAndStatus(String phone,Integer status,Pageable pageable);
    Page<User> findByRoleAndStatus(User.Role role,Integer status,Pageable pageable);
//    模糊查询：手机号包含某个关键字
    List<User> findByPhoneContaining(String phone);

//    ========== 复杂查询（需要手写JPQL）==========
//      查询商家并关联店铺信息（避免N+1问题）
    @Query("select u from User u left join fetch u.seller where u.role=:role")
    List<User> findSellersWithProfile(@Param("role") User.Role role,Pageable pageable);
//    查询买家并关联个人信息
    @Query("select u from User u left join fetch u.buyer where u.role=:role")
    List<User> findBuyersWithProfile(@Param("role") User.Role role,Pageable pageable);
//    根据手机号查询用户及所有关联信息
    @Query("select u from User u " +
            "left join fetch u.seller " +
            "left join fetch u.buyer " +
            "WHERE u.phone = :phone")
    Optional<User> findByPhoneWithProfile(@Param("phone") String phone);
//    动态查询（使用JPQL）
    @Query("select u from User u where " +
            "(:phone is null or u.phone=:phone)and " +
            "(:role is null or u.role=:role)")
    List<User> findUsersByCondition(@Param("phone")String phone,
                                    @Param("role") User.Role role);


}
