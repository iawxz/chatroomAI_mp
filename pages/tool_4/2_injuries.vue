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
		<view style="height: 80rpx;width: 100%;"></view>
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
				<!-- 死亡赔偿信息补充 -->
				<view class="inputBox" v-if="type == 1">
					<text class="title">是否有配偶</text>
					<view class="input radio">
						<view class="radioBox" @click="link_isMarried(0)">
							<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.value!=0"></image>
							<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>是</text>
						</view>
						<view class="radioBox" @click="link_isMarried(1)">
							<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.value!=1"></image>
							<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>否</text>
						</view>
					</view>
					<!-- 补充内容 -->
					<view class="extras" v-if="isMarried.value == 0">
						<text class="title_ex">是否有以下情形</text>
						<view class="radio_ex">
							<view class="radioBox_ex" @click="link_isMarried_isHave(0)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.isHave!=0"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>是</text>
							</view>
							<view class="radioBox_ex" @click="link_isMarried_isHave(1)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.isHave!=1"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>否</text>
							</view>
						</view>
						<text class="detail_ex">
							1、完全丧失劳动能力
							2、男子年满60周岁、女年满55周岁
						</text>
					</view>
					<view class="extras" v-if="isMarried.value == 0">
						<text class="title_ex">是否属于孤寡老人</text>
						<view class="radio_ex">
							<view class="radioBox_ex" @click="link_isMarried_isOld(0)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.isOld!=0"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>是</text>
							</view>
							<view class="radioBox_ex" @click="link_isMarried_isOld(1)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isMarried.isOld!=1"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>否</text>
							</view>
						</view>
					</view>
					<view class="splitLine"></view>
				</view>
				<view class="inputBox" v-if="type == 1">
					<text class="title">是否有其它供养家属</text>
					<view class="input radio">
						<view class="radioBox" @click="link_isHaveElse(0)">
							<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.value!=0"></image>
							<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>是</text>
						</view>
						<view class="radioBox" @click="link_isHaveElse(1)">
							<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.value!=1"></image>
							<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
							<text>否</text>
						</view>
					</view>
					<!-- 补充内容 -->
					<view class="extras" v-if="isHaveElse.value == 0">
						<text class="title_ex">是否有以下情形</text>
						<view class="radio_ex">
							<view class="radioBox_ex" @click="link_isHaveElse_isHave(0)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.isHave!=0"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>是</text>
							</view>
							<view class="radioBox_ex" @click="link_isHaveElse_isHave(1)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.isHave!=1"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>否</text>
							</view>
						</view>
						<text class="detail_ex">
							1、完全丧失劳动能力；
							2、子女未满18周岁；
							3、父母均已死亡，其祖父外祖父年满60周岁，祖母、外祖母年满55周岁；
							4、子女已经死亡或完全丧失劳动能力，其孙子女、外孙女未满18周岁的；
							5、父母均已死亡或完全丧失劳动能力，其兄弟姐妹未满18周岁的；
						</text>
					</view>
					<view class="extras" v-if="isHaveElse.value == 0">
						<text class="title_ex">其他供养家属人数</text>
						<view class="input_ex">
							<input type="number" :value="isHaveElse.number" placeholder="请输入内容" />
							<text class="unit_ex">人</text>
						</view>
					</view>
					<view class="extras" v-if="isHaveElse.value == 0">
						<text class="title_ex">是否属于孤寡老人</text>
						<view class="radio_ex">
							<view class="radioBox_ex" @click="link_isHaveElse_isOld(0)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.isOld!=0"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>是</text>
							</view>
							<view class="radioBox_ex" @click="link_isHaveElse_isOld(1)">
								<image src="../../static/tool_4/common/icon_selsect.png" mode="" v-if="isHaveElse.isOld!=1"></image>
								<image src="../../static/tool_4/common/icon_select_T.png" mode="" v-else></image>
								<text>否</text>
							</view>
						</view>
					</view>
					<view class="splitLine"></view>
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
				<view class="fee" v-for="(item,index) in result[type]" :key="index">
					<text v-text="item.name"></text>
					<view class="amount">
						<text class="unit">{{item.value}} 元</text>
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
				basicInfo: [{
						name: '受诉法院省份',
						type: 'select',
						list: ['选择省份'],
						value: 0, //当前选中			
						isShow: 2, //配合type是否展示，0为伤残，1为死亡，2为皆展示
						isRequired: true, //是否必填，true必填，false不必
						index: 0,
					}, {
						name: '伤残等级',
						type: 'select',
						list: ['选择伤残等级', '一级伤残', '二级伤残', '三级伤残', '四级伤残', '五级伤残', '六级伤残', '七级伤残', '八级伤残', '九级伤残', '十级伤残'],
						value: 0,
						isShow: 0,
						isRequired: true,
						index: 1,
					}, {
						name: '年龄',
						type: 'input',
						unit: '岁',
						placeholder: '请输入年龄',
						value: '',
						isShow: 2,
						isRequired: true,
						index: 2,
					}, {
						name: '性别',
						type: 'radio',
						list: ['男', '女'],
						value: -1,
						isShow: 0,
						isRequired: false,
						index: 3,
					}, {
						name: '停工留薪时长',
						type: 'input',
						unit: '月',
						placeholder: '请输入时长',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 4,
					}, {
						name: '停工留薪工资',
						type: 'input',
						unit: '元/月',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 5,
					},
					{
						name: '死亡年份',
						type: 'select',
						list: ['选择年份', '2020', '2019', '2018', '2017', '...', ],
						value: 0,
						isShow: 1,
						isRequired: false,
						index: 6,
					},
					{
						name: '本人缴费工资',
						type: 'input',
						unit: '元/月',
						placeholder: '请输入金额',
						value: '',
						isShow: 2,
						isRequired: true,
						index: 7,
					},
					{
						name: '事故发生年份',
						type: 'select',
						list: ['选择年份', '2020', '2019', '2018', '2017', '...', ],
						value: 0,
						isShow: 0,
						isRequired: false,
						index: 8,
					},
					{
						name: '住院天数',
						type: 'input',
						unit: '天',
						placeholder: '请输入天数',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 9,
					}, {
						name: '护理费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 10,
					}, {
						name: '鉴定费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 11,
					}, {
						name: '医疗费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 12,
					}, {
						name: '康复治疗费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 13,
					}, {
						name: '交通费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 14,
					}, {
						name: '残疾辅助器皿费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 15,
					}, {
						name: '财产损失费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 0,
						isRequired: false,
						index: 16,
					}, {
						name: '抢救医疗费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 17,
					}, {
						name: '家庭误工费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 18,
					}, {
						name: '家庭交通住宿费',
						type: 'input',
						unit: '元',
						placeholder: '请输入金额',
						value: '',
						isShow: 1,
						isRequired: false,
						index: 19,
					},
				],
				selctIndex: '',
				isMarried: {
					value: -1, //是否有配偶
					isHave: -1, //是否有以下情形
					isOld: -1 //是否属于孤寡老人
				},
				isHaveElse: {
					value: -1, //是否有其它供养家属
					isHave: -1, //是否有以下情形
					number: "", //其它供养家属人数
					isOld: -1, //是否属于孤寡老人
				},
				result: [
					[{
						name: '伤残津贴(每月)',
						value: '',
						unit: '元'
					}, {
						name: '伤残补助金(一次性)',
						value: '',
						unit: '元'
					}, {
						name: '医疗补助金(一次性)',
						value: '',
						unit: '元'
					}, {
						name: '伤残其余赔偿(一次性)',
						value: '',
						unit: '元'
					}, {
						name: '就业补助金(一次性)',
						value: '',
						unit: '元'
					}, ],
					[{
						name: '工亡补助金(一次性)',
						value: '',
						unit: '元'
					}, {
						name: '丧葬补助金(一次性)',
						value: '',
						unit: '元'
					}, {
						name: '配偶抚恤金(每月)',
						value: '',
						unit: '元'
					}, {
						name: '其他亲属抚恤金(每月)',
						value: '',
						unit: '元'
					}, {
						name: '死亡其余赔偿(一次性)',
						value: '',
						unit: '元'
					}, ]
				]
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
				// Object.assign(this.$data.basicInfo, this.$options.data().basicInfo)
				Object.assign(this.$data.isMarried, this.$options.data().isMarried)
				Object.assign(this.$data.isHaveElse, this.$options.data().isHaveElse)
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
			// 是否有配偶
			link_isMarried(index) {
				this.isMarried.value = index
			},
			link_isMarried_isHave(index) {
				this.isMarried.isHave = index
			},
			link_isMarried_isOld(index) {
				this.isMarried.isOld = index
			},
			// 是否有其它供养家属
			link_isHaveElse(index) {
				this.isHaveElse.value = index
			},
			link_isHaveElse_isHave(index) {
				this.isHaveElse.isHave = index
			},
			link_isHaveElse_isOld(index) {
				this.isHaveElse.isOld = index
			},
			// 计算费用
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
				data.type = this.type //伤残0or死亡1
				data.level = this.basicInfo[1].list[this.basicInfo[1].value] //伤残等级
				data.wages = this.basicInfo[7].value //本人工资
				data.age = this.basicInfo[2].value //本人年龄
				if (this.basicInfo[4].value > 24) {
					this.basicInfo[4].value == 24
				}
				data.stopworktime = this.basicInfo[4].value //停工留薪时长				
				data.stopworkwage = this.basicInfo[5].value //停工留薪工资
				if (data.stopworktime == "") {
					data.stopworktime = 0
				}
				if (data.stopworkwage == "") {
					data.stopworkwage = 0
				}
				if (this.type == 0) { //伤残赔偿
					data.medical = Number(this.basicInfo[10].value) + Number(this.basicInfo[11].value) + Number(this.basicInfo[12].value) +
						Number(this.basicInfo[13].value) //医疗费用
					data.otherfee = Number(this.basicInfo[14].value) + Number(this.basicInfo[15].value) + Number(this.basicInfo[16].value) //其它费用
				} else { // 死亡赔偿
					data.medical = Number(this.basicInfo[17].value) //医疗费用
					data.otherfee = Number(this.basicInfo[18].value) + Number(this.basicInfo[19].value) //其它费用
				}
				data.province = this.basicInfo[0].list[this.basicInfo[0].value] //省份
				var index;
				if (data.province.indexOf('省') > -1) {
					index = data.province.indexOf('省');
					data.province = data.province.substring(0, index)
				} else if (data.province.indexOf('市') > -1) {
					index = data.province.indexOf('市')
					data.province = data.province.substring(0, index)
				}
				for (var isM in this.isMarried) {
					if (this.isMarried[isM] == -1) {
						this.isMarried[isM] = 1
					}
				}
				for (var isH in this.isHaveElse) {
					if (this.isHaveElse[isH] == -1) {
						this.isHaveElse[isH] = 1
					}
				}
				data.isspouse = !this.isMarried.value //是否有配偶0否1是					
				data.isspousealone = !this.isMarried.isOld //配偶是否属于孤寡老人
				data.isfamily = !this.isHaveElse.value //是否有其他供养家属
				if (this.isHaveElse.isHave == 0 || this.isHaveElse.isHave == 0) {
					data.isfamilyalone = 1 //其他供养家属是否属于孤儿或孤寡老人
				} else {
					data.isfamilyalone = 0
				}
				uni.showLoading({
					title: '加载中'
				});
				// 计算费用
				uni.request({
					url: 'http://ai.365lawhelp.com/API/Cost/getInjuryMoney',
					data,
					method: 'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					dataType: 'json',
				}).then(result => {
					let [err, res] = result;
					this.result[0][0].value = res.data.disabfee ? res.data.disabfee : 0
					this.result[0][1].value = res.data.onetimedisabfee ? res.data.onetimedisabfee : 0
					this.result[0][2].value = res.data.medicaldisabfee ? res.data.medicaldisabfee : 0
					this.result[0][3].value = res.data.disabotherfee ? res.data.disabotherfee : 0
					this.result[0][4].value = res.data.jobdisabfee ? res.data.jobdisabfee : 0
					this.result[1][0].value = res.data.deathfee ? res.data.deathfee : 0
					this.result[1][1].value = res.data.funeralfee ? res.data.funeralfee : 0
					this.result[1][2].value = res.data.deathspousefee ? res.data.deathspousefee : 0
					this.result[1][3].value = res.data.deathfamilyfee ? res.data.deathfamilyfee : 0
					this.result[1][4].value = res.data.deathotherfee ? res.data.deathotherfee : 0
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
			z-index: 10;
			left: 0;
			top: 0;
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
		}

		.required {
			color: red;
			font-size: 32rpx;
			font-weight: bold;
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
				// height: 99rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.title {
					position: absolute;
					top: 0;
					width: 400rpx;
					height: 99rpx;
					line-height: 99rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba($color: #000000, $alpha: 0.8);
				}

				.required {
					position: absolute;
					top: 20rpx;
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
						text-align: right;
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

				.extras {
					width: 100%;
					margin-bottom: 20rpx;
					padding-right: 40rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;

					.title_ex {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						opacity: 0.8;
					}

					.input_ex {
						width: 300rpx;
						display: flex;
						align-items: center;

						input {
							text-align: right;
							margin-right: 7rpx;
						}

						input:placeholder {
							text-align: right;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #000000;
							opacity: 0.5;
						}

						.unit_ex {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #000000;
							opacity: 0.8;
						}
					}

					.radio_ex {
						display: flex;
						align-items: center;

						.radioBox_ex {
							margin-left: 75rpx;

							image {
								width: 26rpx;
								height: 26rpx;
								margin-right: 6rpx;
							}

							text {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #000000;
								opacity: 0.8;
							}
						}
					}

					.detail_ex {
						width: 100%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						line-height: 50rpx;
						opacity: 0.7;
					}
				}
			}

			.inputBox:last-child {
				.splitLine {
					display: none;
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
				.amountLine {
					display: none;
				}
			}
		}
	}
</style>
