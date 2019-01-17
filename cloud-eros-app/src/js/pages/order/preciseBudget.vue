<template>
    <scroller>
        <div class="precise-budget" :style="{height:pageHeight}">
            <div class="precise-content">
                <div class="stage-1 overflow" v-if="questionList.length" v-for="(item,i) of questionList" :style="index === i+1 ? {} : {height: 1}" :key="i">
                    <text class="title">{{item.titile}}</text>
                    <select-tags @submitData="submitData" :items="item.items" :keyId="item.id" v-if="item.type === '2'" :index="i"></select-tags>
                    <div v-if="item.type === '1'">
                        <check-radio @submitData="submitData" :items="item.items" :index="i" :keyId="item.id"></check-radio>
                    </div>
                </div>
                <div class="stage-5 overflow"  v-if="state.isIndex || questionList.length?(questionList.length + 1 === index):false">
                    <text class="title">请输入以下信息</text>
                    <text class="sub-title" :style="{'padding-left': 40}">方便我们尽快将报价给到您</text>
                    <div class="other-list">
                        <wxc-cell>
                            <div slot="label" class="label">
                                <text class="label-content">您的姓名</text>
                                <text class="label-postfix"> *</text>
                            </div>
                            <input class="wx-input" slot="value" type="text" @input="customerName" placeholder="请输入..." />
                        </wxc-cell>
                        <wxc-cell>
                            <div slot="label" class="label">
                                <text class="label-content">手机号码</text>
                                <text class="label-postfix"> *</text>
                            </div>
                            <input class="wx-input" slot="value" type="text" @input="customerPhone" placeholder="请输入..." />
                        </wxc-cell>
                        <wxc-cell>
                            <div slot="label" class="label">
                                <text class="label-content">楼盘</text>
                                <text class="label-postfix"> *</text>
                            </div>
                            <input class="wx-input" slot="value" type="text" @input="houseName" placeholder="请输入..." />
                        </wxc-cell>
                        <wxc-cell>
                            <div slot="label" class="label">
                                <text class="label-content">面积</text>
                                <text class="label-postfix"> *</text>
                            </div>
                            <input class="wx-input" slot="value" type="text" @input="builtArea" placeholder="请输入..." />
                        </wxc-cell>
                      <div>
                          <text class="sub-title">地址</text>
                          <!--<div class="style" @click="$refs['wxcCity'].show()">-->
                          <!--<text class="text">{{city || placeCity }}</text>-->
                          <!--<text class="icon">&#xe605;</text>-->
                          <!--</div>-->
                          <city-picker @areCode="binAreCode"></city-picker>
                      </div>
                    </div>
                </div>
                <div class="stage-4 overflow" :style="index === questionList.length + 2 ? {} : {height: 1}">
                    <text class="title">如果有，请写下您的特殊需求</text>
                    <text class="sub-title" :style="{'padding-left': 40}">如果有，请写下您的特殊需求</text>
                    <textarea placeholder="特殊需求如：停机坪，整木，大理石等等" class="textarea" v-model="specialDemand"></textarea>
                </div>
            </div>
            <div class="precise-footer">
                <div class="left-index" v-if="questionList.length">
                    <text class="index">{{index}}/{{questionList.length + 2}}</text>
                    <div class="index-dot">
                        <text class="dot" :style="index === i ? {'background-color': '#e60012'} : {'background-color': '#dbd6d6'}" v-for="i in questionList.length+2" :key="i"></text>
                    </div>
                </div>
                <div class="left-index">
                    <text class="index"></text>
                    <div class="index-dot"></div>
                </div>
                <div class="right-button">
                    <wxc-button text="上一题" type="white" v-if="index !== 1" @wxcButtonClicked="changeIndex('backward')" :btnStyle="{'background-color': '#f5f5f5', 'border-color': '#f5f5f5', width: 200, height: 100, 'margin-right': 20}" :textStyle="{'font-size': 28, color: '#e60012'}"></wxc-button>
                    <wxc-button :text="index !== questionList.length+2 ? '下一题' : '提交'" type="white" @wxcButtonClicked="changeIndex('forward')" :btnStyle="{'background-color': '#f5f5f5', 'border-color': '#f5f5f5', width: 200, height: 100}" :textStyle="{'font-size': 28, color: '#e60012'}"></wxc-button>
                </div>
            </div>
        </div>
        <wxc-dialog title="自定义风格"
                    :show="state.isShow"
                    main-btn-color="#e60012"
                    @wxcDialogCancelBtnClicked="state.isShow = false"
                    @wxcDialogConfirmBtnClicked="addTag">
            <input type="text" :autofocus="true"
                   class="input" slot="content"
                   :value="value"
                   @input="e => value = e.value"
                   @change="e => value = e.value" />
        </wxc-dialog>
        <div class="padding">
            <wxc-city ref="wxcCity"
                      currentLocation="西安"
                      cityStyleType="list"
                      @wxcCityItemSelected="citySelect">
            </wxc-city>
        </div>
    </scroller>
