<template>
  <div class="container">
    <div class="branch-image ">
      <img src="/images/img.png" class="branch">
    </div>
    <PeachBlossom />
    <div class="login-content">
      <h3>登录</h3>
      <div class="input-group">
        <label>用户名</label>
        <div class="input-wrapper">
          <input
              v-model="loginForm.phone"
              type="text"
              :class="{ 'input-error': errors.phone }"
              @blur="validatePhone"
              @focus="clearPhoneError"/>
          <span v-if="errors.phone" class="error-inline">{{errors.phone}}</span>
        </div>
      </div>
      <div class="input-group">
        <label>密码</label>
        <div class="password-wrapper">
          <input
              v-model="loginForm.password"
              :type="showPassword ? 'text' :'password'"
              :class="{'input-error':errors.password}"
              @blur="validatePassword"
              @focus="clearPasswordError"/>
          <span class="password-toggle" @click="showPassword =!showPassword">
            {{showPassword ? '👁️' : '🙈' }}
          </span>
          <span v-if="errors.password" class="error-inline">{{errors.password}}</span>
        </div>
      </div>
      <div class="form-options">
        <label class="checkbox">
          <input type="checkbox" v-model="rememberMe "/>
          <span>记住账号</span>
        </label>
      </div>
      <button class="login-btn" @click="handleLogin" :disabled="loading">
        {{loading ?'登陆中...':'登录' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import PeachBlossom from "@/components/PeachBlossom.vue";
import {useRoute, useRouter} from "vue-router";
import {loginApi} from "../../api/auth.js";

const showPassword=ref(false);
const loading=ref(false)
const rememberMe =ref(false)
const route = useRoute()

const loginForm=reactive({
  phone:'',
  password:''
});
const errors=reactive({
  phone:'',
  password:''
});

//验证表单
const validatePhone=()=>{
  if(!loginForm.phone){
    errors.phone='手机号不能为空'
    return false
  }
  if(loginForm.phone.length != 11){
    errors.phone='手机号必须是11位'
    return false
  }
  errors.phone=''
  return true
}
const validatePassword=()=>{
  if(!loginForm.password){
    errors.password='密码不能为空'
    return false
  }
  if(loginForm.password.length<6){
    errors.password='密码至少6个字符'
    return false
  }
  errors.password=''
  return true
}
const validateForm=()=>{
  const isPhoneValid=validatePhone();
  const isPasswordValid=validatePassword();
  return isPhoneValid && isPasswordValid
}
const clearPhoneError=()=>{
  errors.phone=''
}
const clearPasswordError=()=>{
  errors.password=''
}
const savedCredentials=()=>{
  if (rememberMe.value){
    localStorage.setItem('saved_phone',loginForm.phone)
  }else {
    localStorage.removeItem('saved_phone')
  }
}
const loadCredentials=()=>{
  const savedPhone=localStorage.getItem('saved_phone');
  if(savedPhone){
    loginForm.phone=savedPhone
    rememberMe.value=true;
  }
}
const router=useRouter()
//登录处理
const handleLogin=async ()=>{
  if (!validateForm()) return

  loading.value=true;
  try{
    const res=await loginApi({
      phone:loginForm.phone,
      password:loginForm.password,
      rememberMe:rememberMe.value
    })
    savedCredentials()
    await router.replace(route.query.redirect || '/home/dashboard')
    loginForm.password=''
  }finally {
    loading.value=false
  }
}
loadCredentials()
</script>

<style scoped>
*,
*::before,
*::after{
  box-sizing: border-box;
}
.container{
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #C1D5A4;
}
.branch-image{
  position: absolute;
  top: -50px;
  left: 0;
  width: 450px;
  transform: scaleX(-1);
}
.branch{
  width: 430px;
}
.login-content{
  width: 400px;
  height: 300px;
  background-color: #F8C4D4;
  color: white;
  text-align: center;
  z-index: 1000;
  opacity: 0.9;
  padding:5px;
}
.login-content h3{
  margin-bottom: 25px;
}
.input-group{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.input-group label{
  width: 60px;
  flex-shrink: 0;
  font-size: 14px;
  margin-bottom: 8px;
}
.input-wrapper input,
.password-wrapper input{
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
}
.error-inline{
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  white-space: nowrap;
  pointer-events: none;
}
.input-wrapper input.input-error{
  padding-right: 120px;
}
.input-wrapper,
.password-wrapper{
  flex: 1;
  position: relative;

}
/*.password-wrapper input{*/
/*  width: 100%;*/
/*  padding-right: 45px;*/
/*}*/
.password-wrapper input.input-error{
  border-color: #e74c5c;
  background: #fff5f5;

}
.password-toggle{
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
}
.form-options{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:20px 0 20px
}
.checkbox{
  display: flex;
  align-items: center;
  gap:8px;
  cursor: pointer;
}
.login-btn{
  width: 50%;
  padding:14px;
  background-color: #C1D5A4;
  border: 1px solid white;
  border-radius: 12px;
  cursor: pointer;
}
</style>