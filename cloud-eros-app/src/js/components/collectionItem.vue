<template>
    <div>
        <div class="estate-item" v-if="item.sort==='HOUSE'" @click="goTo('estate.details',{id:item.targetId})" :key="1">
            <div class="estate-item-wrapper">
                <div class="col-title">
                    <text class="col-brand">楼盘</text>
                    <text class="col-time">{{item.createTime}}</text>
                    <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
                </div>
                <image class="estate-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId"></image>
                <div class="estate-des">
                    <text class="estate-name">{{item.profile.title}}</text>
                    <text class="number">{{item.profile.subtitle || ''}}</text>
                </div>
            </div>
        </div>
        <div class="estate-item" v-if="item.sort==='CASE'" @click="goTo('design.case',{id:item.targetId})" :key="2">
            <div class="estate-item-wrapper">
                <div class="col-title">
                    <text class="col-brand">案例</text>
                    <text class="col-time">{{item.createTime}}</text>
                    <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
                </div>
                <image class="estate-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId"></image>
                <div class="estate-des">
                    <text class="estate-name">{{item.profile.title}}</text>
                    <text class="number">{{item.profile.subtitle || ''}}</text>
                    <div class="star-box">
                        <text class="icon2 star" v-for="(o, i) in 4" :key="i">&#xe607;</text>
                    </div>
                </div>
            </div>
            <div class="case-item-info">
                <div class="info-wrapper">
                    <text class="icon">&#xe656;</text>
                    <text class="info-text">{{item.profile.location}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe600;</text>
                    <text class="info-text">{{item.profile.ups}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe6d9;</text>
                    <text class="info-text">{{item.profile.saves}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe60d;</text>
                    <text class="info-text">{{item.profile.comments}}</text>
                </div>
            </div>
        </div>
        <div class="estate-item" v-if="item.sort==='FILE'" @click="goTo('design.case',{id:item.targetId})" :key="2">
            <div class="estate-item-wrapper">
                <div class="col-title">
                    <text class="col-brand">案例图片</text>
                    <text class="col-time">{{item.createTime}}</text>
                    <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
                </div>
                <image class="estate-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId"></image>
                <div class="estate-des">
                    <!--<text class="estate-name">{{item.profile.title}}</text>-->
                    <!--<text class="number">{{item.profile.subtitle || ''}}</text>-->
                    <!--<div class="star-box">-->
                        <!--<text class="icon2 star" v-for="(o, i) in 4" :key="i">&#xe607;</text>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="case-item-info">
                <div class="info-wrapper">
                    <text class="icon">&#xe656;</text>
                    <text class="info-text">{{item.profile.location}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe600;</text>
                    <text class="info-text">{{item.profile.ups}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe6d9;</text>
                    <text class="info-text">{{item.profile.saves}}</text>
                </div>
                <div class="info-wrapper">
                    <text class="icon">&#xe60d;</text>
                    <text class="info-text">{{item.profile.comments}}</text>
                </div>
            </div>
        </div>
        <div class="store-item" v-if="item.sort==='STORE'"  :key="3">
            <div class="store-title">
                <text class="store-building">门店</text>
                <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
            </div>
            <image class="store-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId" @click="goTo('store.details',{id:item.id})"></image>
            <div class="store-des">
                <div class="store-info">
                    <text class="store-text">{{item.profile.title}}</text>
                </div>
                <text class="store-name">{{item.profile.subtitle}}</text>
            </div>
            <div class="store-handdle">
                <text class="btn store-phone" @click="$coms.call('4006578320', false)">电话咨询</text>
                <text class="btn store-date" @click="goTo('order.store',{id:item.id,name:item.name})">预约</text>
            </div>
        </div>
        <div class="col-item" v-if="item.sort==='ADVERTORIAL'" @click="goTo('home.newsDetails',{id:item.targetId})" :key="4">
            <div class="col-title">
                <text class="col-brand">软装品牌</text>
                <text class="col-time">{{item.createTime}}</text>
                <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
            </div>
            <image class="estate-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId"></image>
            <div class="estate-des">
                <text class="estate-name">{{item.profile.title}}</text>
                <text class="number">{{item.profile.subtitle || ''}}</text>
            </div>
        </div>
        <div class="store-item" v-if="item.sort==='WORKSITE'" @click="goTo('con.details',{id:item.targetId})" :key="5">
            <div class="store-title">
                <text class="store-building">工地</text>
                <text class="col-cancel" @click="deleteSaved(index)">取消收藏</text>
            </div>
            <image class="store-cover" :src="`${getImageUrl(item.profile.businessId)}&level=4`" v-if="item.profile.businessId"></image>
            <div class="store-des">
                <div class="store-info">
                    <text class="store-text">{{item.profile.title}}</text>
                </div>
                <div class="local-host">
                    <text class="store-map">&#xe656;</text>
                    <text class="store-name">{{item.profile.subtitle}}</text>
                </div>
            </div>
            <div class="store-handdle">
                <text class="btn store-phone" @click="$coms.call('4006578320', false)">电话咨询</text>
                <text class="btn store-date" @click="goTo('con.details',{id:item.targetId})">预约</text>
            </div>
        </div>
    </div>
</template>

<script>
    import { deleteSave } from '../service/userApi'
    import mixins from '../common/mixins'
    import storeItemUp from './storeItemUp'

export default {
        name: 'upItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number
            },
            detailsUp: {
                type: Array
            }
        },
        mixins: [mixins],
        components: { storeItemUp },
        methods: {
            async deleteSaved (index) {
                const result = await deleteSave(this.item.sort, this.item.targetId)
                if (result.type === 'success') {
                    this.toast('取消收藏成功')
                    this.$emit('deleteSaves', index)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .estate-item {
        width: 710;
        margin: 0 20;
        border-bottom-color: #f2f2f2;
        border-bottom-style: solid;
        border-bottom-width: 2;
    }

    .case-item-info {
        width: 750;
        padding: 20;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .info-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .icon {
        font-family: iconfont;
        font-size: 32;
        color: #999;
    }

    .icon2 {
        font-family: iconfont2;
        font-size: 32;
        color: #999;
    }

    .info-text {
        padding-left: 10;
        font-size: 24;
        color: #555;
    }

    .estate-item-wrapper {
        position: relative;
        border-top-left-radius: 4;
        border-top-right-radius: 4;
    }

    .estate-cover {
        width: 710;
        height: 380;
    }

    .estate-des {
        justify-content: space-between;
        position: absolute;
        left: 20;
        bottom: 20;
        height: 100;
    }

    .estate-info {
        flex-direction: row;
    }

    .estate-name {
        font-size: 36;
        /*color: #fff;*/
        color: #fff;
    }

    .text {
        font-size: 30;
        color: #fff;
    }

    .number {
        font-size: 30;
        color: #ffffff;
    }

    .estate-address {
        lines: 1;
        font-family: iconfont;
        text-overflow: ellipsis;
        padding: 24 20;
        font-size: 28;
        color: #757575;
    }

    .col-item {
        padding: 28 20;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
    }

    .col-title {
        padding: 28 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .col-brand {
        font-size: 32;
        font-weight: 700;
        color: #000;
    }

    .col-time {
        font-size: 24;
        color: #999;
    }

    .col-cancel {
        width: 144;
        height: 60;
        line-height: 60;
        font-size: 24;
        text-align: center;
        color: #353535;
        background-color: #f5f5f5;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #dbd6d6;
        border-left-style: solid;
        border-left-width: 2;
        border-right-color: #dbd6d6;
        border-right-style: solid;
        border-right-width: 2;
        border-radius: 8;
    }

    .img-wrapper {
        position: absolute;
        top: 144;
        width: 710;
        height: 376;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6));
    }

    .col-cover {
        width: 710;
        height: 376;
    }

    .focus-item {
        padding: 28 20;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
    }

    .focus-title {
        padding: 28 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .focus-brand-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .icon {
        font-family: iconfont;
        font-size: 48;
        color: #999;
    }

    .focus-brand {
        font-size: 32;
        font-weight: 700;
        color: #000;
    }

    .focus-time {
        font-size: 24;
        color: #999;
    }

    .focus-cancel {
        width: 144;
        height: 60;
        line-height: 60;
        font-size: 24;
        text-align: center;
        color: #353535;
        background-color: #f5f5f5;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #dbd6d6;
        border-left-style: solid;
        border-left-width: 2;
        border-right-color: #dbd6d6;
        border-right-style: solid;
        border-right-width: 2;
        border-radius: 8;
    }

    .focus-designer {
        flex-direction: row;
        margin-bottom: 40;
    }

    .designer-avatar {
        width: 92;
        height: 92;
        margin-right: 28;
        border-radius: 46;
    }

    .designer-wrapper {
        height: 92;
        justify-content: space-between;
    }

    .designer-name {
        font-size: 32;
        color: #353535;
    }

    .title-wrapper {
        width: 580;
        flex-direction: row;
        justify-content: space-between;
    }

    .follower-wrapper {
        flex-direction: row;
    }

    .title {
        font-size: 24;
        color: #555;
    }

    .follower-strong {
        font-size: 24;
        color: #e60012;
    }

    .store-item {
        width: 710;
        margin: 0 20 20;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
    }

    .store-title {
        height: 86;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .store-building {
        font-size: 32;
        color: #212121;
    }

    .store-map {
        font-family: iconfont;
        font-size: 24;
        color: #FFFFFF;
        flex-direction: row;
        flex-wrap: wrap;
        /*width:650px;*/
    }

    .store-cover {
        width: 710;
        height: 376;
    }

    .store-des {
        position: absolute;
        left: 0;
        bottom: 140;
        width: 710;
        padding: 0 34;
    }

    .local-host {
        flex-direction: row;
        width: 710;
    }

    .store-info {
        flex-direction: row;
    }

    .store-text {
        flex-direction: row;
        font-family: iconfont;
        font-size: 28;
        color: #FFFFFF;
    }

    .store-name {
        font-size: 24;
        color: #fff;
        width: 650;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .store-handdle {
        padding: 20 0;
        flex-direction: row;
        justify-content: space-between;
    }

    .btn {
        width: 342;
        height: 72;
        line-height: 72;
        font-size: 28;
        text-align: center;
        background-color: #e60012;
        border-top-color: #e60012;
        border-top-style: solid;
        border-top-width: 2;
        border-right-color: #e60012;
        border-right-style: solid;
        border-right-width: 2;
        border-bottom-color: #e60012;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #e60012;
        border-left-style: solid;
        border-left-width: 2;
        border-radius: 6;
    }

    .store-phone {
        color: #e60012;
        background-color: #fff;
    }

    .store-date {
        color: #fff;
        background-color: #e60012;
    }

    .col-cancel {
        width: 144;
        height: 60;
        line-height: 60;
        font-size: 24;
        text-align: center;
        color: #353535;
        background-color: #f5f5f5;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
        border-left-color: #dbd6d6;
        border-left-style: solid;
        border-left-width: 2;
        border-right-color: #dbd6d6;
        border-right-style: solid;
        border-right-width: 2;
        border-radius: 8;
    }

    .star-box {
        flex-direction: row;
        width: 400px;
    }

    .star {
        color: #e60012;
        font-size: 30px;
    }

    .avatarImg {
        width: 46px;
        height: 46px;
        border-radius: 50%;
    }
</style>
