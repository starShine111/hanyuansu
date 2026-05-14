<template>
  <el-container class="container">
    <el-header class="header">
      <div class="welcome-text">
        <p style="font-size: large;margin: 5px">欢迎回来，{{ userInfo?.nickname || userInfo?.username }}！</p>
        <p style="font-size: small">今天是 {{ currentDate }}，祝你工作愉快</p>
      </div>
      <div class="avatar">
        <el-dropdown
            trigger="hover"
            @command="handleCommand"
            class="user-dropdown">
          <el-avatar :size="45" :src="userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' "
                     @click="handleLogout">
            {{userInfo?.nickname?.charAt(0)}}
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item command="avatar">
                <el-icon><Picture /></el-icon>
                修改头像
              </el-dropdown-item>
              <el-dropdown-item command="password">
                <el-icon><Lock /></el-icon>
                修稿密码
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="150px">
        <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="black"
            active-text-color="#ffd04b">
          <!-- 仪表盘 -->
          <el-menu-item index="/dashboard">
            <span>仪表盘</span>
          </el-menu-item>

          <el-sub-menu index="1">
            <template #title>
              <span>店铺管理</span>
            </template>
            <el-menu-item index="/shopAudit">店铺审核</el-menu-item>
            <el-menu-item index="/stores">店铺列表</el-menu-item>
            <!--            <el-menu-item index="/goods">入驻申请</el-menu-item>-->
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/productAudit">商品审核</el-menu-item>
            <el-menu-item index="/product">商品列表</el-menu-item>
            <el-menu-item index="/recycle">回收站</el-menu-item>
            <!--            <el-menu-item index="/goods">品牌管理</el-menu-item>-->
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/stores">所有订单</el-menu-item>
            <el-menu-item index="/stores">退款售后</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/stores">用户列表</el-menu-item>
            <el-menu-item index="/stores">黑名单</el-menu-item>
            <el-menu-item index="/stores">管理员账号</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/stores">销售统计</el-menu-item>
            <el-menu-item index="/stores">用户分析</el-menu-item>
            <el-menu-item index="/stores">商品分析</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="6">
            <template #title>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/stores">角色权限</el-menu-item>
            <el-menu-item index="/stores">系统配置</el-menu-item>
            <el-menu-item index="/stores">操作日志</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import {Lock, Picture, SwitchButton} from "@element-plus/icons-vue";
import {logoutApi} from "@/api/auth.js";

const userInfo=ref({
  avatar:'',
  nickname:''
});
const currentDate=computed(()=>{
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
})
// 加载用户信息
const loadUserInfo = () => {
  const info = localStorage.getItem('userInfo')
  if (info) {
    userInfo.value = JSON.parse(info)
  }
}
const handleCommand=(command)=>{
  switch (command){
    case 'profile':
      router.push('/profile')
      break
    case 'password':
      //    打开修改密码的弹窗
      break
    case 'logout':
      handleLogout()
      break
  }
}
const handleLogout=async ()=>{
  try {
    await logoutApi();
    ElMessage.success('已退出登录')
    await router.push('/login')
  }catch (error){
    ElMessage.error('退出登录')
  }
}
function handleOpen(key, keyPath) {
  console.log(key, keyPath);
}
function handleClose(key, keyPath) {
  console.log(key, keyPath);
}
onMounted(() => {
  loadUserInfo()
  // TODO: 加载统计数据
})
</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
}
.header{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007aff;
  color: white;
}
.aside{
  height: 100%;
  text-align: left;
}
.el-menu-vertical-demo{
}
</style>