<template>
	<view class="container">
		<view class="nav-bar">
			<text>消息</text>
			<!-- 清除消息 -->
			<!-- + -->
		</view>
		<!-- 会话列表 -->
		<view class="chat-list">
			<view class="chat-item" v-for="item in chatList" :key="item.id"
			@click="enterChat(item)">
				<view class="avatar">
					<image v-if="item.avatar" :src="item.icon" mode="aspectFill"></image>
					<text v-else class="avatar-icon">{{item.icon}}</text>
					<!-- 在线模式 -->
					<view class="online-dot" v-if="item.online"></view>
				</view>
				<!-- 会话内容 -->
				<view class="chat-content">
					<view class="top-row">
						<text class="">{{item.name}}</text>
						<text>{{item.time}}</text>
					</view>
					<view class="bottom-row">
						<text class="">{{item.lastMsg}}</text>
						<view v-if="item.unread" class="unread-badge">
							<text>{{item.unread>99 ? '99+' :item.unread}}</text>
						</view>
						<view v-if="item.isMention" class="mention-tag">
							<text>[有人@我]</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList: [
				    {
						id: 1,
				        name: '汉服交流群',
				        icon: '👥',
				        avatar: '',
				        lastMsg: '有人@了你',
				        time: '10:30',
				        unread: 3,
				        isMention: true,
				        online: false,
				        isGroup: true
				    },
				    {
				        id: 2,
				        name: '订单通知',
				        icon: '📦',
				        avatar: '',
						lastMsg: '您的订单已发货，请注意查收',
						time: '昨天',
						unread: 0,
						isMention: false,
						online: false,
						isGroup: false
					},
					{
						id: 3,
						name: '汉服种草群',
						icon: '🌸',
						avatar: '',
						lastMsg: '有人分享了新款',
						time: '周一',
						unread: 1,
						isMention: false,
						online: false,
						isGroup: true
					},
					{
						id: 4,
						name: '汉服小仙女',
						icon: '🧚',
						avatar: '',
						lastMsg: '这件太好看了！',
						time: '周二',
						unread: 0,
						isMention: false,
						online: true,
						isGroup: false
					},
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.chat-item{
	background-color: white;
	border-radius: 5px;
	margin: 10px;
}
.chat-content{
	flex: 1;
}
.top-row,.bottom-row{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.mention-tag{
	color:red;
}
</style>
