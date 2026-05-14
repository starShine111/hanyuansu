package com.example.controller;

import com.example.common.Result;
import com.example.dto.LoginDto;
import com.example.entity.User;
import com.example.service.SellerService;
import com.example.utils.JwtUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
public class SellerController{
    @Resource
    private SellerService sellerService;

//    登录接口
    @PostMapping("/login")
    public Result login(@RequestBody LoginDto loginDto, HttpServletResponse response){
        User user = sellerService.login(loginDto.getPhone(), loginDto.getPassword());
        if(user !=null){
            String token= JwtUtil.generateToken(user.getId(),user.getRole().toString());

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(7*24*60*60);
            response.addCookie(cookie);
            Map<String, Object> data = new HashMap<>();
            data.put("token",token);
            data.put("userInfo",Map.of(
                    "id",user.getId(),
                    "username",user.getUsername(),
                    "role",user.getRole(),
                    "avatar",user.getAvatar()!=null ? user.getAvatar() : "/images/default.png"
            ));
            return Result.success(data);
        }
        return Result.error("手机号或密码错误");
    }

//    验证登录状态接口（自动登录）
    @GetMapping("/profile")
    public Result getProfile(HttpServletRequest request){
        String token=null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null){
            for (Cookie cookie:cookies){
                if ("token".equals(cookie.getName())){
                    token=cookie.getValue();
                    break;
                }
            }
        }
//        没有token,未登录
        if(token == null){
            return Result.error("未登录");
        }
//        解析token,获取用户ID
        Long userId = JwtUtil.parseToken(token);
        if (userId == null){
            return Result.error("Token无效或者过期");
        }
//        查询用户信息
        User seller=sellerService.getById(userId);
        if (seller ==null){
            return Result.error("用户不存在");
        }
//        返回用户信息
        return Result.success(Map.of(
                "id",seller.getId(),
                "username",seller.getUsername(),
                "role",seller.getRole(),
                "avatar", seller.getAvatar() != null ? seller.getAvatar() : "/images/default.png"
                ));
    }
    //    退出登录
    @PostMapping("/logout")
    public Result logout(HttpServletResponse response){
//        清除Cookie（设置MaxAge=0)
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return Result.success("已退出登录");
    }


////    分页查询商家
//    @GetMapping("sellers/page")
//    public ResponseEntity<Page<User>> getSellersByPage(@RequestParam(defaultValue = "0") int page,
//                                       @RequestParam(defaultValue = "5") int size){
//        Pageable pageable  = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
//        Page<User> sellers= userService.getSellersByPage(pageable);
//        return ResponseEntity.ok(sellers);
//    }
//
////    分页查询买家
//    @GetMapping("buyers/page")
//    public ResponseEntity<Page<User>> getBuyersByPage(@RequestParam(defaultValue = "0") int page,
//                                                        @RequestParam(defaultValue = "5") int size) {
//        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
//        Page<User> buyers= userService.getBuyersByPage(pageable);
//        return ResponseEntity.ok(buyers);
//    }
//    查询用户详情



}
