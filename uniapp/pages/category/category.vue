<template>
	<view class="sidebar-container">
		<view class="sidebar-menu">
			<view v-for="(item,index) in sidebarItems" :key="index"
			 :class="{active:activeDynasty === item.dynasty}">
				<view @click="handleSidebar(item.dynasty)">
					<text style="margin: 5px;font-size: 20px;display: flex;justify-content: center;align-items: center;">
						{{item.title}}
					</text>
				</view>
			</view>
		</view>
		<view class="main-content" 
		v-if="!loading"
		style="background-color: white;">
			<uni-row class="demo-uni-row" :gutter="gutter">
				<uni-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
				v-for="item in productList" :key="item.id">
					<view style="margin: 5px;">
						<view style="width: 160rpx;height: 160rpx;border-radius: 5px;">
							<image :src="item.main_image" style="width: 100%;height: 100%;" mode="aspectFill"></image>
						</view>
						<text class="product-include">{{ item.name }}</text>
						<text class="product-include">￥{{ item.price }}</text>
					</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import request from '@/common/request.js'
	export default {
		data() {
			return {
				sidebarItems:[
					{dynasty:'wei',title:'魏晋'},
					{dynasty:'tang',title:'唐制'},
					{dynasty:'song',title:'宋制'},
					{dynasty:'ming',title:'明制'},
				],
				activeDynasty:'',
				productList:[],
				loading:false
			}
		},
		onLoad() {
			this.fetchProducts()
		},
		methods: {
			// 获取商品数据
			async fetchProducts(){
				// 开启加载
				this.loading=true;
				try{
					// 发起请求
					const res=await request({
						url:'/products',
						data:{dynasty:this.activeDynasty}
					});
					this.productList=res;
				}catch(error){
					console.log("请求错误：",error);
					uni.showToast({
						title:"获取数据失败",
						icon:"none"
					});
				}finally{
					this.loading=false;
				};
			},
			handleSidebar(dynasty){
				// 处理侧边栏菜单点击事件
				// 更换当前朝代
				this.activeDynasty=dynasty;
				
				// 重新获取数据
				this.fetchProducts();
				
				// 显示提示
				const tag=this.sidebarItems.find(item=>item.dynasty===dynasty);
				if(tag){
					uni.showToast({
						title:tag.title,
						icon:'none',
						duration:1000
					})
				}
			}
		}
	}
</script>

<style>
.sidebar-container{
	display: flex;
}
.sidebar-menu{
	width: 200rpx;
	flex-shrink: 0;
	background-color: white;
	margin-right: 2px;
}
.main-content{
	flex:1;
	padding: 20rpx;
	magin:20px
}
.product-include{
	display: -webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	overflow: hidden;
}
</style>
