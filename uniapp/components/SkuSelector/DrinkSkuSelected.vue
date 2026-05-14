<template>
	<!-- 遮罩层 -->
	<view class="sku-mask" v-if="visible" @click="close">
		<!-- 规格弹窗 -->
		<view class="sku-container" @click.stop>
			<!-- 头部 -->
			<view class="sku-header">
				<text class="sku-title">规格选择</text>
				<view @click="close" class="sku-close">×</view>
			</view>
			<!-- 滚动区域 -->
			<scroll-view scroll-y class="sku-content">
				<!-- 商品信息 -->
				<view class="product-info">
					<image :src="product.image" mode="aspectFill"></image>
					<view class="product-price" >
						￥{{finalPrice}}
					</view>
				</view>
				<!-- 规格列表 -->
				<view class="spec-section" v-for="(spec,specIndex) in specList" :key="specIndex">
					<view class="spec-options">
						<view v-for="(option,optionIndex) in spec.options" :key="optionIndex"
						 :class="['spec-option',selectedSpecs[spec.name]===option ? 'active' : '',
						 isSpecDisabled(spec.name,option) ? 'disabled' :'']"
						 @click="selectSpec(spec.name,option)">
							
						</view>
					</view>
				</view>
				<!-- 数量区域 -->
				<view class="quantity-section">
					<view class="quantity-control">
						<view class="quantity-btn" @click="decreaseQuantity">-</view>
						<input v-model="quantity" type="number" class="quantity-input" />
						<view class="quantity-btn" @click="increaseQuantity">+</view>
					</view>
				</view>
				
			</scroll-view>
			<!-- 底部按钮 -->
			<view class="sku-footer">
				<view class="confirm-btn" @click="confirm">
					￥{{totalPrice}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"DrinkSkuSelected",
		// 在父组件使用import引入
		props:{//父->子
			visible:{
				type:Boolean,
				default:false
			},
			product:{
				type:Object,
				default:()=>({})
			},
			specList:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				selectedSpecs:{},
				quantity:1
			}
		},
		computed:{
			// 最终单价
			finalPrice(){
				const currentSku=this.getCurrentSku();
				return currentSku && currentSku.price ? currentSku.price : this.product.price;
			},
			totalPrice(){
				return (this.finalPrice*this.quantity).toFixed(2)
			}
		},
		watch:{
			
		},
		methods:{
			// 获取选中的SKU，找到匹配规格
			getCurrentSku(){
				if(!this.product.skuList || this.product.skuList.length === 0)return null;
				return this.product.skuList.find(sku=>{
					if(!sku || !sku.specs) return false;
					for(let specName in this.selectedSpecs){
						if(sku.specs[specName]!== this.selectedSpecs[specName]){
							return false;
						};
					};
						return true;
				})
			},
			decreaseQuantity(){
				if(this.quantity>1){this.quantity--;}
			},
			increaseQuantity(){
				const currentSku= this.getCurrentSku();
				const maxStock=currentSku ?currentSku.stock :this.product.stock;
					if(this.quantity < maxStock){
						this.quantity++;
					}else{
						this.quantity=maxStock;
						uni.showToast({
							title:'库存有限',
							icon:'none'
						})
					}
			},
			isSpecDisabled(specName,option){
				if(!this.product.skuList || !this.product.skuList.length===0) return false;
				const testSpecs={...this.selectedSpecs};
				testSpecs[specName]=option;
				const hasMatch=this.product.skuList && this.product.skuList.some(sku=>{
					if(!sku || !sku.specs) return false;
					for(let key in testSpecs){
						if(sku.specs[key]!==testSpecs[key]){
							return false
						}
					}
					return true
				})
				return !hasMatch
			},
			close(){
				// 写错，与confirm混了：this.$emit('confirm',result)
				this.$emit('close')
			},
			confirm() {
				const result={
					// 选中的规格
					specs:this.selectedSpecs,
					quantity:this.quantity,
					totalPrice:this.totalPrice,
					sku:this.getCurrentSku()
				}
				this.$emit('confirm',result);
				this.close();
			}
		}
		
	}
</script>

<style>
	.sku-mask{
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		background-color:  rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: flex-end;
	}
	.sku-container{
		width: 100%;            /* 宽度占满 */
		max-height: 80vh;       /* 最大高度为视口高度的80% */
		background-color: #fff; /* 白色背景 */
		border-radius: 32rpx 32rpx 0 0;  /* 上边圆角 */
		display: flex;          /* 弹性布局 */
		flex-direction: column; /* 垂直排列（头→内容→底） */
	}
	.sku-header{
		display: flex;          /* 弹性布局 */
		justify-content: space-between;  /* 两端对齐 */
		align-items: center;    /* 垂直居中 */
		padding: 30rpx;         /* 内边距 */
		border-bottom: 1px solid #f0f0f0;  /* 底部分割线 */
	}
	.sku-title {
		 font-size: 32rpx;       /* 字体大小 */
		    font-weight: bold;      /* 粗体 */
		    color: #333;
		}
		
		.sku-close {
		    font-size: 48rpx;       /* 关闭按钮字体大一些 */
		    color: #999;
		    padding: 0 10rpx;
		}
		/* 滚动内容区 */
		.sku-content {
		    flex: 1;                /* 占据剩余空间 */
		    padding: 30rpx;
		    max-height: 60vh;       /* 最大高度限制，超出可滚动 */
		}
		/* 添加禁用样式 */
		.spec-option.disabled {
		    background-color: #f5f5f5;
		    color: #ccc;
		    border-color: #eee;
		    text-decoration: line-through;
		}
	.quantity-section{
		display: flex;
		align-items: center;
		gap:20rpx;
	}
	.quantity-btn{
		width: 60rpx;
		height: 60rpx;
		background-color: #f5f5f5;
		text-align: center;
		line-height: 60rpx;
		font-size: 40rpx;
		border-radius: 8rpx;
	}
	.quantity-input{
		width: 100rpx;
		height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
		border: 1px solid #ddd;
	}
	/* 底部区域 */
	.sku-footer {
	    display: flex;
	    padding: 24rpx 30rpx;
	    gap: 20rpx;
	    border-top: 1px solid #f0f0f0;
	    background-color: #fff;
	}
</style>