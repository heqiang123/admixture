<template>
    <div>
        <list class="listBack" :style="{height:pageHeight}">
            <cell v-for="(item,index) in detailList" :key="index">
                <div class="wrapper">
                    <div class="title">
                        <text class="house">{{item.houseName}}</text>
                        <text class="more" @click="goTo('personInfo.add',{items:item})">查看详情</text>
                    </div>
                    <div class="addr">
                        <text class="text">{{item.houseLocation}}</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
    import mixins from '../../common/mixins'
    import { getQueryOrder } from '../../service/homeAtj.Api'

    export default ({
        data () {
            return {
                list: [1],
                userInfo: {},
                // 生成房屋信息的数组
                detailList: []
            }
        },
        mixins: [mixins],
        methods: {
            async getQueryOrderNeed (id) {
                const result = await getQueryOrder(id, 'GET')
                if (result.length) {
                    this.detailList = result
                }
            },
            jumpToWeb (item) {
                this.$router.toWebView({
                    url: 'bmlocal://assets/web/qrcode.html',
                    title: '生成二维码',
                    navshow: true
                })
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.userInfo = params.info
            await this.getQueryOrderNeed(this.userInfo.id)
        },
        mounted () {
            this.$navigator.setLeftItem({}, () => {
                this.goBack('user.index')
            })
        }
    })
</script>
<style lang="scss" scoped>

    .listBack {
        background-color: #EEEEEE;
    }

    .wrapper {
        width: 750px;
        height: 140px;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        padding-left: 40px;
        padding-right: 40px;
        background-color: #fff;
    }

    .title {
        width: 670px;
        height: 60px;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
    }

    .house {
        font-size: 28px;
        color: #999999;
    }

    .more{
        font-size: 28px;
        color: #6AC8D4;
    }

    .addr {
        flex-direction: row;
        align-items: center;
    }

    .text {
        width: 670px;
        font-size: 26px;
        word-break: break-all;
    }

</style>
