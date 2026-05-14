<template>
	<view style="background-color: #fff9c7;height:160px ;">
		<!-- 设置图标 -->
		<view style="float: right;margin: 5px;"><uni-icons type="gear" size="30" color="black"></uni-icons></view>
		<!-- 头像设置 -->
		<view style="display: flex;flex-direction:row;align-items: center;height: 100%;">
			<image src="https://img.alicdn.com/imgextra/i1/2580824255/O1CN01hRkNyi1hIqHoFacKW_!!2580824255-0-alimamacc.jpg" 
			style="width: 100px;height: 100px; border-radius: 50%;"></image>
			<view style="margin: 15px;">
				<text>账号名</text>
			</view>
			
		</view>
	</view>
	
	<view class="card-box">
		<view style="">
			<view >
				<text style="font-size: 20px;">我的订单</text>
				<view style="color: #bebebe;float: right;">
					<text>全部订单</text>
					<uni-icons type="right" size="20" color="#bebebe;"></uni-icons>
				</view>
			</view>
			
			<view style="width: 100%;margin-top: 10px;">
				<uni-row class="demo-uni-row" style="margin: 20px;">
					<uni-col :span="6"  v-for="(item,index) in orderList" :key="index"
					 >
						<view style="display: flex;flex-direction: column;align-items: center;">
							<image :src="item.url" style="width: 35%;" mode="widthFix"></image>
							<text>{{item.title}}</text>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		
	</view>
	<view class="card-box">
			<uni-row class="demo-uni-row" style="margin: 20px;">
				<uni-col :span="8"  v-for="(item,index) in meTool" :key="index">
					 <view style="display: flex; flex-direction: column;align-items: center;">
							<image :src="item.url" style="width: 25%;" mode="widthFix"></image>
							<text>{{item.title}}</text>
					</view>						
				</uni-col>
			</uni-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[
					{url:"/static/connection/wallet.png" ,title:'待付款'  },
					{url:"/static/connection/ship.png" ,title:'待发货'  },
					{url:"/static/connection/receive.png" ,title:'待收货'  },
					{url:"/static/connection/comment.png" ,title:'待评论'  }
				],
				meTool:[
					{url:"/static/connection/money.png" ,title:'我的余额' },
					{url:"/static/connection/points.png" ,title:'我的积分' },
					{url:"/static/connection/coupon.png" ,title:'我的礼卷' },
					{url:"/static/connection/favorite.png" ,title:'我的收藏' },
					{url:"/static/connection/address1.png" ,title:'我的地址' },
					{url:"/static/connection/customerService.png" ,title:'联系客服' }
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.card-box{
	padding: 5px 10px;
	border-radius: 5px;
	background-color: white;
	margin: 10px;
	padding: 10px;
}
</style>
