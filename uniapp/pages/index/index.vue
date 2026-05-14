<template>
	<view>
		<view>
			<swiper circular autoplay indicator-dots :interval="3000" :duration="1000" style="height:350rpx"
			 indicator-color="#8f8f94" indicator-active-color="#6a6a6a">
				<swiper-item v-for="(item,index) in imgs" :key="index">
					<image :src="item.url" mode="widthFix" style="width:100%" ></image>
				</swiper-item>
			</swiper>
		</view>
		<view style="margin:10px;">
			
			<view style="padding: 5px 10px;background-color: white;display: flex;align-items: center;border-radius: 10px;">
				<uni-icons type="sound" size="30"></uni-icons>
				<text>公告</text>
			</view>
			
			<view style="padding: 5px;margin: 10px;background-color: white;border-radius: 10px;">
				<uni-row class="demo-uni-row">
					<uni-col :span="6" v-for="(item,index) in tagImgs" :key="index"
					:class="{active:activeDynasty === item.dynasty}">
						<view @click="switchDynasty(item.dynasty)">
							<image :src="item.url" mode="widthFix" style="width: 50%;"></image>
						</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="product-list" v-if="!loading" 
			 style="margin: 10px;padding: 5px; border-radius: 10px;background-color:white;"> 
				<uni-row class="demo-uni-row">
					<uni-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
					v-for="item in productList" :key="item.id" 
					>
						<view style="margin: 5px;" @click="goToDetail(item.id)">
							<view style="width: 160px;height: 160px;margin-right: 20rpx;">
								<image :src="item.main_image" style="width: 100%;height: 100%;border-radius: 16rpx;" mode="aspectFill"></image>
							</view>
							<text class="product-include">{{ item.name }}</text>
							<text class="product-include">￥{{ item.price }}</text>
						</view>
					</uni-col>
				</uni-row>
				<view v-if="loading" style="text-align: center; padding: 50px;">加载中...</view>
			 
			</view>
	</view>
	<view class="">
		
	</view>
	</view>
</template>

<script>
	import request from '@/common/request.js'
	export default {
		data() {
			return {
				imgs:[
					{ url:'https://img.alicdn.com/imgextra/i1/2580824255/O1CN01hRkNyi1hIqHoFacKW_!!2580824255-0-alimamacc.jpg' },
					{ url:'https://img.alicdn.com/imgextra/i1/2200531469719/O1CN01n7RZXY2LfMObpMREl_!!2200531469719-0-alimamacc.jpg' },
					{ url:'https://img.alicdn.com/img/i3/486840129/O1CN01AaBXFE1Cp8C2osqe1_!!4611686018427385665-0-saturn_solar.jpg'},
					{ url:'https://img.alicdn.com/imgextra/i2/4293584275/O1CN01SOHk6t1hS0CQl7M6F_!!4293584275-0-alimamacc.jpg'}
				],
				tagImgs:[
					{ dynasty:'wei',name:'魏晋',url:'/static/images/wei.png'},
					{ dynasty:'tang',name:'唐',url:'/static/images/tang.png' },
					{ dynasty:'song',name:'宋',url:'/static/images/song.png'},
					{ dynasty:'ming',name:'明',url:'/static/images/ming.png'}
				],
				activeDynasty:'',
				productList:[],
				loading:false
				}
			},
		computed:{
			
		},
		onLoad() {
			this.fetchProducts();
		},
		methods: {
			// 获取商品数据
			async fetchProducts(){
				// 开启加载状态
				this.loading=true;
				console.log("开始请求，朝代：",this.activeDynasty)
				
				try{
					// 2.发起请求，获取当前朝代的商品
					const res=await request({
						url:'/products',
						data:{ dynasty:this.activeDynasty },
						});
					console.log('res是：',res);
					// 3.将数据保存到productList
					this.productList=res;
				}catch(error){
					// 错误处理
					console.error('请求错误:', error);
					uni.showToast({
						title:"获取数据失败",
						icon:"none"
					});
				}finally{
					// 关闭加载状态
					this.loading=false;
				}
			},
			// 切换朝代
			switchDynasty(dynasty){
				console.log("当前选择：",dynasty);
				// 更换当前朝代
				this.activeDynasty=dynasty;
				
				// 重新获取数据
				this.fetchProducts();
				
				// 显示提示
				const tag=this.tagImgs.find(item=>item.dynasty===dynasty);
				if(tag){
					uni.showToast({
						title:tag.name,
						icon:'none',
						duration:1000
					})
				}
			},
			// 跳转商品详情
				goToDetail(productId){
					console.log("点击跳转详情页")
					uni.navigateTo({
						url:`/pages/detail/detail?id=${productId}`
					})
				}
		}
	}
</script>

<style lang="scss">
		.demo-uni-row {
			margin-bottom: 10px;
			// 组件在小程序端display为inline
			// QQ、抖音小程序文档写有 :host，但实测不生效
			// 百度小程序没有 :host
			/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
			display: block;
			/* #endif */
		}
	
		// 支付宝小程序没有 demo-uni-row 层级
		// 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级
		/* #ifdef MP-ALIPAY || MP-WEIXIN */
		::v-deep .uni-row {
			margin-bottom: 10px;
		}
	
		/* #endif */
	
		.demo-uni-col {
			background-color: white;
			margin: 10px;
			padding:5px;
			border-radius: 4px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-items: center;
			flex-direction: column;
			height: 100%;
		}
		.product-include{
			line-height: 1.4;
			margin-bottom: 16rpx;
			min-height: 78rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;		}
</style>
