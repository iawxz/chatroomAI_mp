<template>
	<view class="aidedtools">		
		<image class="banner" src="../../static/tool_4/banner.png" mode="aspectFit"></image>
		<div class="tools">
			<div class="toolBox" v-for="(item,index) in tools" :key="index" @click="goView(item)">
				<image :src="item.imgurl" mode=""></image>
				<text v-text="item.text"></text>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tools: [{
					imgurl: require('../../static/tool_4/lawsuit.png'),
					text: '诉讼服务',
					url: '/pages/tool_4/1_lawsuit'
				}, {
					imgurl: require('../../static/tool_4/work_injuries.png'),
					text: '工伤赔偿',
					url: '/pages/tool_4/2_injuries'
				}, {
					imgurl: require('../../static/tool_4/trans.png'),
					text: '交通赔偿',
					url: '/pages/tool_4/3_trans'
				}, {
					imgurl: require('../../static/tool_4/fee.png'),
					text: '律师费用',
					url: '/pages/tool_4/4_fee'
				}, ]
			};
		},
		methods: {			
			// 跳转到工具
			goView(item) {
				uni.navigateTo({					
					url:item.url
				});
			}		
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 262rpx;
		display: block;
		
	}

	.tools {
		display: flex;
		align-items: center;
		justify-content: center;

		.toolBox {
			margin: 40rpx 30rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			image {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 14rpx;
			}

			text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3D3D3D;
			}
		}
	}
</style>