</template>

<script>
    import { WxcCell, WxcDialog, WxcCity, WxcButton, WxcRadio } from 'weex-ui'
    import { getIssueQuestionList, saveQuestionDetai } from '../../service/baseApi'
    import mixins from '../../common/mixins'
    import checkRadio from '../../components/checkRadio'
    import selectTags from '../../components/selectTags'
    import cityPicker from '../../components/cityPicker'

    export default {
        name: 'preciseBudget',
        components: { WxcDialog, WxcButton, WxcCity, WxcRadio, WxcCell, checkRadio, selectTags, cityPicker },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isShow: false,
                    isIndex: false
                },
                questionList: [],
                index: 1,
                qusList: [],
                indexList: [],
                totalCount: 1,
                submitSaveQuestionDetai: {
                    addr: '',
                    area: '',
                    house: '',
                    items: [],
                    name: '',
                    phone: '',
                    questionId: '',
                    specialDemand: ''
                },
                specialDemand: '',
                placeCity: '请选择省、市、区',
                city: '',
                areaCode: null // 选择城市的区域编码
            }
        },
        methods: {
            binAreCode (params) {
                this.areaCode = params.code
            },
            async changeIndex (type) {
                this.submitSaveQuestionDetai['specialDemand'] = this.specialDemand
                if (type === 'forward') {
                    if (this.index === this.totalCount) {
                        if (this.submitSaveQuestionDetai.name === '') {
                            return this.toast('名字不能为空')
                        }
                        if (this.submitSaveQuestionDetai.phone === '') {
                            return this.toast('手机号不能为空')
                        }
                        if (!this.isPhone(this.submitSaveQuestionDetai.phone)) {
                            return this.toast('请输入正确的手机号')
                        }
                        if (this.submitSaveQuestionDetai.house === '') {
                            return this.toast('楼盘不能为空')
                        }
                        if (this.submitSaveQuestionDetai.area === '') {
                            return this.toast('面积不能为空')
                        }
                        if (!this.isRealNumber(this.submitSaveQuestionDetai.area)) {
                            return this.toast('请输入正确的面积')
                        }
                        // const result = await saveQuestionDetai(this.submitSaveQuestionDetai)
                        // this.goTo('others.success', { type: 0 })
                        // return this.toast(result.text)
                    } else {
                        if (this.index < this.totalCount) {
                            if (this.submitSaveQuestionDetai.items.length === 0) {
                                return this.toast('请选择')
                            }
                            const info = this.submitSaveQuestionDetai.items[this.index - 1]
                            if (!info) {
                                return this.toast('请选择')
                            }
                            if (this.submitSaveQuestionDetai.items[this.index - 1].length < 1) {
                                return this.toast('请选择')
                            }
                        } else if (this.index === this.questionList.length + 2) {
                            const result = await saveQuestionDetai(this.submitSaveQuestionDetai)
                            this.goTo('others.success', { type: 0 })
                        }
                    }
                    if (this.index !== this.questionList.length + 2) {
                        this.index += 1
                    }
                } else {
                    this.index -= 1
                }
            },
            isPhone (phone) {
                const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
                if (phoneReg.test(phone)) {
                    return true
                } else {
                    return false
                }
            },
            isRealNumber (val) {
                if (!val.replace(/\s+/g, '')) {
                    return false
                } else if (!isNaN(val)) {
                    return true
                } else {
                    return false
                }
            },
            addTag () {
                this.index === 1 ? this.style.push(this.value) : this.color.push(this.value)
                this.state.isShow = false
                this.value = ''
            },
            houseName (e) {
                this.submitSaveQuestionDetai.house = e.value
            },
            builtArea (e) {
                this.submitSaveQuestionDetai.area = e.value
            },
            customerName (e) {
                this.submitSaveQuestionDetai.name = e.value
            },
            customerPhone (e) {
                this.submitSaveQuestionDetai.phone = e.value
            },
            submitData (obj) {
                if (this.indexList.indexOf(obj.index) === -1) {
                    this.indexList.push(obj.index)
                    this.qusList.push(obj.submitData)
                } else {
                    this.qusList.splice(
                        this.indexList.indexOf(obj.index),
                        1,
                        obj.submitData
                    )
                }
                this.submitSaveQuestionDetai['items'] = this.qusList
            },
            citySelect (e) {
                this.city = e.item.name
                this.submitSaveQuestionDetai.addr = e.item.name
            },
            async getQuestion () {
                const result = await getIssueQuestionList()
                for (let i = 0; i < result.length; i++) {
                    const a = result[i]
                    if (a.type === '1') {
                        const items = a.items
                        for (let j = 0; j < items.length; j++) {
                            const item = {}
                            item['title'] = items[j]
                            item['value'] = items[j]
                            items[j] = item
                        }
                    }
                }
                if (result.length > 0) {
                    this.questionList = result
                    this.submitSaveQuestionDetai['questionId'] = this.questionList[0].questionId
                    this.totalCount = this.questionList.length + 1
                } else {
                    this.state.isIndex = true
                    this.totalCount = 1
                }
            }
        },
        async created () {
            await this.getQuestion()
        }
    }
