<template>
	<view class="content">
		<!-- 聊天窗 -->
		<view class="chatWindow">
			<view class="chatBubbleBox" v-for="(item, index) in chats" :key="index">
				<view class="chatBubble" :class="{ chatBubbleUser: item.sender != 0 }">
					<view name="亮亮" class="avatar" v-if="item.sender == 0"></view>
					<view class="msgBox">
						<view class="bubbleBox" v-if="item.sender == 1">
							<p>{{ item.send_con }}</p>
						</view>
						<view class="bubbleBox" v-else-if="item.sender == 0 && item.send_con[0].msgInfo">
							<p v-for="(item_msg, index_msg) in item.send_con" :key="index_msg">
								{{ item_msg.msgInfo }}
							</p>
						</view>
						<view class="bubbleBox" v-else-if="item.sender == 0">
							<p>{{ item.send_con }}</p>
						</view>
						<view class="bubbleBox listBox" v-if="item.sender == 0 && item.list">
							<view class="bubbleList" v-for="(item_list, index_list) in item.list" :key="index_list" v-if="index_list<item.listPage*5&&index_list>=(item.listPage-1)*5"
							 @click="goDetail(item.type,item_list.id||item_list.lawDataId||item_list.caseDataId)">
								<view class="listTitle">
									{{item_list.title || item_list.lawTitle || item_list.contractName || item_list.caseTitle}}
								</view>
								<image style="width: 15rpx;height: 27rpx;" src="../../static/icon_getmore.png" mode="aspectFit"></image>
							</view>
							<view class="elseTitle" v-if="item.list.length>5" @click="getElse(item)">换一组</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入盒子实体占位 -->
		<view class="inputBlock"></view>
		<!-- 输入盒子 -->
		<view class="chatInput" :class="[toolBoxShow!=-1?toolBoxShow==true?'toolShow':'toolHide':'']">
			<view class="inputBox">
				<image src="https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/tools.png" mode="aspectFit" @click="getTools"></image>
				<view class="textarea">
					<input type="text" placeholder="请简短清晰的描述您的问题" v-model="input_text" @confirm="send" cursor-spacing="30rpx"
					 confirm-hold confirm-type="send" />
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
				chats: [{
					sender: 0, //发送人，0机器人1用户
					send_con: "你好，我是法保网智能客服，有问题请咨询我!",
					send_timestamp: "1607731220000", //发送时间,存时间戳好进行判断，若聊天间隔3分钟内，不重复显示时间
				}, ],
				tools: [{
					title: '法规搜索',
					url: '../tool_1/legislation',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_1.png',
				}, {
					title: '案例搜索',
					url: '../tool_2/case',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_2.png',
				}, {
					title: '解纷方式',
					url: '../tool_3/dispute',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_3.png',
				}, {
					title: '辅助工具',
					url: '../tool_4/aidedtools',
					img: 'https://aiservices.oss-cn-hangzhou.aliyuncs.com/chatroomAI_mp/chatroom/tool_4.png',
				}, ],
				toolBoxShow: -1, //工具栏是否展示，0否1是-1第一次进入页面
				input_text: '', //问题输入框初始为空
			}
		},
		onLoad() {

		},
		mounted() {
			uni.getStorage({
				key: 'ai_history',
				success: (res) => {
					this.chats = JSON.parse(res.data)
					// this.$nextTick(() => {
					// 	this.caculateIsAbsoluteInput(() => {
					// 		this.scrollToBottom();
					// 	})
					// })
					// setTimeout(()=>{this.scrollToBottom();}, 5000)
				}
			})
		},
		methods: {
			// 获取当前时间戳
			getTime() {
				var now_timestamp = Date.parse(new Date());
				return now_timestamp;
			},
			// 换一组
			getElse(item) {
				if (item.listPage * 5 >= item.list.length) {
					item.listPage = 1
				} else {
					item.listPage++
				}
			},
			// 发送提问
			send() {
				var send = {
					sender: 1,
					send_con: "",
					send_timestamp: "",
				}
				send.send_con = this.input_text
				send.send_timestamp = this.getTime()
				this.input_text = ""
				this.chats.push(send)

				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'https://rpai.365lawhelp.com/api/Reply/getReply',
					data: {
						message: send.send_con,
						appuid: "23941", //测试使用id
					},
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					var that = this;
					if (
						res.data.replayType == "NEEDCONTRACTUSER" ||
						res.data.replayType == "MSG" ||
						res.data.replayType == "UNKNOWN"
					) {
						setTimeout(function() {
							that.chats.push({
								sender: 0,
								send_con: res.data.msgInfos,
								send_timestamp: that.getTime(),
								type: res.data.replayType,
							});
							that.isLoading = 0;
							that.updateHistory(that.chats.length);
						}, 1000);
					} else {
						let all;
						if (res.data.replayType == "QA") {
							//输入"你能做些什么"测试，进入问答页面
							all = res.data.replyQADatas;
						} else if (res.data.replayType == "LAW") {
							//输入"宪法"测试，进入法律页面
							all = res.data.replyLawDatas;
						} else if (res.data.replayType == "CASE") {
							//输入"强奸案案例"测试，进入案例页面
							all = res.data.replyCaseDatas;
						} else if (res.data.replayType == "CONTRACT") {
							//输入"劳动合同"测试，跳转下载链接
							all = res.data.replyContractDatas;
						}
						let list = all;
						setTimeout(function() {
							that.chats.push({
								sender: 0,
								send_con: res.data.msgInfos,
								send_timestamp: that.getTime(),
								type: res.data.replayType,
								list,
								listPage: 1
							});
							that.isLoading = 0;
							that.updateHistory(that.chats.length);
						}, 1000);
					}
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			},
			// 更新聊天记录
			updateHistory(len) {
				let chats = [];
				for (let i = 1; i <= 20; i++) {
					if (this.chats[len - i]) {
						chats.unshift(this.chats[len - i]);
					}
				}
				uni.setStorage({
					key: 'ai_history',
					data: JSON.stringify(chats)
				})
			},
			// 查看详情
			goDetail(type, id) {
				console.log(type)
				if (type == 'CONTRACT') {
					return;
				} else if (type == 'LAW') {
					// console.log(id)
					uni.navigateTo({
						url: '/pages/tool_1/legislation_detail?id=' + encodeURIComponent(JSON.stringify(id))
					});
				} else if (type == 'CASE') {
					uni.navigateTo({
						url: '/pages/tool_2/case_detail?id=' + encodeURIComponent(JSON.stringify(id))
					});
				} else if (type == 'QA') {
					uni.navigateTo({
						url: '/pages/tool_3/dispute_detail?id=' + encodeURIComponent(JSON.stringify(id))
					});
				}
			},
			// 显示工具栏
			getTools() {
				if (this.toolBoxShow == -1) {
					this.toolBoxShow = true
				} else {
					this.toolBoxShow = !this.toolBoxShow
				}
			},
			// 跳转到工具
			goTool(item) {
				uni.navigateTo({
					url: item.url
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
			padding: 30rpx 0;
			background-color: #f2f2f2;

			.chatBubbleBox {

				.chatBubble {
					display: flex;
					align-items: flex-start;
					justify-content: flex-start;
					margin: 20rpx 0;

					.avatar {
						width: 81rpx;
						height: 81rpx;
						margin: 0 32rpx;
						background-image: url('../../static/avatar.png');
						background-repeat: no-repeat;
						background-position: center;
						background-size: cover;
					}

					.msgBox {
						max-width: 460rpx;
						padding: 20rpx 25rpx;
						background-color: #FFFFFF;
						border-radius: 0 20rpx 20rpx;

						.listBox {
							.bubbleList {
								display: flex;
								align-items: center;
								justify-content: space-between;
								border-bottom: 2rpx dashed rgba($color: #000000, $alpha: 0.15);

								.listTitle {
									max-width: 400rpx;
									padding: 10rpx 0;

									font-size: 24rpx;
									font-family: PingFang SC;
									font-weight: bold;
									color: rgba($color: #1980E8, $alpha: 0.8);

									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
								}
							}

							.elseTitle {
								padding: 10rpx 0;
								text-align: center;

								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: rgba($color: #1980E8, $alpha: 0.8);
							}
						}
					}
				}

				.chatBubbleUser {
					display: flex;
					justify-content: flex-end;

					.msgBox {
						border-radius: 20rpx 0 20rpx 20rpx;
						margin-right: 32rpx;
					}
				}
			}
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
