<template>
    <div>
        <status-bar></status-bar>
        <div class="headerDetails">
            <div class="header">
                <div class="left">
                    <text class="icons" @click="$router.back()">&#xe601;</text>
                </div>
                <div class="center">
                    <text class="centerFont">选择城市</text>
                </div>
                <div class="right">

                </div>
            </div>
            <div class="input-group">
                <input type="text" class="input" placeholder="市区" @change="onchange($event)" />
                <text class="icon input-icon">&#xe640;</text>
            </div>
        </div>
        <!--<div class="contentDetails">-->
        <list class="item-container">
            <cell class="cell" v-for="(item,index) in cityList" :key="index">
                <div class="outCell"
                     @click="chooseCity(item.name.substring(item.name.indexOf(','+1))==='市辖区'?item.name.substring(0,item.name.substring(item.name.indexOf(','))) : item.name.substring(item.name.indexOf(','+1)))">
                    <div class="cell">
                        <!--<text class="f30" style="color: #333333;padding-top: 28px;padding-bottom: 8px" v-if="isMCity(city)">{{city.mergerName}}</text>-->
                        <text class="f30" style="color: #333333;padding-top: 28px;padding-bottom: 8px">{{item.mergerName}}</text>
                    </div>
                </div>
            </cell>
            <loading class="loading  w1 aic df fdr aic jcc " @loading="onloading" :display="loadinging ? 'show' : 'hide'" v-if="cityList&&cityList.length">
                <loading-indicator class="indicator"></loading-indicator>
                <text class="c6 f26" v-if="loadinging"> {{loadtext}}....</text>
            </loading>
        </list>
    </div>
    <!--</div>-->
</template>
<script>
    import statusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    import { busiContentHouse } from '../../service/cityApi'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'

    export default {
        data () {
            return {
                cityList: [],
                page: 1,
                totalPage: 999,
                tags: [],
                loadinging: false,
                loadtext: '加载中',
                refreshing: false,
                isShowLoading: false,
                refreshIcon: 'icon-todown',
                refreshText: '下拉刷新...',
                loadingText: '加载更多数据...',
                searchValue: ''
            }
        },
        component: {
            statusBar, downLoading, refreshLoading
        },
        mixins: [mixins],
        methods: {
            async getCityHouse (name) {
                this.loadinging = true
                const result = await busiContentHouse({
                    'authCondition': 'string',
                    'export': false,
                    'orderBy': 'id asc',
                    'page': this.page,
                    'pageSize': 20,
                    'queryParamList': [
                        {
                            'field': 'name',
                            'items': [],
                            'logic': 'like',
                            'type': 'string',
                            'value': name || ''
                        }
                    ]
                })
                if (this.page > result.totalPage) {
                    this.loadinging = false
                    this.loadtext = '没有更多数据了'
                } else {
                    this.cityList = this.cityList.concat(result.content)
                }
                this.loadinging = false
                this.loadtext = '加载更多'
            },
            onchange ($event) {
                this.searchValue = $event.value
                this.cityList = []
                this.getCityHouse(this.searchValue)
            },
            onloading () {
                this.page++
                this.getCityHouse()
            },
            chooseCity (item) {
                this.goTo('personInfo.addDetails', { city: item })
            }
        },
        async created () {
            await this.getCityHouse()
        }

    }

</script>
<style lang="scss" scoped>
    @import "../../../assets/css/base.scss";

    .item-container {
        width: 750;
        background-color: #fff;
    }

    .home {
        width: 750px;
        background-color: #fff;
    }

    .minibar-left {
        flex-direction: row;
        /*margin-right: 40px;*/
    }

    .input-group {
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 750px;
        height: 100px;
        background-color: #E60012;
        position: relative;
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

        /*width:750;*/
    }

    .center {
        margin-left: 100;
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
        margin-top: 40px;
    }

    .centerFont {
        color: #ffffff;
        font-size: 30px;
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

    .cell {
        background-color: #FFFFFF;
        padding-left: 30px;
        padding-right: 30px;
    }

    .outCell {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #EEEEEE;
    }
</style>
