<template>
    <list :style="{height:`${pageHeight}`}">
            <cell class="list" v-for="(item,index) in quotationList" :key="index">
                <div class="wrap">
                    <div class="info" @click="goTo('quotation.index',{id:item.id,name:item.name})">
                        <text class="font-32">{{item.name}}</text>
                        <text class="icon arrow">&#xe60a;</text>
                    </div>
                    <div class="info" @click="goTo('quotation.index',{id:item.id,name:item.name})">
                        <text class="quotation font-28">报价单号：{{item.version}}</text>
                    </div>
                    <div class="info">
                        <text class="font-color font-28">设计师：{{item.designerName}}</text>
                        <div class="sure-btn" v-if="Number(item.status) === 4 && quotationEnter !== 2" @click="confirmList(item.id)">
                            <text class="color-fff font-26">待确认</text>
                        </div>
                        <div class="sure-btn-disable" v-if="Number(item.status) !== 4  && quotationEnter !== 2">
                            <text class="color-fff font-26">已确认</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell class="list-none" :style="{height: pageHeight}" v-if="state.isEmpty">
                <text>暂无数据</text>
            </cell>
        </list>
</template>

<script>
    import mixins from '../../common/mixins'
    import { getMaterialList, getMateriaListByContractId } from '../../service/meatirChangeApi'
    import { confirmOffer } from '../../service/homeApi'

    export default ({
        mixins: [mixins],
        data () {
            return {
                // 报价单的list
                quotationList: [],
                // 页面传过来的id
                serviceId: '',
                // 页面传过来的合同id
                quahetongId: '',
                // 哪个页面跳转过来的
                quotationEnter: '',
                state: {
                    isEmpty: false
                }
            }
        },
        methods: {
            // 获得我的报价单列表
            async getList (id, method) {
                const result = await getMaterialList(id, method)
                if (result.length) {
                    this.quotationList = result
                } else {
                    this.state.isEmpty = true
                }
            },
            async materiaListByContractId (id, method) {
                const result = await getMateriaListByContractId(id, method)
                if (result.length) {
                    this.quotationList = result
                } else {
                    this.state.isEmpty = true
                }
            },
            async confirmList (id) {
                if (id) {
                    await confirmOffer({ 'key': [id] })
                    this.toast('确认成功！')
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.quotationEnter = params.enter
            if (params.sid) {
                this.serviceId = params.sid
            } else {
                this.serviceId = params.id
            }
            if (this.quotationEnter === 2 && params.id) {
                this.quahetongId = params.id
                await this.materiaListByContractId(this.quahetongId, 'GET')
            } else {
                this.getList(this.serviceId, 'GET')
            }
        },
        mounted () {
            this.$navigator.setRightItem({
                text: '退货单',
                fontSize: '30',
                textColor: '#333333'
            }, () => {
                this.goTo('refund.details', { id: this.serviceId })
            })
        }
    })
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/base";

    .wrap {
        width: 750px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .list {
        width: 750px;
        height: 200px;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #7d7d7d;
        border-bottom-style: solid;
    }

    .list-none {
        align-items: center;
        justify-content: center;
        width: 750px;
    }

    .font-color {
        margin-top: 16px;
        color: #6287B2;
    }

    .quotation {
        margin-top: 20px;
        color: #7d7d7d;
    }

    .info{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .arrow {
        font-size: 40px;
        color: #353535;
    }

    .sure-btn{
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
        width: 120px;
        height: 50px;
        margin-right: 40px;
        background-color: #E60012;
        border-radius:4px;
    }

    .sure-btn-disable{
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
        width: 120px;
        height: 50px;
        margin-right: 40px;
        background-color: #CBCBCB;
        border-radius:4px;
    }
</style>
