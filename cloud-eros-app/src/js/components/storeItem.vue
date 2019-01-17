<template>
    <div class="store-item" @click="goTo('store.details',{id:item.id})">
        <div class="store-title">
            <text class="store-building">{{item.name}}</text>
            <text class="store-map" @click="goTo('others.map',{marker:{position:[item.longitude,item.latitude],title:item.name}})">&#xe656; 查看地图</text>
        </div>
        <image class="store-cover" :src="`${item.coverUrl}?x-oss-process=style/w800_Q85`"></image>
        <div class="store-des">
            <div class="store-info">
                <text class="store-text" v-for="(o,i) of Number(item.starLevel)" :key="i">&#xe60c;</text>
            </div>
            <text class="store-name">设计师{{item.designerCount}} | 案例{{item.caseCount}}</text>
        </div>
        <div class="store-handdle">
            <text class="btn store-phone" @click="$coms.call(homePhoneQr, false)">电话咨询</text>
            <text class="btn store-date" @click="goTo('order.store',{id:item.id,name:item.name})">预约</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'
    import { serverPhone } from '../service/baseApi'
    export default {
        name: 'storeItem',
        mixins: [mixins],
        props: {
            item: {
                type: Object
            },
            homePhone: {
                type: Object
            }
        },
        data () {
            return {
                homePhoneQr: ''
            }
        },
        created () {
            this.getPhoneNum()
        },
        methods: {
            async getPhoneNum () {
                const result = await serverPhone()
                if (result && result.storePhone) {
                    this.homePhoneQr = result.storePhone.replace(/-/g, '')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .store-item {
        width: 710;
        margin: 0 20 20;
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
        color: #555;
    }

    .store-cover {
        width: 710;
        height: 376;
    }

    .store-des {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 0;
        bottom: 140;
        width: 710;
        padding: 0 34;
    }

    .store-info {
        flex-direction: row;
    }

    .store-text {
        flex-direction: row;
        font-family: iconfont;
        font-size: 28;
        color: #e60012;
    }

    .store-name {
        font-size: 24;
        text-align: center;
        color: #fff;
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
</style>
