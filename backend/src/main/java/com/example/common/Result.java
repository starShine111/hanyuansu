package com.example.common;

public class Result {
    private Integer code;
    private String message;
    private Object data;

    public Result(){};
    public static Result success(){
        Result result = new Result();
        result.setCode(200);
        result.setMessage("请求成功");
        return result;
    }
    public static Result success(Object data){
        Result result = new Result();
        result.setCode(200);
        result.setData(data);
//        result.setMessage("请求成功");
        return result;
    }
    public static Result error(String department_not_found){
        Result result = new Result();
        result.setCode(500);
        result.setMessage("系统异常");
        return result;
    }
    public static Result error(Integer code,String msg){
        Result result = new Result();
        result.setCode(code);
        result.setMessage(msg);
        return result;
    }

    public static Result success(String msg, Object data) {
        Result result = new Result();
        result.setCode(200);
        result.setMessage(msg);
        result.setData(data);
        return result;
    }

    public Integer  getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
