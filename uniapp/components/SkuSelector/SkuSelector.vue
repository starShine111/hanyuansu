<template>
	<view class="sku-mask" v-if="visible" @click="close">
		<view class="sku-container" @click.stop>
			<view class="sku-header">
				<text class="sku-title">规格选择</text>
				<view class="sku-close" @click="close">×</view>
			</view>
			<!-- 滚动区域：商品规格信息区域 -->
			<scroll-view class="sku-content" scroll-y>
				<view class="product-info">
					<image :src="product.image" mode="aspectFill" class="product-image"></image>
					<view class="product-price-info">
						<text class="product-price">￥{{finalPrice}}</text>
					</view>
				</view>
				
				<view class="spec-section" v-for="(spec,specIndex) in specList" :key="specIndex">
					 <!-- 🔥 缺少这一行：显示规格名称 -->
					    <view class="spec-name">{{ spec.name }}</view>
					<view class="spec-options">
						<view v-for="(option,optionIndex) in spec.options" :key="optionIndex"
						:class="['spec-option',selectedSpecs[spec.name]===option ? 'active':'',
						isSpecDisabled(spec.name,option)? 'disabled' :'']"
						@click="selectSpec(spec.name,option)">
							{{option}}
						</view>
					</view>
				</view>
				
				<view class="quantity-section">
					<text class="quantity-label">数量</text>
					<view class="quantity-control">
						<view class="quantity-btn" @click="decreaseQuantity">-</view>
						<input type="number" v-model="quantity" @blur="validateQuantity" class="quantity-input" />
						<view class="quantity-btn" @click="increaseQuantity">+</view>
					</view>
				</view>
			</scroll-view>
			
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
		name:'SkuSelector',
		props:{
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
			};
		},
		computed:{
			finalPrice(){
				const currentSku=this.getCurrentSku();
				return currentSku && currentSku.price ? currentSku.price : this.product.price;
			},
			totalPrice(){
				return (this.finalPrice*this.quantity).toFixed(2);
			},
			currntSelectedSpecs(){
				return this.selectedSpecs
			}
		},
		watch:{
			specList:{
				immediate:true,
				deep:true,
				handler(newSpecList){
					const defaultSpecs={};
					newSpecList.forEach(spec=>{
						if(spec.options && spec.options.length>0){
							defaultSpecs[spec.name]=spec.options[0];
						}
					});
					this.selectedSpecs=defaultSpecs
				}
			}
		},
		methods:{
			// 获取商品规格
			getCurrentSku(){
				if(!this.product.skuList || this.product.skuList.length===0) return null;
				return this.product.skuList.find(sku=>{
					if(!sku || !sku.specs) return false;
					for(let specName in this.selectedSpecs){
						if(sku.specs[specName]!==this.selectedSpecs[specName]){
							return false;
						}
					}
					return true;
				})
			},
			isSpecDisabled(specName,option){
				if(!this.product.skuList || this.product.skuList.length===0) return false;
				const testSpecs={...this.selectedSpecs};
				testSpecs[specName]=option;
				const hasMatch=this.product.skuList && this.product.skuList.some(sku=>{
					if(!sku || !sku.specs) return false;
					for(let key in testSpecs){
						if(sku.specs[key] !==testSpecs[key]){
							return false;
						}
					}
					return true;
				})
				return !hasMatch
			},
			selectSpec(specName,option){
				if(this.isSpecDisabled(specName,option)) return;
				this.$set(this.selectedSpecs,specName,option);
			},
			decreaseQuantity(){
				if(this.quantity>1){
					this.quantity--;
				}
			},
			increaseQuantity(){
				const currentSku=this.getCurrentSku();
				const maxStock=currentSku ? currentSku.stock :this.product.stock;
				if(this.quantity<maxStock){
					this.quantity++
				}else{
					uni.showToast({
						title:'库存不足',
						icon:'none'
					});
					this.quantity=maxStock
				}
			},
			validateQuantity(e){
				let value=parseInt(e.detail.value)
				
				const currentSku=this.getCurrentSku();
				const maxStock=currentSku ?currentSku.stock :this.product.stock;
				if(isNaN(value)){
					this.quantity=1;
					return
				}
				if(value<1){
					this.quantity=1
					return
				}
				if(value>maxStock){
					uni.showToast({
						title:'库存不足',
						icon:'none'
					});
					this.quantity=maxStock
				}else{
					this.quantity=value
				}
			},
			close(){
				this.$emit('close');
			},
			confirm(){
				const result={
					specs:this.selectedSpecs,
					quantity:this.quantity,
					totalPrice:this.totalPrice,
					sku:this.getCurrentSku()
				};
				this.$emit('confirm',result);
				this.close();
			}
		}
	}
	
</script>

<style>
	.sku-mask{
		position: fixed;
		top: 0;
		bottom: 0;
		right:0;
		left:0;
		display: flex;
		align-items: flex-end;
		z-index:1000;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.sku-container{
		width:100%;
		height: 80vh;
		flex-direction: column;
		background-color: white;
		border-radius: 32rpx 32rpx 0 0;
	}
	.sku-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:30rpx;
	}
	.sku-title{
		font-size: 32rpx;
		 font-weight: bold;
		 color: #333;
	}
	.sku-close{
		font-size: 48rpx;
		color: #999;
		padding: 0 10rpx;
	}
	.sku-content{
		flex:1;
		padding: 30rpx;
		height: 60vh;
	}
	.product-info{
		display: flex;
		gap:20rpx;
		margin-bottom: 40rpx;
	}
	.product-image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
	}
	.product-price-info{
		flex: 1;
		justify-content: center;
	}
	.product-price {
		font-size: 40rpx;       /* 价格大一些 */
		color: #ff4d4f;         /* 红色 */
		font-weight: bold;
		display: block;         /* 块级元素，独占一行 */
		margin-bottom: 10rpx;
	}		
	.spec-section{
		margin-bottom: 40rpx;
	}
	.spec-options{
		display: flex;
		flex-wrap: wrap;
		gap:20rpx
	}
	.spec-option{
		padding: 12rpx 32rpx;
		border:1px solid  #ddd;
		border-radius: 50rpx;
		background-color: #fff;
	}
	/* 选中的规格选项样式 */
	.spec-option.active {
		background-color: #ff6b35;
		color: #fff;
		border-color: #ff6b35;
	}	
	/* 添加禁用样式 */
	.spec-option.disabled {
		background-color: #f5f5f5;
		color: #ccc;
		border-color: #eee;
		text-decoration: line-through;
	}
	.spec-name {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	.quantity-section{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}
	.quantity-control{
		display: flex;
		align-items: center;
		gap:20rpx
	}
	.quantity-btn{
		width: 60rpx;
		height: 60rpx;
		background-color: #f5f5f5;
		text-align: center;
		line-height: 60rpx;
		border-radius: 8rpx;
	}
	.quantity-input{
		width: 100rpx;
		height: 60rpx;
		text-align: center;
		border: 1px solid #ddd;
		border-radius: 8rpx;
	}
	.sku-footer{
		display: flex;
		padding: 24rpx 30rpx;
		gap:20rpx;
		border-top: 1px solid #f0f0f0;
		background-color: #fff;
	}
	.confirm-btn{
		padding: 20rpx 60rpx;
		background: linear-gradient(135deg, #ff6b35, #ff4d4f);
		color: #fff;
		border-radius: 50rpx;
		text-align: center;
		font-size: 30rpx;
	}
</style>