<template>
	<view class="container">
		<!-- 商品详细图区域 -->
		<view v-if="!loading">
			<swiper circular autoplay indicator-dots :interval="3000" :duration="1000" 
			indicator-color="#8f8f94" indicator-active-color="#6a6a6a"
			class="swiper"
			>
				<swiper-item v-for="(img,index) in detail.images" :key="index">
					<image class="swiper-image" :src="img" mode="aspectFill" ></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息区 -->
		<view class="product product-container">
			<view  v-if="detail.skus && detail.skus.length > 0" class="price-section">
				<text class="product-price"> ￥ {{ detail.skus[0].price }} </text>
				<!-- <view style="text-decoration: line-through;color: red;">￥{{detail.skus[0].original_price}}</view> -->
				<text class="product-sales">已售{{detail.skus[0].sales}}</text>
			</view>
			<!-- 加载中占位 -->
			<view v-else>
			    <text>加载中...</text>
			</view>
			<text >{{detail.name}}</text>
			<!-- <text>{{detail.subtitle}}</text> -->
		</view>
		<!-- 产地信息，服务包含（7天无理由/退货包） -->
<!-- 		<view class="product">
			
		</view> -->
		
		<!-- 底部操作 -->
		<!-- 底部占位符 -->
		<view class="bottom-placeholder" style="height: 61px;"></view>
		<!-- 设置不滚动 -->
		<view class="bottom-bar">
			<!-- 跳转购物车页面 -->
			<view class="cart-icon" @click="goToCart">
				<uni-icons type="cart" size="30"></uni-icons>
				<view v-if="cartCount>0" class="cart-badge">{{cartCount}}</view>
			</view>
			<!-- 按钮 -->
			<view class="action-btns">
				<view class="add-cart-btn" @click="openSkuSelector('addToCart')">加入购物车</view>
				<view class="buy-now-btn" @click="openSkuSelector('buy')">立即购买</view>
			</view>
			<!-- 规格选择弹窗 -->
			<SkuSelector 
				:visible="showSelector"
				:product="productData"
				:specList="specList"
				@close="showSelector=false;" 
				@confirm="handleOrderConfirm"/>
		</view>
	</view>

</template>

<script>
	import request from '@/common/request.js';
	import SkuSelector from '@/components/SkuSelector/SkuSelector.vue';
	export default{
		data(){
			return{
				detail:{
					images: [],
					skus: [],
					price:0,
					original_price:0
				},
				loading:false,
				showSelector:false,
				currentAction:'',
				productData:{
					image:'',
					price:0,
					stock:0,
					skuList:[]
				},
				specList:{},
				cartCount: 0
			}
		},
		components:{
			SkuSelector
		},
		methods:{
			getTotalStock(skus){
				if(!skus|| skus.length===0) return 0;
				let total=0;
				skus.forEach(sku=>{
					total+=sku.stock || 0;
				});
				return total;
			},
			// 转换成SKU列表格式
			// 用于匹配价格和库存
			convertSkuList(skus){
				if(!skus || skus.length===0) return false;
				return skus.map(sku=>{
					return {
						specs:{
							"颜色":sku.color,
							"尺码":sku.size,
						},
						price:parseFloat(sku.price),
						stock:parseInt(sku.stock),
						id:sku.id
					};
				});
			},
			// 提取规格列表（规格按钮）
			extractSpecList(skus){
				if(!skus || skus.length===0) return false;
				
				const colors=new Set();//set自动去重
				const sizes=new Set();
				
				skus.forEach(sku=>{
					if(sku.color) colors.add(sku.color);
					if(sku.size) sizes.add(sku.size);
				});
				
				// 转换成组件需要的格式
				const specList=[];
				if(colors.size>0){
					specList.push({
						name:"颜色",
						options:Array.from(colors)
					});
				};
				if(sizes.size>0){
					specList.push({
						name:"尺码",
						options:Array.from(sizes)
					});
				};
				return specList;
			},
			
			// 获取商品详情
			async fetchDetail(id){
				this.loading=true;
				try{
					const res=await request({
						url:`/products/${id}`
					});
					this.detail=res;
					// 🔍 添加日志：查看原始数据
					console.log('原始 skus:', res.skus);
					// 转换数据
					const convertedList=this.convertSkuList(res.skus);
					this.productData={
						image:res.images && res.images[0] ? res.images[0] : '',
						price:res.skus && res.skus[0] ? res.skus[0].price : 0,
						stock:res.skus ? this.getTotalStock(res.skus) : 0 ,
						skuList:this.convertSkuList(res.skus)//转换SKU列表
					};
					// 规格列表（从SKU数据中提取
					this.specList=this.extractSpecList(res.skus);
					console.log('商品详情：',res);
				}catch(error){
					// 错误处理
					console.error('请求错误:', error);
					uni.showToast({
						title:"获取数据失败",
						icon:"none"
					});
				}finally{
					this.loading=false
				}
			},
			openSkuSelector(action){
				this.currentAction=action;
				this.showSelector=true;
				// if(currentAction===addToCart){
				// 	this.addToCart();
				// }else if(currentAction===buy){
				// 	this.buyNow();
				// }
			},
			addToCart(){
				uni.showToast({
					title: '加入购物车',
					icon: 'success'
				});
			},
			buyNow(){
				uni.showToast({
				    title: `购买 ${orderInfo.quantity} 件`,
				    icon: 'success'
				});
			},
			// 跳转购物车
			goToCart(){
				
				uni.navigateTo({
					 url: '/pages/cart/cart'
				})
			},

		},
		onLoad(options) {
			const productId=options.id;
			this.fetchDetail(productId);
		}
	}
</script>

<style>
	.container{
		background-color: gainsboro;
	}
		.swiper {
			width: 100%;
			height: 720rpx;
			margin: 0;
			padding: 0;
		}
		.swiper-item {
			/* display: block; */
			width: 100%;
			height: 100%;
			/* object-fit: cover;  */
		}
		.swiper-image {
			width: 100%;
			height: 100%;
		}
		.product{
			background-color: white;
			border-radius: 10rpx;
			margin: 5rpx;
		}
		.product-container{
			margin: 15rpx;
			font-size: 50rpx;
		}
		.price-section{
			display: flex;
			align-items: center;
		}
		.product-price{
			color: red;
			font-size: 55rpx;
		}
		.product-sales{
			color: gray;
			font-size: 30rpx;
			right: 0;
		}
		.bottom-bar{
			/* 固定在底部 */
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: stretch;
			height: 100rpx;
			margin: 0;
			padding: 0;
		}
		.cart-icon{
			position: relative;
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.action-btns{
			flex:1;/*占满剩余空间*/
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: stretch;
			margin-left: 10px;
			border-radius: 15rpx;  /* 添加圆角 */
		}
		.add-cart-btn,
		.buy-now-btn{
			flex: 1;/* 按钮平分宽度 */
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: normal;
			color: white;
			
			/* 防止文字拆行或者溢出 */
			white-space: nowrap;
			padding: 0 10rpx;
		}
		
		.add-cart-btn{
			background-color: orange;
		}
		.buy-now-btn{
			background-color: #ff7300;
		}
</style>