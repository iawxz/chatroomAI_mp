<template>
	<view class="content">
		<!-- 聊天窗 -->
		<view class="chatWindow">
		</view>
		<!-- 输入盒子实体占位 -->
		<view class="inputBlock"></view>
		<!-- 输入盒子 -->
		<view class="chatInput" :class="[toolBoxShow!=-1?toolBoxShow==true?'toolShow':'toolHide':'']">
			<view class="inputBox">
				<image src="../../static/tools.png" mode="aspectFit" @click="getTools"></image>
				<view class="textarea">
					<input type="text" value="" placeholder="请简短清晰的描述您的问题" />
				</view>
			</view>
			<view class="toolBox">
				<view class="tool" v-for="(item,index) in tools" :key="index" @click="goTool(item)">
					<image :src="item.img" mode="aspectFit"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tools: [{
					title: '法规搜索',
					url: '../tool_1/legislation',
					img: require('../../static/chatroom/tool_1.png'),
				}, {
					title: '案例搜索',
					url: '../tool_2/case',
					img: require('../../static/chatroom/tool_2.png'),
				}, {
					title: '解纷方式',
					url: '../tool_3/dispute',
					img: require('../../static/chatroom/tool_3.png'),
				}, {
					title: '辅助工具',
					url: '../tool_4/aidedtools',
					img: require('../../static/chatroom/tool_4.png'),
				}, ],
				toolBoxShow: -1, //工具栏是否展示，0否1是-1第一次进入页面
			}
		},
		onLoad() {

		},
		methods: {
			// 获取工具栏
			getTools() {
				if(this.toolBoxShow==-1){
					this.toolBoxShow = true
				}else{
						this.toolBoxShow = !this.toolBoxShow
				}				
			},
			// 跳转到工具
			goTool(item) {
				uni.navigateTo({					
					url:item.url
				});
			}

		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		min-height: 100vh;
		background-color: #f2f2f2;

		.chatWindow {
			width: 100%;
			min-height: 92vh;
			height: 100%;
			background-color: #f2f2f2;
		}

		.inputBlock {
			width: 100%;
			height: 8vh;
		}

		.chatInput {
			width: 100%;
			min-height: 8vh;			
			position: fixed;
			left: 0;
			bottom: 0;
			transform: translateY(200rpx);

			.inputBox {
				width: 100%;
				height: 8vh;
				background-color: #FFFFFF;

				display: flex;
				align-items: center;
				justify-content: space-around;

				image {
					width: 66rpx;
					height: 66rpx;
				}

				.textarea {
					width: 80%;
					height: 66rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
					background: #F2F2F2;
					border-radius: 33rpx;
					display: flex;
					align-items: center;

					input {
						width: 100%;
					}
				}
			}

			.toolBox {
				width: 100%;
				height: 198rpx;
				background-color: #FFFFFF;
				border-top: 2px solid rgba($color: #000000, $alpha: 0.3);

				display: flex;
				align-items: center;
				justify-content: center;

				.tool {
					width: 120rpx;
					height: 130rpx;
					background: #FFFFFF;
					box-shadow: 0rpx -1rpx 21rpx 0rpx rgba(0, 0, 0, 0.11);
					border-radius: 10rpx;
					margin: 0 20rpx;

					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					image {
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 10rpx;
					}

					text {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba($color: #000000, $alpha: 0.8);
					}
				}
			}			
		}
		
		.toolShow {
			animation: toolShow linear 0.5s;
			transform: translateY(0);
		}
		
		.toolHide {
			animation: toolHide linear 0.5s;
			transform: translateY(200rpx);
		}
		
		@keyframes toolShow {
			from {
				transform: translateY(200rpx);
			}
		
			to {
				transform: translateY(0);
			}
		}
		@keyframes toolHide {
			from {
				transform: translateY(0);
			}
		
			to {
				transform: translateY(200rpx);
			}
		}
	}
</style>
