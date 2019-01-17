<template>
    <scroller>
        <div class="bg-F">
            <div class="input-group">
                <div class="group-items">
                    <div class="items-left">
                        <text class="items-text">房屋属性</text>
                        <text class="color-red"> *</text>
                        <text class="items-text">：</text>
                    </div>
                    <div>
                        <div class="items-right">
                        <text class="items-text">{{houseType}}</text>
                        </div>
                    </div>
                </div>
                <div class="group-items">
                    <div class="items-left">
                        <text class="items-text">楼盘</text>
                        <text class="color-red"> *</text>
                        <text class="items-text">：</text>
                    </div>
                    <div class="items-right">
                        <text class="items-text" v-if="houseName">{{houseName}}</text>
                        <text class="items-text" v-else>点击选择</text>
                        <text class="arrow" slot="value" v-else-if="!houseName">&#xe60a;</text>
                    </div>
                </div>
                <div class="group-item">
                    <div class="items-lefts">
                        <text class="items-text" :style="{marginTop:40,marginBottom:20}">装修地址</text>
                        <text class="color-red"> *</text>
                        <text class="items-text">：</text>
                    </div>
                    <text class="input">{{remark}}</text>
                </div>
            </div>
        </div>
    </scroller>
</template>
<script>
    import { WxcIcon } from 'weex-ui'
    import mixins from '../../common/mixins'

    export default ({
        data () {
            return {
                // 上一个页面带过来的详细信息
                houseDetail: null,
                // 接收后台传过来的数据
                houseName: '',
                // 声明一个房屋类型的数组
                houseType: [
                    {
                        name: '小区',
                        isSelected: false
                    },
                    {
                        name: '自建房',
                        isSelected: false
                    }
                ],
                // 装修地址
                remark: ''
            }
        },
        component: { WxcIcon },

        mixins: [mixins],
        methods: {
            selectItem (item) {
                if (!item.isSelected) {
                    for (const items of this.houseType) {
                        items.isSelected = false
                    }
                }
                item.isSelected = !item.isSelected
            },
            jugeIfValue (val) {
                for (let i = 0; i < val.length; i++) {
                    if (val[i] === 1) {
                        return true
                    }
                }
            }
            // selectItemEd (name, adress) {
            //     if (name === )
            // },
            // async tiJiaoBizOrder () {
            //     this.goTo('personInfo.index')
            //     // if (this.houseDetail.id === '' || this.houseName === '' || this.remark === '') {
            //     //     this.toast('请填写完整信息')
            //     // } else {
            //     //     const result = await editBizOrder(
            //     //         this.houseDetail.id,
            //     //         {
            //     //             'houseId': this.houseDetail.houseId,
            //     //             'regionId': this.houseDetail.regionId,
            //     //             'houseLocation': this.remark
            //     //         }, 'POST')
            //     //     if (result.type === 'success') {
            //     //         this.toast('编辑成功')
            //     //         this.goTo('personInfo.index')
            //     //     }
            //     // }
            // }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params) {
                this.houseDetail = params.items
                // this.house = params.itemInfo
                this.houseName = params.items.houseName
                this.remark = params.items.houseLocation
                if (params.items.houseType) {
                    if (params.items.houseType === 'type_bie_shu') {
                        this.houseType = '别墅'
                    } else if (params.items.houseType === 'type_gong_yu') {
                        this.houseType = '公寓'
                    } else if (params.items.houseType === 'type_zi_jian_fang') {
                        this.houseType = '自建房'
                    } else {
                        this.houseType = '办公房'
                    }
                } else {
                    this.houseType = '暂无'
                }
            }
        }
    })
</script>
<style lang="scss" scoped>
    @import "../../../assets/css/base.scss";

    .bg-F {
        margin-top: 20px;
        height: 600;
        background-color: #ffffff;
    }

    .color-red {
        color: red;
    }

    .input-group {
        padding-left: 40px;
    }

    .arrow {
        /*margin-right: 30;*/
        font-family: iconfont;
        font-size: 40;
        color: #353535;
    }

    .color-bbb {
        color: #bbbbbb;
    }

    .color-ddd {
        color: #dddddd;
    }

    .icon {
        font-family: iconfont;
        font-size: 30px;
    }

    .icon2 {
        font-family: iconfont2;
        font-size: 30px;
    }

    .group-items {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        width: 750px;
        height: 120px;
        padding-right: 70px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #cccccc;
    }

    .groups-items {
        height: 300px;
        justify-content: center;
    }

    .group-item {
        width: 750px;
    }

    .items-lefts {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .items-left, .items-right, .items-center {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
        /*justify-content: space-between;*/
    }

    .testInput {
        height: 80px;
        padding: 10px;
        font-size: 32px;
        width: 600px;
        display: inline-block;

    }

    .items-text {
        color: #999999;
    }

    .text-unit {
        margin-left: 20px;
        color: #999999;
    }

    .text-width {
        color: #bbbbbb;
        max-width: 500px;
    }

    .text-icon {
        margin-left: 30px;
        color: #999999;
    }

    .input {
        width: 670px;
        height: 180px;
        margin-top: 20px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        border-width: 1px;
        border-style: solid;
        border-color: #DBD6D6;
        border-radius: 4px;
        color: #333333;
    }

    .input-title {
        flex-direction: row;
        align-items: center;
        align-content: center;
        width: 750px;
        height: 84px;
        padding-left: 40px;
        background-color: #f5f5f5;
    }

    .input-group-pic {
        flex-direction: row;
        padding-top: 40px;
        padding-left: 25px;
        padding-bottom: 28px;
    }

    .pic-items {
        align-items: center;
        justify-content: center;
        width: 230px;
        height: 230px;
        position: relative;
    }

    .pic-images {
        width: 172px;
        height: 172px;
        border-radius: 6px;
        border-width: 1px;
        border-style: solid;
        border-color: #cccccc;
    }

    .pic-icon {
        font-size: 60px;
        color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        right: 0;
    }

    .upload-all {
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 50px;
    }

    .upload-box {
        width: 172px;
        height: 172px;
        margin-left: 40px;
        margin-top: 50px;
        position: relative;
    }

    .upload-img {
        width: 172px;
        height: 172px;
    }

    .add-box {
        width: 172px;
        height: 172px;
        justify-content: center;
        align-items: center;
        border-width: 2px;
        border-color: #DBD6D6;
        margin-left: 40px;
        margin-top: 50px;
        border-radius: 8px;
    }

    .add-img {
        font-size: 80px;
        color: #DBD6D6;
    }

    .text {
        font-size: 40px;
        color: #007AFF;
        text-align: center;
    }

    .button {
        width: 710px;
        height: 114px;
        margin-left: 20px;
    }

    .top-radius {
        border-top-left-radius: 26px;
        border-top-right-radius: 26px
    }

    .bottom-radius {
        border-bottom-left-radius: 26px;
        border-bottom-right-radius: 26px
    }

    .cancel {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }

    .modal-top {
        align-items: flex-start;
        justify-content: flex-start;
        position: absolute;
        bottom: 0;
    }

    .dropIcon {
        position: absolute;
        top: -10;
        right: -10;
        font-size: 40px;
    }
</style>
