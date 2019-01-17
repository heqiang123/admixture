<template>
        <div>
            <status-bar></status-bar>
            <div class="my-home">
                <text class="my-home-text">我的家</text>
            </div>
            <list :style="{height:`${pageHeight-130}px`}">
                <cell class="h40"></cell>
                <cell class="content-box" v-for="(item,index) of needInfo" :key="index">
                    <div class="project-box">
                        <div class="img-box">
                            <image class="bg-image" resize="cover" :src="item.houseImag"></image>
                            <span class="construction-stage"><text class="construction-stage-text">{{item.projectStage}}</text></span>
                            <image v-if="item.finishedStatus" class="abnormal-completion"  resize="cover" src="bmlocal://assets/images/Group41@2x.png"></image>
                        </div>
                        <div class="address-box">
                            <h3><text class="address-box-top">{{item.houseName}}</text></h3>
                            <p class="address-box-bottom"><text class="addressBox-bottom-text">{{item.houseAddr}}</text></p>
                        </div>
                        <div class="team-box">
                            <scroller scroll-direction="horizontal" class="team-list" :style="{height: 124}">
                               <div v-for="(itemList,index) of item.teamList" :key="index">
                                   <div class="designer-big" v-if="itemList.serviceStop==='服务正常'" @click="goTo('newAtJia.index',{houseId:item.houseId,serviceId:itemList.serviceId,urls:item.houseImag,indexTeam:index})">
                                       <div class="designer">
                                           <image class="designer-img" resize="cover" :src="itemList.designerPhoto"></image>
                                           <span class="designer-team"><text class="designer-team-text">{{itemList.designer}}</text></span>
                                       </div>
                                   </div>
                                   <div class="designer-stop-big" v-else @click="goTo('newAtJia.index',{houseId:item.houseId,serviceId:itemList.serviceId,urls:item.houseImag,indexTeam:index})">
                                       <div class="designer-stop">
                                           <image class="designer-img" resize="cover" :src="itemList.designerPhoto"></image>
                                           <span class="stop-designer"><text class="stop-designer-text">{{itemList.designer}}</text></span>
                                       </div>
                                       <image class="img-stop" resize="cover" src="bmlocal://assets/images/Group15copy@2x.png"></image>
                                   </div>
                               </div>
                            </scroller>
                        </div>
                    </div>
                </cell>
            </list>
        </div>
</template>

<script>
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    import {
        myHomeData
    } from '../../service/homeAtj.Api'
    export default {
        name: 'myHome',
        components: { StatusBar },
        mixins: [mixins],
        data () {
            return {
                needInfo: []
            }
        },
        props: {
            myFlag: {
                type: Number
            }
        },
        watch: {
            myFlag () {
                this.init()
            }
        },
        created () {
            if (this.myFlag === 1) {
                this.init()
            }
        },
        methods: {
            async init () {
                if (this.userId) {
                    await this.getOrderById(this.userId)
                }
            },
            async getOrderById (id) {
                const result = await myHomeData(id)
                if (result.length) {
                    this.needInfo = result
                }
            }
        }
    }
</script>

<style scoped>
    .h40{
        height: 40;
    }
    .my-home{
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .my-home-text{
        font-size:36px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
    }
    .content-box{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
    }
    .project-box{
        width: 670px;
        height: 730px;
        /*margin-top: 40px;*/
        /*box-shadow:0px 8px 10px 0px rgba(0,0,0,0.2);*/
        border-radius:8px;
        background-color: #fff;
    }
    .img-box{
        width: 670px;
        height: 414px;
        /*box-shadow:0px 16px 20px 0px rgba(0,0,0,0.2);*/
        border-radius:16px;
        position: relative;
    }
    .bg-image{
        width: 670px;
        height: 414px;
        /*box-shadow:0px 16px 20px 0px rgba(0,0,0,0.2);*/
        border-radius:16px;
    }
    .construction-stage{
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 5px;
        padding-bottom: 5px;
        position: absolute;
        top:20px;
        right: 20px;
        background-color: #D1AA76;
        /*box-shadow:0px 16px 20px 0px rgba(0,0,0,0.2);*/
        border-radius:16px;
    }
    .construction-stage-text{
        color: #ffffff;
    }
    .abnormal-completion{
        width: 140px;
        height: 140px;
        position: absolute;
        bottom: 24px;
        right: 22px;
    }
    .address-box{
        height: 190px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .address-box-top{
        font-size:36px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
    }
    .address-box-bottom{
        margin-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
        justify-content: center;
        align-items: center;
    }
    .addressBox-bottom-text{
        text-align: center;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .team-box{
        height: 124px;
        background-color: rgba(245,245,245,1);
    }
    .team-list{
        flex-direction: row;
        padding-left: 50px;
        padding-right: 50px;
        height: 124px;
    }
    .designer{
        flex-direction: row;
        border-radius:36px;
        border-color: rgba(221,221,221,1);
        border-style: solid;
        border-width: 1px;
        align-items: center;
    }
    .designer-img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .designer-team{
        padding-left: 16px;
        padding-right: 34px;
    }
    .designer-team-text{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .designer-stop{
        flex-direction: row;
        border-radius:36px;
        border-color: rgba(221,221,221,1);
        border-style: solid;
        border-width: 1px;
        align-items: center;
        position: relative;
    }
    .stop-designer{
        padding-left: 16px;
        padding-right: 34px;
    }
    .stop-designer-text{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .img-stop{
            width: 100px;
            height: 64px;
        position: absolute;
        bottom:6px;
        right: 0px;
    }
    .designer-big{
        height: 124px;
        display: flex;
        align-items: center;
        margin-right: 66px;
        padding-top: 24px;
    }
    .designer-stop-big{
        padding-top: 24px;
        height: 124px;
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 66px;
        padding-right: 28px;
    }
</style>
