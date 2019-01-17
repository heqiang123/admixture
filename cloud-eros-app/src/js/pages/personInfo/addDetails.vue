<template>
    <div>
        <status-bar></status-bar>
        <div class="headerDetails">
            <div class="header">
                <div class="left">
                    <text class="icons" @click="$router.back()">&#xe601;</text>
                </div>
                <div class="center">
                    <div class="input-group">
                        <input type="text" class="input" placeholder="楼盘,小区" @change="onchange($event)" />
                        <text class="icon input-icon">&#xe640;</text>
                    </div>
                </div>

                <!--<div slot="right" class="minibar-left" @click="showCity">-->
                <!--&lt;!&ndash;<text :style="{color: '#ffffff'}">{{selectedCity}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="icons">&#xe605;</text>&ndash;&gt;-->
                <!--</div>-->
            </div>
            <!--<div class="headerSearch">-->
            <!--<text slot="middle" class="minibar-middle" @click="goTo('personInfo.search')">&#xe7d4;查找小区/楼盘</text>-->
            <!--</div>-->
        </div>
        <list>
            <cell v-for="(item,index) in this.customerInformation" :key="index">
                <div class="content-items" @click="selectItem(item)">
                    <div class="items-left">
                        <text class="icon color-bbb" v-if="!item.isSelected" :key="1">&#xe71f;</text>
                        <text class="icon color-red" v-else :key="2">&#xe617;</text>

                    </div>
                    <div class="items-right">
                        <div class="right-item">
                            <text class="item-text text-title">{{item.name}}</text>
                            <text class="item-text">{{item.addr}}</text>

                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
    import { WxcRadio, WxcMinibar } from 'weex-ui'
    import mixins from '../../common/mixins'
    import cityPopup from '../../components/cityPopup'
    import statusBar from '../../components/statusBar'
    import { getBusiContentHouse } from '../../service/cityApi'

    export default {
        components: { WxcRadio, WxcMinibar, cityPopup, statusBar },
        mixins: [mixins],
        data () {
            return {
                // 页面传过来的id
                cityId: '',
                // 后台请求过来的数组
                customerInformation: [],
                // item的详情
                itemInfo: {},
                // 搜索的数据
                serchVal: ''
            }
        },
        watch: {
            cityParams (val) {
                this.cityParams = val
            },
            state: {
                handler (newVal, oldVal) {

                }
            }
        },
        methods: {

            async getHouse () {
                const result = await getBusiContentHouse({
                    'authCondition': 'string',
                    'export': false,
                    'orderBy': 'id asc',
                    'page': this.page,
                    'pageSize': 20,
                    'queryParamList': [
                        {
                            'field': 'city',
                            'items': [],
                            'logic': '=',
                            'type': 'string',
                            'value': this.city
                        }
                    ]
                })
                for (const item of result.content) {
                    item.isSelected = false
                }
                this.customerInformation = result.content
            },
            selectItem (item) {
                if (!item.isSelected) {
                    for (const items of this.customerInformation) {
                        items.isSelected = false
                    }
                }
                item.isSelected = !item.isSelected
                this.itemInfo = item
                this.goTo('personInfo.add', { itemInfo: this.itemInfo })
            },
            onchange ($event) {
                this.serchVal = $event.value
                this.customerInformation = []
                this.getHouse(this.serchVal)
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.city = params.city
            this.getHouse()
            // this.showLoading('加载中...', 10000)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/base.scss";

    .home {
        width: 750px;
        background-color: #fff;
    }

    .minibar-left {
        flex-direction: row;
        /*margin-right: 40px;*/
    }

    .minibar-middle {
        width: 600;
        height: 60;
        line-height: 60;
        text-align: center;
        font-family: iconfont;
        color: #888;
        background-color: #e9e9e9;
        border-radius: 5;
    }

    .minibar-right {
        width: 180;
        color: #555;
        text-align: center;
    }

    .status-bar {
        height: 36;
        background-color: #fff;
    }

    .slider-wrapper {
        background-color: #fff;
        width: 750;
        height: 450;
    }

    .slider-image {
        width: 750;
        height: 450;
    }

    .indicator {
        width: 750;
        height: 300;
        position: absolute;
        top: 250;
        left: 0;
        item-color: #fff;
        item-selected-color: #e60012;
        item-size: 16;
    }

    .home-wrapper {
        padding: 20;
    }

    .category-title {
        margin: 40 0;
        font-size: 28;
        color: #999;
    }

    .category-main {
        flex-direction: row;
        justify-content: space-between;
    }

    .category-item {
        justify-content: center;
        align-items: center;
        width: 140;
        height: 140;
        background-color: #fff;
        border-radius: 16;
        box-shadow: 0 16 44 0 #ddd;
    }

    .category-image {
        width: 80;
        height: 80;
    }

    .category-text {
        width: 140;
        text-align: center;
        margin-top: 26;
        font-size: 28;
        color: #353535;
    }

    .column {
        margin-top: 80;
    }

    .title {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-main-wrapper {
        flex-direction: row;
    }

    .title-icon {
        width: 40;
        height: 40;
        margin-right: 10;
        align-self: center;
    }

    .title-main {
        margin-top: 4;
        font-size: 32;
        color: #353535;
    }

    .title-more-wrapper {
        height: 40;
        margin-top: 3;
        flex-direction: row;
        align-items: center;
    }

    .title-more {
        font-size: 28;
        color: #555;
    }

    .title-more-icon {
        font-family: iconfont;
        font-size: 40;
        font-weight: 600;
        color: #555;
    }

    .news-list {
        margin-top: 30;
        flex-direction: row;
    }

    .news-wrapper {
        margin-right: 20;
    }

    .news-image {
        width: 440;
        height: 280;
    }

    .news-des {
        lines: 1;
        position: absolute;
        top: 200;
        padding: 20;
        width: 440;
        height: 280;
        font-size: 32;
        color: #fff;
    }

    .soft-wrapper {
        padding: 0 20;
        margin-right: 20;
    }

    .soft-image {
        width: 224;
        height: 135;
    }

    .soft-des {
        margin-top: 20;
        lines: 1;
        width: 224;
        text-overflow: ellipsis;
    }

    .seller-wrapper {
        position: relative;
        margin-right: 20;
        padding-top: 48;
        align-items: center;
    }

    .seller-title {
        font-size: 36;
        color: #353535;
    }

    .seller-des {
        margin: 20 0;
        font-size: 24;
        color: #999;
    }

    .seller-image {
        width: 272;
        height: 200;
    }

    .seller-grandient {
        position: absolute;
        top: 200;
        width: 272;
        height: 160;
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    }

    .hot-case {
        margin-top: 80;
    }

    .hot-case-title {
        flex-direction: row;
        align-items: center;
        margin: 0 20 30;
    }

    .hot-designer {
        margin-top: 80;
        padding: 0 20;
    }

    .designer-wrapper {
        flex-direction: row;
        margin-top: 40;
    }

    .designer-card {
        width: 320;
        padding: 40 20;
        margin-right: 20;
        align-items: center;
        border-top-style: solid;
        border-top-color: #eee;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #eee;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #eee;
        border-right-width: 2;
        border-radius: 8;
    }

    .designer-avatar {
        width: 168;
        height: 168;
        border-radius: 84;
    }

    .designer-name {
        margin-top: 28;
        font-size: 32;
        color: #212121;
    }

    .designer-title {
        margin: 12 0;
        font-size: 24;
        color: #555;
    }

    .designer-btn {
        width: 116;
        height: 56;
        line-height: 56;
        color: #e60012;
        text-align: center;
        border-top-style: solid;
        border-top-color: #e60012;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #e60012;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #e60012;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #e60012;
        border-right-width: 2;
        border-radius: 4;
    }

    .header {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .headerSearch {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .headerDetails {
        height: 200px;
        width: 750px;
        background-color: red;
    }

    .centerFont {
        color: #ffffff;
        font-size: 30px;
        margin-right: 120px;
    }

    .icon {
        /*color: #ffffff;*/
    }

    .content-items {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        width: 750px;
        height: 200px;
        padding-left: 40px;
        padding-right: 34px;
        border-width: 1px;
        border-style: solid;
        border-color: #cccccc;
    }

    .items-left {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 100px;
    }

    /*.img-left {*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*margin-bottom: 20px;*/
    /*border-radius: 100%;*/
    /*}*/

    .right-item {
        /*flex-direction: row;*/
        /*align-items: center;*/
        /*align-content: center;*/
        /*justify-content: space-between;*/
        width: 600px;
    }

    .item-text {
        /*margin-bottom: 10px;*/
        font-size: 28px;
        color: #666666;
    }

    .text-title {
        font-size: 32px;
        font-weight: 600;
        color: #333333;
    }

    .text-width {
        width: 536px;
    }

    .icons {
        font-family: iconfont;
        font-size: 42;
        color: #ffffff;
    }

    .input-group {
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 600px;
        height: 100px;
        background-color: #E60012;
        position: relative;
        /*msrgin-right:100px;*/
    }

    .input {
        justify-content: center;
        align-items: center;
        width: 690px;
        height: 68px;
        border-radius: 8px;
        text-align: center;
        background-color: #ffffff;
    }

    .input-icon {
        color: #888888;
        position: absolute;
        top: 34px;
        left: 48px;
    }
</style>
