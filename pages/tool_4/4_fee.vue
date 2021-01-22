<template>
	<view class="aidedtools">
		<div class="content">
			<!-- 选择类型 -->
			<view class="type">
				<view class="typeBox">
					<picker @change="typeChange" :value="typeIndex" :range="typeList">
						<view class="type_choose">{{typeList[typeIndex]}}</view>
					</picker>
					<image class="type_more" src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_more.png" mode=""></image>
				</view>
			</view>
			<!-- 涉及财产 -->
			<view class="asset">
				<view class="inputBox">
					<text class="title">受诉法院省份</text>
					<view class="input select">
						<picker @change="provinceChange" :value="provinceIndex" :range="provinceList">
							<view class="province_choose">{{provinceList[provinceIndex]}}</view>
						</picker>
						<image class="type_more" src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tool_4/common/icon_more.png" mode=""></image>
					</view>
				</view>
				<view class="inputBox">
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
				<!-- 律师费用 -->
				<view class="lawyer fee" v-if="typeIndex!=2">
					<text>律师费用</text>
					<view class="amount">
						<text class="unit">{{amount_lawyer}}元</text>
					</view>
				</view>
				<view class="fee" v-else v-for="(item,index) in amount_criminal" :key="index">
					<text>{{item.name}}</text>
					<view class="amount">
						<text class="unit">{{item.amount}}元</text>
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
				typeList: ['选择案件类型', '民事案件', '刑事案件', '行政案件'],
				typeIndex: 0,
				provinceList: ['选择省份'],
				provinceIndex: 0,
				amount: '', //涉事金额
				amount_lawyer: '', //律师费用
				amount_criminal: [{
					name: '侦察阶段',
					amount: '',
				}, {
					name: '审查起诉阶段',
					amount: '',
				}, {
					name: '一审阶段',
					amount: '',
				}, ],
			};
		},
		onLoad() {
			this.getProvinceList()
		},
		methods: {
			// 获取省份列表
			getProvinceList: function() {
				let city = require('@/pages/tool_4/city.json');
				// 因一国两制政策，计费方式不统一，暂不包含港澳台
				for (var i of city) {
					if (i.label == '香港' || i.label == '台湾省' || i.label == '澳门') {
						return
					} else {
						this.provinceList.push(i.label)
					}
				}
			},
			// 选择案件类型
			typeChange: function(e) {
				this.typeIndex = e.target.value
				// 清零计算结果
				this.amount_lawyer = ""
				for (var empty of this.amount_criminal) {
					empty.amount = ""
				}
			},
			// 选择省份
			provinceChange: function(e) {
				this.provinceIndex = e.target.value
				// 清零计算结果
				this.amount_lawyer = ""
				for (var empty of this.amount_criminal) {
					empty.amount = ""
				}
			},
			// 计算费用
			goCalc() {
				var data = {}
				data.money = this.amount
				if (this.provinceIndex > 0) {
					data.province = this.provinceList[this.provinceIndex]
					var index;
					if (data.province.indexOf('省') > -1) {
						index = data.province.indexOf('省');
						data.province = data.province.substring(0, index)
					} else if (data.province.indexOf('市') > -1) {
						index = data.province.indexOf('市')
						data.province = data.province.substring(0, index)
					}
				}
				if (this.typeIndex == 0 || data.money == "" || !data.province) {
					uni.showToast({
						title: '有信息未填写',
						icon: 'none'
					})
				} else {
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url: 'http://ai.365lawhelp.com/API/Cost/getLawyerCost',
						data,
						method: 'post',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						dataType: 'json',
					}).then(result => {
						let [err, res] = result;
						if (this.typeIndex == 2) {
							this.amount_criminal[0].amount = res.data.cril.zhencha
							this.amount_criminal[1].amount = res.data.cril.shencha
							this.amount_criminal[2].amount = res.data.cril.yishen
						} else {
							this.amount_lawyer = res.data.minshi
						}
						setTimeout(function() {
							uni.hideLoading();
						}, 500);
					})
				}

			},
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
			height: 200rpx;
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
					width: 310rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.8;
				}

				.input {
					width: 100%;
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

				.select {
					position: relative;
					text-align: right;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba($color: #000000, $alpha: 0.5);

					picker {
						width: 100%;
						position: absolute;
						right: 73rpx;
					}

					image {
						width: 18rpx;
						height: 12rpx;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 37rpx;
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
				position: relative;

				text {
					position: absolute;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.8;
					margin-left: 32rpx;
				}

				.amount {
					width: 90%;
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
						width: 100%;
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
