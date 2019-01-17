<template>
    <div class="centent">
        <titleBar
                type="DESIGN"
                :ID="id"
                :isFollow="deginerDetails.follow"
                :followCount="deginerDetails.follows"
                :upCount="deginerDetails.ups"
                :shareTitleName="deginerDetails.name"
                :shareContentName="personalIntroduction"
                :shareId="deginerDetails.id"
                :sharePicture="picture"
                address="designer-nobusdetail"
                @clickFollow="clickFollow"
        ></titleBar>
        <scroller class="content" :style="{height:pageHeight}">
            <div class="main">
                <image :src="`${deginerDetails.personalPic}?x-oss-process=image/resize,w_700`" resize="cover" class="image"></image>
                <div class="personProuce">
                    <div>
                        <image :src="`${deginerDetails.headUrl}?x-oss-process=image/resize,w_200/crop,x_0,y_0,w_200,h_200`" resize="cover" class="person"></image>
                    </div>
                    <div class="personProuceInfor">
                        <div class="personData">
                            <text class="personDataText">{{deginerDetails.name?deginerDetails.name:''}}</text>
                            <div class="iconList">
                                <text class="icon" v-for="(item, index) in (deginerDetails.starLevel?deginerDetails.starLevel:0)" :key="index">&#xe60c;</text>
                            </div>
                        </div>
                        <div class="personPro">
                            <text class="personProText">{{deginerDetails.busiContentStoreName?deginerDetails.busiContentStoreName:''}}| {{deginerDetails.jobLength?deginerDetails.jobLength:''}}年工作经验</text>
                        </div>
                        <div class="comment-tag-list">
                            <div class="personBottomBox" v-for="(item,index) in tags" :key="index" v-if="index<3">
                                <text class="designer-label">{{item.name}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainText">
                <div class="personDetail">
                    <text class="personDetailText">基本信息</text>
                </div>
                <div class="detailProduce">
                    <div class="detailProduceSider">
                        <text class="detailTitle">案例</text>
                        <text>{{deginerDetails.caseNum?deginerDetails.caseNum:''}}套</text>
                    </div>
                    <div class="detailProduceCenter">
                        <text class="detailTitle">级别</text>
                        <text>{{deginerDetails.level?deginerDetails.level:'暂无数据'}}</text>
                    </div>
                    <div class="detailProduceSider">
                        <text class="detailTitle">设计费</text>
                        <text>{{price?price:'待询'}}</text>
                    </div>
                </div>
                <div class="personalPro">
                    <tetx class="personDetailText">个人简介</tetx>
                    <div class="personContent">
                        <text class="personContentText">{{personalIntroduction}}</text>
                    </div>
                </div>
                <div class="personalPro">
                    <tetx class="personDetailText">所获荣誉</tetx>
                    <div class="personContent">
                        <text class="personContentText">{{honor}}</text>
                    </div>
                </div>
                <div class="personalPro">
                    <tetx class="personDetailText">设计理念</tetx>
                    <div class="personContent">
                        <text class="personContentText">{{designIdea}}</text>
                    </div>
                </div>
            </div>
            <div class="case">
                <div class="title-zone">
                    <div class="title-wrapper">
                        <text class="title-prefix"></text>
                        <text class="title-content">TA的设计案例</text>
                    </div>
                </div>
                <div class="case-case">
                    <image class="case-img" @click="goTo('design.case',{id:item.id})" v-for="(item,index) of caseList"
                           :src="`${item.homepageId}?x-oss-process=image/resize,w_200`"></image>
                </div>
                <wxc-button v-if="deginerDetails&&deginerDetails.caseNum>6" text="显示更多"
                            @wxcButtonClicked="goTo('case.list',{id:id,type:'2',designerName:deginerDetails.name,caseList:caseList})"
                            :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 20,'margin-left':20, 'margin-bottom': 40, height: 82, width: 710}"
                            :textStyle="{'font-size': 28, color: '#757575'}"
                ></wxc-button>
            </div>
            <comment-zone :details="detailsDeginer" type='4' :id="deginerDetails.id" :urlHomePagesImg="getImageUrl(deginerDetails.headUrl)"></comment-zone>
        </scroller>
    </div>
</template>
<script>
    import titleBar from '../../components/titleBar'
    import CommentZone from '../../components/commentZone'
    import { WxcButton } from 'weex-ui'
    import mixins from '../../common/mixins'
    import { getDesignerDetail, BusiContentCase } from '../../service/caseApi'

    export default {
        data () {
            return {
                id: '',
                deginerDetails: {},
                infoDesinger: '',
                caseList: [],
                tags: [],
                picture: '',
                price: '',
                personalIntroduction: '',
                honor: '',
                designIdea: '',
                // 设计费用
                designCost: 'BQ000001'
            }
        },
        mixins: [mixins],
        components: { titleBar, WxcButton, CommentZone },
        watch: {
            id (val) {
                this.id = val
            },
            tags (val) {
                this.tags = val
            }
        },
        methods: {
            async getGeragin (id) {
                const result = await getDesignerDetail(id, 'GET')
                this.deginerDetails = result
                console.log(result.personalPic)
                console.log(result.personalPic)
                console.log(result.personalPic)
                console.log(result.personalPic)
                // console.log('设计师的名字', JSON.stringify(this.deginerDetails))
                this.personalIntroduction = this.delHtmlTags(result.personalIntroduction)
                this.honor = this.delHtmlTags(result.honor)
                this.designIdea = this.delHtmlTags(result.designIdea)
                this.deginerDetails = result
                if (this.deginerDetails && this.deginerDetails.tags) {
                    for (let index = 0; index < this.deginerDetails.tags.length; index++) {
                        if (this.deginerDetails.tags[index].parent.code !== this.designCost) {
                            this.tags.push(this.deginerDetails.tags[index])
                        } else {
                            this.price = this.deginerDetails.tags[index].name
                        }
                    }
                }
            },
            async getCaseListById (id) {
                const queryParamList = [
                    {
                        'field': 'designerId',
                        'type': 'string',
                        'logic': 'like',
                        'value': id,
                        'items': []
                    }
                ]
                const result = await BusiContentCase({
                    export: false,
                    orderBy: 'id desc',
                    page: 1,
                    pageSize: 6,
                    queryParamList: queryParamList
                })
                this.caseList = result.content
            },
            clickFollow (val) {
                this.deginerDetails.follow = val
                if (val === true) {
                    this.deginerDetails.follows += 1
                }
            }
        },
        async created () {
            this.showLoading('加载中')
            const params = await this.$router.getParams()
            this.id = params.id
            await this.getGeragin(this.id)
            await this.getCaseListById(this.id)
            this.picture = this.getImageUrl(this.deginerDetails.headId)
            // this.$storage.deleteSync('urlHomeImg')
            this.$storage.setSync('urlHomeImg', this.picture)
            this.hideLoading()
        }
    }

