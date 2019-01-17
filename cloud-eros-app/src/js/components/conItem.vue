<template>
    <div class="con-item" @click="goTo('con.details',{id:item.id})">
        <div class="con-title">
            <text class="con-building">{{item.housesName || ''}} |{{houseType()}}| {{item.siteArea || '0'}}㎡</text>
            <text class="con-map" @click="goTo('others.map',{marker:{position:[item.longitude,item.latitude],title:item.name}})">&#xe656; 查看地图</text>
        </div>
        <image class="con-cover" :src="`${getImageUrl(item.coverUrl)}&level=4`"></image>
        <div class="img-wrapper">
        </div>
        <div class="con-des">
            <text class="con-name">{{contentInfo()}}</text>
            <text class="con-info">&#xe656; {{ item.worksiteAddress || ''}}</text>
        </div>
        <div class="con-handdle">
            <text class="btn con-phone" @click="$coms.call(homePhoneQr, false)">电话咨询</text>
            <text class="btn con-date" @click="goTo('order.con',{id:item.id,index:0})">预约</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'
    import { serverPhone } from '../service/baseApi'
    export default {
        name: 'conItem',
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
        methods: {
            async getPhoneNum () {
                const result = await serverPhone()
                if (result && result.storePhone) {
                    this.homePhoneQr = result.storePhone.replace(/-/g, '')
                }
            },
            contentInfo () {
                if (this.item.constructionStage === '0') {
                    return '开工准备'
                }
                if (this.item.constructionStage === '1') {
                    return '水电阶段'
                }
                if (this.item.constructionStage === '2') {
                    return '泥木阶段'
                }
                if (this.item.constructionStage === '3') {
                    return '油漆安装阶段'
                }
            },
            houseType () {
                if (this.item.houseType === '0') {
                    return '别墅'
                }
                if (this.item.houseType === '1') {
                    return '复式'
                }
                if (this.item.houseType === '2') {
                    return '大平层'
                }
                if (this.item.houseType === '3') {
                    return '叠加别墅'
                }
                return ''
            }
        },
        // created () {
        //     console.log('picture not show', JSON.stringify(this.homePhone))
        // }
        created () {
            this.getPhoneNum()
        }
    }
</script>

<style lang="scss" scoped>
    .con-item {
        width: 710;
        margin: 0 20 20;
        border-top-color: #dbd6d6;
        border-top-style: solid;
        border-top-width: 2;
        border-bottom-color: #dbd6d6;
        border-bottom-style: solid;
        border-bottom-width: 2;
    }

    .con-title {
        height: 86;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .con-building {
        font-size: 32;
        color: #212121;
    }

    .con-map {
        font-family: iconfont;
        font-size: 24;
        color: #555;
    }

    .img-wrapper {
        position: absolute;
        top: 86;
        width: 710;
        height: 376;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6));
    }

    .con-cover {
        width: 710;
        height: 376;
    }

    .con-des {
        justify-content: space-between;
        position: absolute;
        left: 20;
        bottom: 130;
        height: 100;
    }

    .con-info {
        flex-direction: row;
        font-family: iconfont;
        font-size: 28;
        color: #fff;
    }

    .con-name {
        font-size: 36;
        color: #fff;
    }

    .con-handdle {
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

    .con-phone {
        color: #e60012;
        background-color: #fff;
    }

    .con-date {
        color: #fff;
        background-color: #e60012;
    }
</style>
