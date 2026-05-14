package com.example.controller;

import com.example.service.AdminService;
import com.example.common.Result;
import com.example.dto.LoginDto;
import com.example.entity.Admin;
import com.example.utils.JwtUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {
    @Resource
    private AdminService adminService;

//    登录接口
    @PostMapping("/login")
    public Result login(@RequestBody LoginDto loginDto, HttpServletResponse response){
//        验证账号密码
        Admin admin=adminService.login(loginDto.getUsername(),loginDto.getPassword());
        if(admin!=null){
            // 2. 登录成功，生成 JWT Token
            String token= JwtUtil.generateToken(admin.getId(),admin.getRole());
            // 3. 更新最后登录时间
            adminService.updateLastLoginTime(admin.getId());
            // ========== 4. 设置 HttpOnly Cookie（核心） ==========
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);//禁止JS读取（防止XSS攻击）
            cookie.setSecure(true);//只在https传输
            cookie.setPath("/");//全站有效
            cookie.setMaxAge(7 * 24 * 60 * 60);//有效期
            response.addCookie(cookie);
            // 5. 返回用户信息（不返回 token）
            Map<String,Object> data=new HashMap<>();
            data.put("token",token);
            data.put("userInfo",Map.of(
                    "id",admin.getId(),
                    "username",admin.getUsername(),
                    "nickname",admin.getNickname(),
                    "role",admin.getRole(),
                    "avatar",admin.getAvatar()!=null ? admin.getAvatar() : "/images/default.png"
            ));
            return Result.success(data);
        }
        return Result.error("用户名或密码错误");
    }
//    验证登录状态接口（自动登录）
    @GetMapping("/profile")
    public Result getProfile(HttpServletRequest request){
//        从cookie中获取token
        String token=null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for (Cookie cookie:cookies){
                if ("token".equals(cookie.getName())){
                    token=cookie.getValue();
                    break;
                }
            }
        }
//        没有token，未登录
        if(token == null){
            return Result.error("未登录");
        }

//        解析token，获取用户ID
        Long userId = JwtUtil.parseToken(token);
        if(userId == null){
            return Result.error("Token无效或者过期");
        }

//        查询用户信息
        Admin admin = adminService.getById(userId);
        if(admin == null){
            return Result.error("用户不存在");
        }
//        返回用户信息
        return Result.success(Map.of(
                "id",admin.getId(),
                "username",admin.getUsername(),
                "nickname",admin.getNickname(),
                "role",admin.getRole(),
                "avatar", admin.getAvatar() != null ? admin.getAvatar() : "/images/default.png"
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

}
