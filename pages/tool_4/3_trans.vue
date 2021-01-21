<template>
	<view class="aidedtools">
		<!-- 选择类型 -->
		<view class="type">
			<view class="typeName" :class="{typeChoose:type==0}" @click="typeChoose(0)">伤残赔偿
				<view class="typeLine" v-show="type==0"></view>
			</view>
			<view class="typeName" :class="{typeChoose:type==1}" @click="typeChoose(1)">死亡赔偿
				<view class="typeLine" v-show="type==1"></view>
			</view>
		</view>
		<view style="height: 80rpx;"></view>
		<view class="content">
			<!-- 基本信息 -->
			<view class="basicInfo">
				<view class="inputBox" v-for="(item,index) in basicInfo" :key="index" v-if="item.isShow == 2||item.isShow == type">
					<text class="title" v-text="item.name"></text>
					<text class="required" v-if="item.isRequired">*</text>
					<view class="input" v-if="item.type == 'input'">
						<input type="number" v-model="item.value" :placeholder="item.placeholder" />
						<text class="unit" v-text="item.unit"></text>
					</view>
					<view class="input select" v-if="item.type == 'select'">
						<picker @change="selectChange" @click="selectClick(index)" :value="item.value" :range="item.list">
							<text>{{item.list[item.value]}}</text>
						</picker>
						<image class="type_more" src="../../static/tool_4/common/icon_more.png" mode=""></image>
					</view>
					<view class="input radio" v-if="item.type == 'radio'">
						<view class="radioBox" v-for="(item_,index_) in item.list" :key="index_" @click="link(index,index_)">
							<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="item.value != index_"></image>
							<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>{{item_}}</text>
						</view>
					</view>
					<view class="splitLine"></view>
				</view>
			</view>
			<!-- 扶养人 -->
			<view class="custodian">
				<view class="isNeedBox">
					<text class="isNeedText">是否有需扶养人</text>
					<view class="radioBox" @click="need(0)">
						<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isNeed != 0"></image>
						<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
						<text>是</text>
					</view>
					<view class="radioBox" @click="need(1)">
						<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isNeed != 1"></image>
						<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
						<text>否</text>
					</view>
				</view>
				<view class="custodianBox" v-for="(item,index) in custodianInfo" :key="index">
					<image class="custodianDel" src="../../static/tool_4/common/icon_delete.png" mode="" @click="delCustodian(index)"></image>
					<view class="custodianInputBox" v-for="(item_,index_) in item" :key="index_">
						<text class="title" v-text="item_.name"></text>
						<view class="input" v-if="item_.type == 'input'">
							<input type="number" v-model="item_.value" :placeholder="item_.placeholder" />
							<text class="unit" v-text="item_.unit"></text>
						</view>
						<view class="input radio" v-if="item_.type == 'radio'">
							<view class="radioBox" v-for="(item_r,index_r) in item_.list" :key="index_r" @click="work(index,index_,index_r)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="item_.value != index_r"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>{{item_r}}</text>
							</view>
						</view>
						<view class="splitLine"></view>
					</view>
				</view>
				<!-- 添加扶养人 -->
				<view class="custodianAdd" @click="addCustodian" v-if="isNeed ==0">
					<image src="../../static/tool_4/common/icon_add.png" mode=""></image>
					<text>添加扶养人</text>
				</view>
			</view>
			<!-- 计算按钮 -->
			<view class="calc" @click="goCalc">去计算</view>
			<!-- 计算结果 -->
			<view class="result">
				<view class="title">
					<image src="../../static/tool_4/common/icon_calc.png" mode=""></image>
					<text>计算结果</text>
				</view>
				<view class="fee" v-for="(item,index) in result" :key="index" v-if="item.type == type||item.type == 2">
					<text>{{item.name}}</text>
					<view class="amount">
						<text class="unit">{{item.value}} 元</text>
					</view>
					<view class="amountLine"></view>
				</view>
				<view class="fee" v-if="besupport.length" v-for="(item,index_besupport) in besupport" :key="index_besupport">
					<text>第{{index_besupport+1}}位被抚养人</text>
					<view class="amount">
						<text class="unit">{{item.fee}}元</text>
					</view>
					<view class="amountLine"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0, //类型选择 0伤残赔偿 1死亡赔偿，默认为0
				basicInfo: [

					{
						name: '受诉法院省份',
						type: 'select',
						list: ['选择省份'],
						value: 0, //当前选中
						isShow: 2, //配合type是否展示，0为伤残，1为死亡，2为皆展示
						isRequired: true,
						index: 0,
					}, {
						name: '户籍类型',
						type: 'select',
						list: ['选择户口类型', '农村', '城镇'],
						value: 0,
						isShow: 2,
						isRequired: true,
						index: 1,
					}, {
						name: '起诉年份',
						type: 'select',
						list: ['选择起诉年份', '2020', '2019', '2018', '2017', '2016', '2015', '...'],
						value: 0,
						isShow: 2,
						isRequired: false,
						index: 2,
					}, {
						name: '伤残等级',
						type: 'select',
						list: ['选择伤残等级', '一级伤残', '二级伤残', '三级伤残', '四级伤残', '五级伤残', '六级伤残', '七级伤残', '八级伤残', '九级伤残', '十级伤残'],
						value: 0,
						isShow: 0,
						isRequired: true,
						index: 3,
					}, {
						name: '年龄',
						type: 'input',
						unit: '岁',
						placeholder: '请输入年龄',
						value: '',
						isShow: 2,
						isRequired: true,
						index: 4,
					}, {
						name: '营养费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 5,
					}, {
						name: '护理费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 6,
					}, {
						name: '住院伙食补助费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 7,
					}, {
						name: '伤者有无固定收入',
						type: 'radio',
						list: ['有', '无'],
						value: -1,
						isShow: 0,
						isRequired: false,
						index: 8,
					}, {
						name: '伤者月收入',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 9,
					}, {
						name: '误工天数',
						type: 'input',
						unit: '天',
						placeholder: '请输入天数',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 10,
					}, {
						name: '医疗费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 11,
					}, {
						name: '鉴定费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 12,
					}, {
						name: '交通费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 13,
					}, {
						name: '残疾辅助器皿费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 14,
					}, {
						name: '抢救医疗费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 15,
					}, {
						name: '家庭误工费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 16,
					}, {
						name: '家庭交通住宿费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 17,
					}, {
						name: '财产损失费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 2,
						isRequired: false,
						index: 18
					},

				],
				selctIndex: '',
				custodianInfo: [],
				custodianInput: [

					{
						name: '被扶养人的年龄',
						type: 'input',
						unit: '岁',
						placeholder: '请输入年龄',
						value: '',
					}, {
						name: '被抚养人的户口',
						type: 'radio',
						list: ['农村', '城镇'],
						value: -1,
						isShow: 0,
					}, {
						name: '抚养该被扶养人的人数',
						type: 'input',
						unit: '个',
						placeholder: '请输入人数',
						value: '',
					},
				],
				isNeed: -1,
				result: [

					{
						name: '丧葬费',
						value: '',
						type: 1,
					}, {
						name: '残疾赔偿金',
						value: '',
						type: 0,
					}, {
						name: '死亡赔偿金',
						value: '',
						type: 1,
					}, {
						name: '误工费用',
						value: '',
						type: 2,
					}, {
						name: '精神抚慰金',
						value: '',
						type: 2,
					}, {
						name: '医疗费用',
						value: '',
						type: 2,
					}, {
						name: '其他费用',
						value: '',
						type: 2,
					},

				],
				// 扶养人赔偿
				besupport: []

			};
		},
		onLoad() {
			// 获取省份列表
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
						this.basicInfo[0].list.push(i.label)
					}
				}
			},
			// 类型选择
			typeChoose(type) {
				this.type = type
			},
			// basicInfo单选框选中
			link(index, index_) {
				this.basicInfo[index].value = index_
			},
			// basicInfo下拉框选择
			selectClick(index) {
				this.selctIndex = index
			},
			selectChange(e) {
				this.basicInfo[this.selctIndex].value = e.target.value
			},
			// 是否有需扶养人
			need(index) {
				this.isNeed = index
				if (index == 1) {
					this.custodianInfo = []
				} else {
					if (this.custodianInfo.length == 0) {
						this.custodianInfo.push(JSON.parse(JSON.stringify(this.custodianInput)))
					}
				}
			},
			// 有无劳动能力
			work(index, index_, index_r) {
				let obj = JSON.stringify(this.custodianInfo[index][index_]);
				var arrchange = JSON.parse(obj);

				arrchange.value = index_r
				this.custodianInfo[index].splice(index_, 1, arrchange)
			},
			// 添加扶养人
			addCustodian() {
				this.custodianInfo.push(JSON.parse(JSON.stringify(this.custodianInput)))
			},
			// 删除多添的扶养人
			delCustodian(index) {
				this.custodianInfo.splice(index, 1)
				if (this.custodianInfo.length == 0) {
					this.isNeed = -1
				}
			},
			// 去计算
			goCalc() {
				var i_ = 0
				for (var i of this.basicInfo) {
					// 判断是否为当前页面类型的数据
					if (i.isShow == this.type || i.isShow == 2) {
						// 判断是否为必填项,true为必填
						if (i.isRequired) {
							// 若是必填项，判断是哪种类型
							if ((i.type == "input" && i.value == "") || (i.type == "select" && i.value == 0) || (i.type == "radio" && i.value ==
									-1)) {
								uni.showToast({
									title: i.name + " 为必填项请认真填写",
									icon: 'none'
								})
								return
							}
						}
						// 不为必填项
						else {
							// 若不是必填项，判断是哪种类型
							if (i.type == "input" && i.value == "") {
								this.basicInfo[i_].value = 0
							}
						}
					}
					i_++
				}
				var data = {}
				this.basicInfo[9].value ? data.wages = this.basicInfo[9].value : data.wages = 0
				this.basicInfo[10].value ? data.delayworkday = this.basicInfo[10].value : data.delayworkday = 0


				data.province = this.basicInfo[0].list[this.basicInfo[0].value]
				var index;
				if (data.province.indexOf('省') > -1) {
					index = data.province.indexOf('省');
					data.province = data.province.substring(0, index)
				} else if (data.province.indexOf('市') > -1) {
					index = data.province.indexOf('市')
					data.province = data.province.substring(0, index)
				} //省份
				data.level = this.basicInfo[3].list[this.basicInfo[3].value] //伤残等级
				data.hukou = this.basicInfo[1].value - 1 //户口
				if (this.type == 0) {
					data.medical = Number(this.basicInfo[5].value) + Number(this.basicInfo[6].value) + Number(this.basicInfo[7].value) +
						Number(this.basicInfo[11].value) + Number(this.basicInfo[12].value)
					data.otherfee = Number(this.basicInfo[13].value) + Number(this.basicInfo[14].value) + Number(this.basicInfo[18].value)
				} else {
					data.medical = Number(this.basicInfo[15].value)
					data.otherfee = Number(this.basicInfo[16].value) + Number(this.basicInfo[17].value) + Number(this.basicInfo[18].value)
				}
				data.age = this.basicInfo[4].value
				data.type = this.type
				data.support = []
				if (this.custodianInfo.length) {
					var i_cus
					for (var i of this.custodianInfo) {
						var a = {}
						a.age = i[0].value
						a.hukou = i[1].value
						a.amount = i[2].value
						if (i[2].value < 1) {
							uni.showToast({
								title: '抚养人包含受害者本人，至少为1人',
								icon: 'none'
							})
							return
						}
						data.support.push(a)
					}
					data.support = JSON.stringify(data.support)
				}
				uni.showLoading({
					title: '加载中'
				});
				// 计算费用
				uni.request({
					url: 'http://ai.365lawhelp.com/API/Cost/getTrafficMoney',
					data,
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					this.result[0].value = res.data.funeralfee
					this.result[1].value = res.data.disabfee
					this.result[2].value = res.data.deathfee
					this.result[3].value = res.data.delayworkfee
					this.result[4].value = res.data.mentalfee
					this.result[5].value = res.data.medicalfee
					this.result[6].value = res.data.otherfee
					this.besupport = res.data.besupport
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
		padding-bottom: 70rpx;

		.type {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			height: 81rpx;
			background: #2083E7;
			display: flex;
			justify-content: space-around;
			transform: translateY(-1rpx);

			.typeName {
				position: relative;
				width: 327rpx;
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
			z-index: 0;
		}

		.basicInfo {
			width: 654rpx;
			padding-left: 32rpx;
			margin: 40rpx auto 0;
			border-radius: 10px;
			background-color: #FFFFFF;
			overflow: hidden;

			.inputBox {
				position: relative;
				height: 99rpx;
				display: flex;
				align-items: center;

				.title {
					position: absolute;
					width: 400rpx;
					height: 99rpx;
					line-height: 99rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba($color: #000000, $alpha: 0.8);
				}

				.required {
					color: red;
					font-size: 32rpx;
					font-weight: bold;
					position: absolute;
					left: -20rpx;
				}

				.input {
					width: 100%;
					height: 99rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					input {
						text-align: right;
					}

					input:placeholder {
						text-align: right;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						opacity: 0.5;
					}

					text.unit {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba($color: #000000, $alpha: 0.7);
						margin-right: 40rpx;
						margin-left: 9rpx;
					}
				}

				.radio {
					.radioBox {
						display: flex;
						align-items: center;
						margin-left: 30rpx;

						image {
							width: 30rpx;
							height: 30rpx;
							margin-right: 8rpx;
						}

						text {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba($color: #000000, $alpha: 0.7);
							margin-right: 40rpx;
						}
					}
				}

				.select {
					position: relative;

					picker {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						text {
							margin-right: 73rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba($color: #000000, $alpha: 0.5);
						}
					}

					.type_more {
						width: 18rpx;
						height: 12rpx;
						position: absolute;
						top: 50%;
						transform: translate(-40rpx, -50%);
					}
				}

				.splitLine {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 451rpx;
					height: 2rpx;
					background: #000000;
					opacity: 0.08;
				}
			}

			.inputBox:last-child {
				.splitLine {
					display: none;
				}
			}
		}

		.custodian {
			.isNeedBox {
				width: 686rpx;
				margin: 40rpx auto 32rpx;
				display: flex;
				align-items: center;

				.isNeedText {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #2083E7;
					margin-right: 65rpx;
				}

				.radioBox {
					display: flex;
					align-items: center;
					margin-right: 34rpx;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 8rpx;
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

			.custodianBox {
				position: relative;
				width: 654rpx;
				margin: 0 auto;
				padding-left: 32rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				// overflow: hidden;
				margin-bottom: 32rpx;

				.custodianDel {
					width: 42rpx;
					height: 42rpx;
					position: absolute;
					right: -20rpx;
					top: -20rpx;
				}

				.custodianInputBox {
					position: relative;
					display: flex;
					align-items: center;

					.title {
						width: 780rpx;
						height: 99rpx;
						line-height: 99rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba($color: #000000, $alpha: 0.8);
					}

					.input {
						width: 100%;
						height: 99rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						input {
							text-align: right;
						}

						input:placeholder {
							text-align: right;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #000000;
							opacity: 0.5;
						}

						text.unit {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba($color: #000000, $alpha: 0.7);
							margin-right: 40rpx;
							margin-left: 9rpx;
						}
					}

					.radio {
						.radioBox {
							display: flex;
							align-items: center;
							// margin-left: 30rpx;

							image {
								width: 30rpx;
								height: 30rpx;
								margin-right: 8rpx;
							}

							text {
								font-size: 32rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: rgba($color: #000000, $alpha: 0.7);
								margin-right: 40rpx;
							}
						}
					}

					.splitLine {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 451rpx;
						height: 2rpx;
						background: #000000;
						opacity: 0.08;
					}
				}

				.custodianInputBox:last-child {
					.splitLine {
						display: none;
					}
				}
			}

			.custodianAdd {
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 45rpx;
					height: 45rpx;
					margin-right: 24rpx;
				}

				text {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba($color: #000000, $alpha: 0.8);
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
				position: relative;
				width: 100%;
				height: 99rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					position: absolute;
					width: 372rpx;
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
					// border-bottom: 2px solid rgba($color: #000000, $alpha: 0.08);
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

				.amountLine {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 451rpx;
					height: 2rpx;
					background: #000000;
					opacity: 0.08;
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
