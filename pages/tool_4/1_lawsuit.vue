<template>
	<view class="aidedtools">		
		<div class="content">
			<!-- 选择类型 -->
			<view class="type">
				<view class="typeBox">
					<picker @change="bindPickerChange" :value="index" :range="array_text">
						<view class="type_choose">{{array_text[index]}}</view>
					</picker>
					<image class="type_more" src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_more.png" mode=""></image>
				</view>
			</view>
			<!-- 涉及财产 -->
			<view class="asset">
				<view class="inputBox">
					<text class="title">涉及财产</text>
					<view class="input radio">
						<view class="radioBox" @click="link(1)">
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_select.png" mode="" v-if="isLink!=1"></image>
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>是</text>
						</view>
						<view class="radioBox" @click="link(0)">
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_select.png" mode="" v-if="isLink!=0"></image>
							<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>否</text>
						</view>
					</view>
				</view>
				<view class="inputBox" v-if="isLink>0">
					<text class="title">涉及金额</text>
					<view class="input">
						<input type="number" v-model="amount" placeholder="请输入金额" />
						<text>元</text>
					</view>
				</view>
			</view>
			<!-- 计算按钮 -->
			<view class="calc" @click="goCalc">去计算</view>
			<!-- 计算结果 -->
			<view class="result">
				<view class="title">
					<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_calc.png" mode=""></image>
					<text>计算结果</text>
				</view>
				<!-- 受理费 -->
				<view class="acceptance fee">
					<text>受理费</text>
					<view class="amount">
						<text class="unit">{{result.acceptfee||""}}元</text>
					</view>
				</view>
				<!-- 执行费 -->
				<view class="imposition fee">
					<text>执行费</text>
					<view class="amount">
						<text class="unit">{{result.exefee||""}}元</text>
					</view>
				</view>
				<!-- 保全费 -->
				<view class="preservation fee">
					<text>保全费</text>
					<view class="amount">
						<text class="unit">{{result.prefee||""}}元</text>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array_text: ['选择案件类型'],
				array_id: [],
				index: 0,
				isLink: -1, //是否涉及财产
				amount: '', //涉事金额
				result: {}, //计算结果
			};
		},
		onLoad() {
			this.getArray()
		},
		methods: {
			// 获取案件类型
			getArray() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://ai.365lawhelp.com/API/Cost/getsusongType',
					data: {},
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					for (var i of res.data) {
						this.array_id.push(i.id)
						this.array_text.push(i.name)
					}
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})

			},
			// 案件绑定
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			// 是否涉及财产
			link(status) {
				this.isLink = status
			},
			// 去计算
			goCalc() {
				uni.showLoading({
					title: '加载中'
				});
				var data = {}
				if (this.index == 0) {
					uni.showToast({
						title: '未选择类型',
						icon: 'none'
					})
					return
				} else if (this.amount == "" && this.isLink == 1) {
					uni.showToast({
						title: '请填写涉及金额',
						icon: 'none'
					})
					return
				} else {
					data.type = this.array_text[this.index]
					if (this.isLink == -1) {
						this.isLink = 0
					}
					data.isPoperty = this.isLink
					data.money = this.amount
				}

				uni.request({
					url: 'http://ai.365lawhelp.com/API/Cost/getsusongCost',
					data,
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					this.result = res.data
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			}
		},
	}
</script>

<style lang="scss">
	.aidedtools {
		background-color: #F2F2F2;
		height: 100vh;
		padding-top: 40rpx;
		.type {
			width: 100%;			

			.typeBox {
				position: relative;
				width: 648rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding-left: 38rpx;
				margin: 0 auto;
				display: flex;
				align-items: center;

				picker {
					width: 100%;

					.type_choose {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #010101;
						opacity: 0.8;
					}
				}

				.type_more {
					width: 18rpx;
					height: 12rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 38rpx;
				}
			}
		}

		.asset {
			width: 654rpx;
			// height: 200rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 24rpx auto 0;
			padding-left: 32rpx;

			.inputBox {
				width: 100%;
				height: 99rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.8;
				}

				.radio {
					width: 479rpx;
					height: 100%;
					padding-right: 36rpx;
					display: flex;
					align-items: center;

					.radioBox {
						margin-left: 70rpx;
						display: flex;
						align-items: center;

						image {
							width: 30rpx;
							height: 30rpx;
							margin-right: 8rpx;
						}
					}
				}

				.input {
					width: 479rpx;
					height: 100%;
					padding-right: 36rpx;
					border-bottom: 2px solid rgba($color: #000000, $alpha: 0.08);
					display: flex;
					align-items: center;
					justify-content: flex-end;

					input {
						margin-right: 7rpx;
						text-align: right;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						opacity: 0.7;
					}

					input:placeholder {
						text-align: right;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						opacity: 0.5;
					}

					text {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						opacity: 0.7;
					}
				}
			}

			.inputBox:last-child {
				.input {
					border: none;
				}
			}
		}

		.calc {
			width: 320rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			margin: 40rpx auto;
			background: #2083E7;
			border-radius: 10rpx;

			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;

		}

		.result {
			width: 686rpx;
			margin: 0 auto;
			background: #FFFFFF;
			border-radius: 10rpx;
			overflow: hidden;

			.title {
				width: calc(100%-31rpx);
				height: 100rpx;
				padding-left: 31rpx;
				background: #E6F2FF;
				display: flex;
				align-items: center;

				image {
					width: 39rpx;
					height: 42rpx;
					margin-right: 13rpx;
				}

				text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #2083E7;
				}
			}

			.fee {
				width: 100%;
				height: 99rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.8;
					margin-left: 32rpx;
				}

				.amount {
					width: 515rpx;
					height: 100%;
					border-bottom: 2px solid rgba($color: #000000, $alpha: 0.08);
					display: flex;
					align-items: center;
					justify-content: flex-end;

					text-align: right;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.7;

					.unit {
						margin-right: 36rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #2083E7;
						opacity: 0.9;

					}
				}
			}

			.fee:last-child {
				.amount {
					border: none;
				}
			}
		}
	}
</style>
