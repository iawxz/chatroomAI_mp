<template>
	<view class="legislation">
		<view class="header" style="background-image: url(../../static/tool_1/header.png);">
			<view class="searchBox">
				<image src="../../static/icon_search.png" mode="aspectFit"></image>
				<input type="text" v-model="keywords" @input="inputchange" placeholder="请输入检索字段">
			</view>
		</view>

		<view class="content">
			<text class="total">共收录{{total}}份法规</text>
			<view class="legislationBox" v-for="(item,index) in list" :key="index" @click="goDetail(item.id)">
				<view class="title">{{item.title}}</view>
				<view class="text" v-html="item.text"></view>
				<image src="../../static/tool_1/useful.png" mode="aspectFit" v-if="item.isimpl == '现行有效'"></image>
				<image src="../../static/tool_1/useless.png" mode="aspectFit" v-else></image>
			</view>
			<text class="total more" v-if="total==list.length">
				暂无更多...
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageSize: 10,
				keywords: '',
				total: '',
				list: [],
			};
		},
		onLoad() {
			this.getList()
		},
		onPullDownRefresh() {
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.pageSize += 10
			this.getList()
		},
		methods: {
			inputchange() {
				let oldInput = this.keywords
				let that = this
				// 添加延时判断500毫秒内input框内容会不会变化，不会变化时发送请求
				setTimeout(function() {
					if (that.keywords == oldInput) {
						// console.log('不变化')
						that.getList()
						// } else {
						// console.log('变化')						
					}
				}, 500);
			},
			getList() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://ai.365lawhelp.com/API/Default/getLawList',
					data: {
						pageNum: 1,
						pageSize: this.pageSize,
						keywords: this.keywords,
					},
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					}, // 请求头
					dataType: 'json', // 返回数据格式
				}).then(result => {
					let [err, res] = result;

					this.total = res.data.total
					this.list = res.data.datalist
					var textRule = new RegExp("<.+?>", "g");
					var index = 0;
					for (var i of this.list) {
						this.list[index].text = i.content.replace(textRule, '');
						this.list[index].text = this.list[index].text.replace(/\s+/g, "");
						this.list[index].text = this.list[index].text.replace(/\【+/g, "<br>【"); //全部的【前加换行符
						this.list[index].text = this.list[index].text.replace(/\<br>【+/,"【"); //第一个【前不加换行，通过不加g全局来判断
						index++
					}
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/tool_1/legislation_detail?id=' + encodeURIComponent(JSON.stringify(id))
				});
			}
		}
	}
</script>

<style lang="scss">
	.legislation {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		background-color: #F2F2F2;

		.header {
			width: 100%;
			height: 275rpx;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			position: relative;

			.searchBox {
				width: 534rpx;
				padding-right: 20rpx;
				height: 60rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.17);
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				position: absolute;
				top: 55rpx;
				left: 50%;
				transform: translateX(-50%);

				image {
					width: 27rpx;
					height: 37rpx;
					margin-left: 20rpx;
					margin-right: 17rpx;
				}

				input {
					width: 100%;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
				}

				input:placeholder {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #010101;
					opacity: 0.6;
				}
			}
		}

		.content {
			position: relative;
			padding: 40rpx 32rpx;

			.total {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				opacity: 0.7;
				display: block;
				margin-bottom: 24rpx;
			}

			.more {
				text-align: center;
			}

			.legislationBox {
				position: relative;
				width: 680rpx;
				height: 210rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin: 0 auto 40rpx;

				.title {
					padding: 0 180rpx;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3D3D3D;
					opacity: 0.9;
					text-align: center;
					border-bottom: 2px solid rgba($color: #000000, $alpha: 0.3);
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3E3E3E;
					opacity: 0.8;

					padding-top: 23rpx;
					padding-left: 22rpx;
					padding-right: 22rpx;
					overflow: hidden;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					display: -webkit-box;
				}

				image {
					width: 100rpx;
					height: 45rpx;
					position: absolute;
					top: 13rpx;
					left: -6rpx;
				}
			}
		}
	}
</style>
