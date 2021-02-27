<!-- 法规搜索 -->
<template>
	<view class="legislation_detail">
		<view class="content">
			<text class="title">{{detail.title}}</text>
			<view class="keywords">
				<text>关键词:</text>
				<view class="key">{{detail.lawType}}</view>
				<view class="key">{{detail.issueDate}}</view>
				<view class="key">{{detail.issuedNumber}}</view>
				<view class="key">{{detail.issuingAuthority}}</view>
			</view>
			<view class="text">
				<text>内容:</text>
				<view class="textContent" v-html="detail.content">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				detail: {},
			};
		},
		onLoad: function(option) {
			this.id = JSON.parse(decodeURIComponent(option.id));
			this.getDetail()
		},
		methods: {
			getDetail() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'https://ai.365lawhelp.com/API/Default/getLawDetail',
					data: {
						id: this.id
					},
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;					
					this.detail = res.data					
					this.detail.content = this.detail.content.replace(/\s+/g, "");
					this.detail.content = this.detail.content.replace(/\【+/g, "<br>【"); //全部的【前加换行符
					this.detail.content = this.detail.content.replace(/\<br>【+/, "【"); //第一个【前不加换行，通过不加g全局来判断
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			},
		}
	}
</script>

<style lang="scss">
	.legislation_detail {
		width: 100%;
		min-height: 100vh;
		background: #F2F2F2;

		.content {
			position: relative;
			padding: 35rpx 54rpx;

			.title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3D3D3D;
				opacity: 0.9;
				display: block;
				margin-bottom: 42rpx;
			}

			.keywords {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom: 24rpx;

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.7;
					display: block;
					margin-right: 27rpx;
				}

				.key {
					margin: 5rpx 9rpx 5rpx;
					padding: 10rpx;
					background: #E6F2FF;
					border-radius: 6rpx;

					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.6;
				}
			}

			.text {
				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
					opacity: 0.7;
					display: block;
					margin-bottom: 30rpx;
				}

				.textContent {
					margin-left: 26rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3E3E3E;
					line-height: 36rpx;
					opacity: 0.7;
				}
			}
		}
	}
</style>
