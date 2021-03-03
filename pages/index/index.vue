<template>
	<view class="content">
		<!-- 假设我需要状态栏到文字内容部分还有50px的距离 -->
		<view class="statusBar" :style="{height:statusBarHeight+50+'px'}">
			<text>法保智能客服</text>
			<image class="statusBarBack" src="../../static/index/statusback.png" mode="aspectFill"></image>
		</view>
		<view class="goChat">
			<image class="robot" src="../../static/index/robot.png" mode="aspectFill"></image>
			<view class="goChatBox">
				<view class="logoBox">
					<image class="logoBack" style="width: 239rpx;height: 70rpx;" src="../../static/index/logoback.png" mode="aspectFill"></image>
					<image class="logo" style="width: 169rpx;height: 42rpx;" src="../../static/index/logo.png" mode="aspectFill"></image>
				</view>
				<view class="channel">
					<view class="intro">
						你好，我是法保智能法务,</br>
						有问题请咨询我！
					</view>
					<view class="button" @click="goChat">
						<text>前往咨询</text>
						<image style="width: 14rpx;height: 25rpx;" src="../../static/index/go.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="tools">
			<view class="tool" v-for="(item,index) in tools" :key="index" @click="goTool(item)">
				<image style="height: 80rpx;" :src="item.img" mode="heightFix"></image>
				<text v-text="item.title"></text>
			</view>
		</view>
		<view class="hotQuestion">
			<text class="title">
				热门问题
			</text>
			<view id="typeBox" class="typeBox">
				<view class="typelist">
					<view v-for="(item,index) in type" :key="index" v-if="(index-typeChoose)<5&&(index-typeChoose)>=0" class="type"
					 :class="{'typeChoose':typeChoose_out==index}" @click="typeSelect_out(index,item.id)">
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="getMoreType" @click="typeShow">
					<image src="../../static/index/arrow_up.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="questionBox" :style="{height:questionHeight+'px'}">
				<view class="questionList" v-for="(item,index) in question" :key="index" @click="goDetail(item.name)">
					<view class="question">
						<view class="point"></view>
						<text>{{item.name}}</text>
					</view>
					<image src="../../static/index/arrow_right.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="mask" v-if="isTypeShow">
			<view class="typeBox" :style="{top:typeTop +'px'}">
				<view class="typeName">
					<text v-if="typeChoose==typeChoose_out">{{type[typeChoose].title}}</text>
					<text v-else>{{type[typeChoose_out].title}}</text>
					<view class="closeMoreType" @click="typeShow">
						<image src="../../static/index/arrow_down.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="typeNameBody" style="height: 100rpx; width: 100%;"></view>
				<view class="types" v-if="typeChoose==typeChoose_out">
					<view class="type" :class="{'typeChoose':index==typeChoose}" v-for="(item,index) in type" :key="index" @click="typeSelect(index,item.id)">
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="types" v-else>
					<view class="type" :class="{'typeChoose':index==typeChoose_out}" v-for="(item,index) in type" :key="index" @click="typeSelect(index,item.id)">
						<text>{{item.name}}</text>
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
				statusBarHeight: null, //状态栏高度
				questionHeight: null, //问题展示区域高度
				typeTop: null, //问题类型高度
				tools: [{
					title: '法规搜索',
					url: '../tool_1/legislation',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_1.png',
				}, {
					title: '案例搜索',
					url: '../tool_2/case',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_2.png',
				}, {
					title: '费用计算器',
					url: '../tool_4/aidedtools',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_4.png',
				}, ],
				type: [],
				question: [],
				typeChoose: 0,
				typeChoose_out: 0,
				isTypeShow: false,
			}
		},
		onLoad() {
			var _this = this;
			uni.getSystemInfo({
				success: function(data) {
					// 获取手机状态栏高度
					_this.statusBarHeight = data.statusBarHeight;
					// 获取问题展示区域高度
					const screenHeight = data.screenHeight
					//statusBar高度:_this.statusBarHeight+50;goChat高度:164;tools:79+20;hotQuestion上半部分:26+22+16+27;questionBox自身margin:13+16;预留底部高度:4;
					_this.questionHeight = screenHeight - (_this.statusBarHeight + 50) - 164 - (79 + 20) - (26 + 22 + 16 + 27) - (
						13 + 16) - 4
				}
			})

			// 获取类型展示区域高度
			const query = uni.createSelectorQuery().in(_this);
			query.select('.hotQuestion').boundingClientRect(data => {				
				_this.typeTop = data.top
			}).exec();

			//获取热门问题类别列表
			uni.request({
				url: 'https://ai.365lawhelp.com/API/Question/getHotQuestionType',
				data: {},
				method: 'get',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				dataType: 'json',
			}).then(result => {
				let [err, res] = result;
				this.type=res.data
				
				this.getQuestion(this.type[0].id)
				
			})
		},
		mounted() {},
		methods: {
			// 跳转到聊天室
			goChat() {
				uni.navigateTo({
					url: '../chatroom/chatrom'
				});
			},
			// 跳转到相应工具
			goTool(item) {
				uni.navigateTo({
					url: item.url
				});
			},
			// 展示问题类型列表
			typeShow() {
				this.isTypeShow = !this.isTypeShow
			},
			// 热门问题类型选择
			// ··下拉框内选择
			typeSelect(index,parentid) {								
				this.typeChoose = index
				this.typeChoose_out = index
				this.getQuestion(parentid)
			},
			// ··外部选项卡选择
			typeSelect_out(index,parentid){				
				if(index == this.typeChoose+4){
					return
				}
				this.typeChoose_out = index
				this.getQuestion(parentid)
			},			
			// 获取改类型热门问题列表
			getQuestion(id){
				uni.request({
					url: 'http://ai.365lawhelp.com/API/Question/getHotQuestionChildType',
					data: {
						parentid:id
					},
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;					
					this.question = res.data					
				})
			},
			// 查看问题详情
			goDetail(question){
				uni.navigateTo({
					url: '/pages/chatroom/chatroom?question=' + encodeURIComponent(JSON.stringify(question))
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: relative;

		.statusBar {
			width: 100%;
			position: relative;

			/* 调整状态栏标题的位置 */
			text {
				position: absolute;
				z-index: 9999;
				margin: auto;
				bottom: 15px;
				left: 0;
				right: 0;
				text-align: center;

				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}

			.statusBarBack {
				width: 100%;
				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
			}
		}

		.goChat {
			width: 100%;
			height: 300rpx;
			position: relative;

			.robot {
				width: 176rpx;
				height: 220rpx;
				position: absolute;
				z-index: -1;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
			}

			.goChatBox {
				width: 90%;
				height: 213rpx;
				position: absolute;
				top: 100rpx;
				left: 50%;
				transform: translateX(-50%);

				.logoBox {
					width: 239rpx;
					height: 70rpx;
					position: relative;

					.logoBack {
						position: absolute;
						top: 0;
						left: 0;
					}

					.logo {
						position: absolute;
						top: 18rpx;
						left: 22rpx;
					}
				}

				.channel {
					width: 100%;
					height: 143rpx;
					background-color: #ffffff;
					border-radius: 0 20rpx 20rpx 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-shadow: 0px 2px 5px #EEEEEE;

					.intro {
						margin-left: 32rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba($color: #333333, $alpha: 0.9);
						line-height: 48rpx;
					}

					.button {
						margin-right: 32rpx;
						width: 182rpx;
						height: 60rpx;
						background: #157CE4;
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						text {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
						}

						image {
							display: block;
							margin-left: 6rpx;
						}
					}
				}
			}
		}

		.tools {
			margin-top: 37rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.tool {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 0 45rpx;

				image {
					display: block;
					margin-top: 12rpx;
				}

				text {
					display: block;
					margin-top: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba($color: #333333, $alpha: 0.9);
				}
			}
		}

		.hotQuestion {
			width: 90%;
			margin: 48rpx auto 0;
			position: relative;

			.title {
				display: block;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 30rpx;
			}

			.typeBox {
				position: relative;
				display: flex;
				align-items: center;

				.typelist {
					width: 100%;
					height: 50rpx;
					overflow: hidden;
					position: relative;

					.type {
						position: absolute;
						top: 0;
						left: 0;
						width: 130rpx;
						height: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #F2F2F2;
						border-radius: 25rpx;

						text {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba($color: #333333, $alpha: 0.7);
						}
					}

					.typeChoose {
						background: #E5F2FF;

						text {
							color: #157CE4;
						}
					}

					.type:nth-child(2) {
						left: 154rpx;
					}

					.type:nth-child(3) {
						left: 308rpx;
					}

					.type:nth-child(4) {
						left: 462rpx;
					}

					.type:nth-child(5) {
						left: 616rpx;
					}
				}

				.getMoreType {
					width: 48rpx;
					height: 50rpx;
					background-color: #FFFFFF;
					position: absolute;
					right: 0;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					image {
						width: 25rpx;
						height: 14rpx;
					}
				}
			}

			.questionBox {
				height: 700rpx;
				overflow-y: scroll;
				margin-top: 25rpx;
				margin-bottom: 30rpx;

				.questionList {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 58rpx;
					border-bottom: 2px solid rgba($color: #000000, $alpha: 0.1);

					.question {
						display: flex;
						align-items: center;

						.point {
							width: 10rpx;
							height: 10rpx;
							background: #333333;
							opacity: 0.5;
							border-radius: 50%;
							margin-right: 14rpx;
						}

						text {
							display: block;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;
							opacity: 0.8;

							max-width: 600rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}

					image {
						width: 14rpx;
						height: 25rpx;
					}
				}
			}
		}

		.mask {
			width: 100%;
			height: 100vh;
			background-color: rgba($color: #333333, $alpha: 0.1);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;

			.typeBox {
				position: relative;
				width: 100%;
				background-color: #FFFFFF;
				position: absolute;
				top: 325px;
				bottom: 0;
				left: 0;
				right: 0;
				overflow-y: scroll;

				.typeName {
					width: 90%;
					background-color: #FFFFFF;
					position: fixed;
					padding: 22rpx 0;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					align-items: center;
					justify-content: space-between;

					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						opacity: 0.9;
					}

					.closeMoreType {
						width: 48rpx;
						height: 50rpx;
						background-color: #FFFFFF;						
						display: flex;
						align-items: center;
						justify-content: flex-end;

						image {
							width: 25rpx;
							height: 14rpx;
						}
					}

				}

				.types {
					width: 90%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;

					.type {
						width: 154rpx;
						height: 50rpx;
						background: #F2F2F2;
						border-radius: 25rpx;
						margin-bottom: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						text {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba($color: #333333, $alpha: 0.7);
						}
					}

					.typeChoose {
						background: #E5F2FF;

						text {
							color: #157CE4;
						}
					}
				}
			}
		}
	}
</style>
