<template>
	<view class="dispute">		
		<!-- 选择类型 -->
		<view class="type">
			<view class="typeName" v-for="(item,index) in typeList" :key="index" :class="{typeChoose:type==index}" @tap="typeChoose(index)" >
				<text>{{item}}</text>				
				<view class="typeLine" v-show="type==index"></view>
			</view>
		</view>
		<view style="height: 80rpx;"></view>
		<view class="content">
			<!-- 流程进度 -->
			<view class="progress">
				<view class="titleBox">
					<text class="title">流程进度</text>
					<text class="subtitle">共{{progressLength}}步</text>
				</view>
				<view class="progressBox">
					<view class="progressX" v-for="(item,index) in progress" :key="index">			
						<view class="title">
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_3/point.png" mode="" v-if="choose!=index" @click="goChoose(index)"></image>
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_3/point_choose.png" mode="" v-else></image>
							<text>{{item.step}}</text>
						</view>
						<view class="text" :class="{ noline: index == progressLength-1 }">							
							<view class="textP" v-if="choose==index">								
								<text>{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 常见问题 -->
			<view class="problem">
				<view class="titleBox">
					<text class="title">常见问题</text>
				</view>
				<view class="problemBox">
					<view class="problems" v-for="(item,index) in problems" :key="index" @click="goDetail(item.id)">
						<text>{{item.title}}</text>
						<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/arrow_right.png" mode=""></image>
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
				type: 0, //类型选择 0协商 1调解 2仲裁 3诉讼，默认为0
				typeList:['协商','调解','仲裁','诉讼'],
				problems: [],
				progress: [],
				progressLength: 0,
				choose:0,//当前选中的流程，默认为0
				question:[],
			};
		},
		onLoad() {
			this.getProgress()
		},
		methods: {
			// 类型选择
			typeChoose(type) {
				this.type = type
				this.choose = 0
				this.getProgress()
			},
			// 获取解纷方式
			getProgress(){
				var data={}
				data.type=this.typeList[this.type]
				uni.showLoading({title: '加载中'});
				uni.request({
					url: 'https://ai.365lawhelp.com/API/Resolve/getResolveList',
					data,
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					this.progress = res.data.datalist
					this.progressLength = this.progress.length					
					this.problems = res.data.questionlist
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			},
			// 选择流程
			goChoose(index){
				this.choose =index
			},
			// 问题详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/tool_3/dispute_detail?id=' + encodeURIComponent(JSON.stringify(id))
				});
			}
		},
	}
</script>

<style lang="scss">
	.dispute {
		background-color: #F2F2F2;
		min-height: 100vh;

		.topback {
			position: fixed;
			z-index: 20;
			top: 0;
			left: 0;
			width: 100%;
			height: 60rpx;
			padding-top: 83rpx;
			background-color: #2083E7;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.backicon {
				height: 64rpx;
				width: 30rpx;
				margin-left: 32rpx;
			}
		}

		.type {
			position: fixed;
			z-index: 20;
			top: 0;
			left: 0;
			width: 100%;
			height: 81rpx;
			background: #2083E7;
			display: flex;
			justify-content: space-around;
			transform: translateY(-1rpx);

			.typeName {
				position: relative;
				width: 160rpx;
				text-align: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 80rpx;
				color: rgba($color: #ffffff, $alpha: 0.7);

				.typeLine {
					width: 100%;
					height: 6rpx;
					background: #FFFFFF;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}

			.typeChoose {
				color: #FFFFFF;
			}
		}

		.content {
			position: relative;
			z-index: 10;
			padding: 40rpx 32rpx 48rpx;

			.titleBox {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-bottom: 32rpx;

				.title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.95;
				}

				.subtitle {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.7;
					margin-left: 23rpx;
					display: block;
				}
			}

			.progress {
				margin-bottom: 40rpx;

				.progressBox {
					padding-left: 31rpx;
					.progressX{
						.title{
							display: flex;
							align-items: center;
							image{
								display: block;
								width: 50rpx;
								height: 50rpx;		
								margin-right: 35rpx;
							}
							text{
								display: block;
								height: 50rpx;
								line-height: 50rpx;
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: rgba($color: #000000, $alpha: 0.6);
							}
						}
						.text{
							min-height: 35rpx;
							display: flex;
							justify-content: flex-end;
							border-left: 5rpx solid rgba($color: #000000, $alpha: 0.3);
							margin-left: 22.5rpx;
							
							.textP{								
								width: 530rpx;
								background: #1980E8;
								border-radius: 10rpx;
								padding: 19rpx 20rpx 15rpx;
								margin-top: 6rpx;
								margin-bottom: 12rpx;
																
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FFFEFE;
							}
						}
						.noline{
							border: none;
						}
					}
				}
			}

			.problem {
				.problemBox {
					width: 688rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					.problems {
						width: 620rpx;
						height: 60rpx;
						border-bottom: 2px dashed rgba($color: #000000, $alpha: 0.15);
						display: flex;
						align-items: center;
						justify-content: space-between;

						text {
							width: 580rpx;
							line-height: 60rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #3E3E3E;
							opacity: 0.8;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						image {
							width: 15rpx;
							height: 27rpx;
						}

					}
					.problems:last-child {
						border: none;
					}
				}
			}
		}
	}
</style>
