package com.example.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {
//    密钥
    private static final String SECRET = "SunShine111Key2026ChenXuTing988464qingheyuluo";
//    过期时间
    private static final long EXPIRE=7*24*60*60*1000;
//    生成token
    public static String generateToken(Integer userId,String role){
        return Jwts.builder()
                .setSubject(String.valueOf(userId))//主题
                .claim("role",role)//添加自定义字段（角色）
                .setIssuedAt(new Date())//设置签发时间（现在）
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRE))//过期时间
                .signWith(SignatureAlgorithm.HS256,SECRET)//签发算法+密钥
                .compact();//生成最终字符串
    }
//    解析token，获取用户ID
    public static Long parseToken(String token){
        try{
            Claims claims=Jwts.parser()//创建解析器
                    .setSigningKey(SECRET)//设置验证密钥
                    .parseClaimsJws(token)//解析token
                    .getBody();//获取数据体
            return Long.parseLong(claims.getSubject());//取出用户ID
        }catch (Exception e){
            return null;//token无效或过期
        }
    }
//    验证token
    public static boolean validateToken(String token){
        return parseToken(token) !=null; // 能解析出ID说明有效
    }
}