</script>
<style>
    .centent {
        width: 750px;
        background-color: #FFFFFF;
    }

    .main {
        width: 750px;
        align-items: center;
        background-color: #FFFFFF;
    }

    .image {
        width: 750px;
        height: 450px;
        position: absolute;
        top: 0;
        left: 0
    }

    .personProuce {
        width: 650px;
        padding-top: 20px;
        padding-bottom: 20px;
        flex-direction: row;
        margin-top: 310px;
        background-color: #FFFFFF;
        border-radius: 5px;
        border-width: 1px;
        border-color: #FFFFFF;
        border-style: solid;
    }

    .personProuceInfor {
        justify-content: center;
        flex-wrap: wrap;
        margin-left: 30px;
    }

    .personData {
        flex-direction: row;
    }

    .personDataText {
        font-size: 44px;
        color: #000000
    }

    .personPro {
        margin-top: 16px;
        width: 750px;
    }

    .personProText {
        color: #353535;
    }

    .personBottom {
        border-right-width: 1px;
        border-right-color: #f34e19;
        border-right-style: solid;
    }

    .personBottomBox {
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 8px;
        padding-right: 8px;
        background-color: #353535;
        border-radius: 5px;
        border-width: 1px;
        border-color: #353535;
        border-style: solid;
        margin-right: 4px;
    }

    .iconList {
        flex-direction: row;
        margin-left: 20px;
    }

    .person {
        width: 160px;
        height: 160px;
        margin-left: 20px;
    }

    .icon {
        line-height: 50;
        font-family: iconfont;
        font-size: 36;
        font-weight: 600;
        color: red;
    }

    .designer-label {
        color: rgb(255, 255, 255);
        opacity: 0.8;
        font-size: 24px
    }

    .comment-tag-list {
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 0;
        margin-top: 18px
    }

    .personDetail {
        margin-top: 40px;
        /*margin-left:30px;*/
    }

    .personDetailText {
        color: #222222
    }

    .detailProduce {
        flex-direction: row;
        margin-top: 20px
    }

    .detailProduceSider {
        width: 200px;
        align-items: center;
    }

    .detailProduceCenter {
        flex: 1;
        border-left-width: 3px;
        border-left-color: rgba(0, 0, 0, 0.1);
        border-left-style: solid;
        border-right-width: 3px;
        border-right-color: rgba(0, 0, 0, 0.1);
        border-right-style: solid;

        align-items: center;
    }

    .detailTitle {
        color: #999999;
        margin-bottom: 6px;
    }

    .personalPro {
        margin-top: 40px;
        width: 710px;
    }

    .personContent {
        margin-top: 20px;
    }

    .zhankai {
        flex-direction: row;
        justify-content: flex-end;
        width: 670;
        margin-top: -30;
    }

    .zhankaiText {
        color: #E60012;
        font-size: 26px
    }

    .personContentText {
        color: #555555;
        flex-direction: row;
    }

    .mainText {
        padding-left: 20px;
        padding-right: 20px;
        background-color: #ffffff;
    }

    .icon {
        font-family: iconfont;
        font-size: 32;
        color: #E60012;
    }

    .case {
        width: 750px;
        padding-top: 40px;
        background-color: #ffffff;
    }

    .title-zone {
        margin-bottom: 40;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .title-prefix {
        width: 12;
        height: 40;
        margin-right: 20;
        background-color: #353535;
    }

    .title-content {
        font-size: 32;
        color: #212121;
    }

    .title-extra {
        font-family: iconfont;
        font-size: 28;
        color: #999;
    }

    .building-case {
        height: 304;
        flex-direction: row;
    }

    .building-wrapper {
        position: relative;
        width: 552;
        height: 304;
        margin-right: 12;
    }

    .building-img {
        width: 552;
        height: 304;
    }

    .building-des {
        position: absolute;
        bottom: 0;
        width: 552;
        padding: 20;
        font-size: 32;
        color: #fff;
        background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .5));
    }

    .case-case {
        flex-direction: row;
        flex-wrap: wrap;
        width: 730px;
        padding-left: 15px;
        padding-right: 5px;
    }

    .case-img {
        width: 230;
        height: 230;
        margin: 0 5 5 0;
    }
</style>