</script>

<style lang="scss" scoped>
    .precise-budget {
        justify-content: space-between;
        width: 750;
        padding-bottom: 50;
        background-color: #fff;
    }

    .precise-content {
        padding: 50 40 0 40;
    }

    .overflow {
        overflow: hidden;
    }

    .title {
        padding: 0 40;
        font-size: 36;
        color: #000;
    }

    .sub-title {
        margin: 30 0 20;
        font-size: 28;
        color: #999;
    }

    .tag-list {
        margin: 80 36 0;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .radio-list {
        margin: 80 36 0;
    }

    .other-list {
        margin: 20 36 0;
    }

    .tag {
        margin: 10 10 14;
        width: 170;
        height: 92;
        line-height: 92;
        text-align: center;
        font-size: 32;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 8;
    }

    .add-tag {
        color: #757575;
    }

    .textarea {
        margin: 80 36 0;
        padding: 24 32;
        height: 600;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 8;
        color: #333333;
        tint-color: #333333;
        font-size: 28px;
    }

    .label {
        width: 200;
        flex-direction: row;
        align-items: center;
        margin-left: -20;
    }

    .label-content {
        font-size: 28;
        color: #353535;
    }

    .label-postfix {
        font-size: 28;
        color: #e60012
    }

    .wx-input {
        width: 460;
        height: 60;
        font-size: 28;
        tint-color: #e60012;
    }

    .style {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 580;
        height: 100;
        padding: 0 20;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 8;
    }

    .text {
        font-size: 28;
        color: #555;
    }

    .icon {
        font-family: iconfont;
        font-size: 48;
        color: #dbd6d6;
    }

    .precise-footer {
        flex-direction: row;
        justify-content: space-between;
        padding: 0 56;
    }

    .left-index {
        height: 100;
        justify-content: space-around;
    }

    .index-dot {
        flex-direction: row;
    }

    .index {
        color: #999;
        font-size: 28;
    }

    .dot {
        margin-right: 12;
        width: 12;
        height: 12;
        border-radius: 6;
        background-color: #dbd6d6;
    }

    .right-button {
        flex-direction: row;
    }

    .input {
        padding: 10;
        border-bottom-color: #dedede;
        border-bottom-style: solid;
        border-bottom-width: 2;
        tint-color: #e60012;
    }
</style>
