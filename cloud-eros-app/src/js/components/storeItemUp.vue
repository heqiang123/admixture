<template>
    <div class="store-item" @click="goTo('store.details',{id:item.id})">
        <div class="store-title">
            <text class="store-building">门店</text>
            <text class="col-cancel" @click="deleteUps(index)">取消点赞</text>
            <!--<text class="store-map" @click="goTo('others.map')">&#xe656; 查看地图</text>-->
        </div>
        <image class="store-cover" :src="imageUrl"></image>
        <div class="store-des">
            <div class="store-info">
                <!--<text class="store-text" v-for="(o,i) of item.profile.stars" :key="i">&#xe60c;</text>-->
                <text class="store-text">{{item.profile.title}}</text>
            </div>
            <text class="store-name">{{item.profile.subtitle}}</text>
        </div>
        <div class="store-handdle">
            <text class="btn store-phone" @click="$coms.call('4006578320', false)">电话咨询</text>
            <text class="btn store-date" @click="goTo('store.details',{id:item.targetId})">预约</text>
        </div>
    </div>
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'storeItem',
        mixins: [mixins],
        props: {
            item: {
                type: Object
            }
        },
        data () {
            return {
                imageUrl: ''
            }
        },
        methods: {
            deleteUps (index) {
                this.$emit('delete', index)
            },
            async reloadList () {
                if (this.item.profile) {
                    if (this.item.profile.businessId) {
                        this.imageUrl = await this.getImageUrl(this.item.profile.businessId)
                    }
                }
            }
        },
        mounted () {
            this.reloadList()
        }
    }
</script>

<style lang="scss" scoped>
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
        color: #FFFFFF;
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
</style>
