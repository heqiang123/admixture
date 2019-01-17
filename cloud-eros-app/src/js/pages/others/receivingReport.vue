<template>
    <div>
        <list class="container" :style="{height:pageHeight-120}">
            <cell>
                <process-report-content :items="qualityReportList" :arrIndex="arrIndex" @getBig="getBig($event)"></process-report-content>
            </cell>
        </list>
        <div class="footer">
            <image class="head-portrait" :src="imageSrc"></image>
            <text class="label-text">质检员：</text>
            <text class="label-text">{{zhiJianName}}</text>
        </div>
        <wxc-lightbox
                ref="wxc-lightbox"
                height="500"
                width="750"
                overlay-opacity="1"
                :show="showImg"
                indicator-color="{'item-color': 'rgba(0, 0, 0, 1)','item-selected-color': '#000000','item-size': '0px'}"
                :image-list="imageList"
                @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
        </wxc-lightbox>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import processReportContent from '../../components/myatjia/processReportContent'
    import WxcLightbox from '../../components/wxcLightBox'
    import { getQuality, getImgUrls } from '../../service/baseApi'
    import { getFwAccount } from '../../service/homeAtj.Api'

    export default {
        name: 'receivingReport',
        mixins: [mixins],
        components: { processReportContent, WxcLightbox },
        data () {
            return {
                qualityInsperctorId: '',
                qualityReportList: [],
                // 页面传过来的id
                projectId: '',
                // 接收页面出啊过来的name
                zhiJianName: '',
                showImg: false,
                imageList: [],
                tanInfo: '',
                imgId: '',
                imgUrlArrayDou: [],
                newArr: ['I001', 'I003', 'I004', 'I005', 'I006'],
                arrIndex: ''
            }
        },
        computed: {
            imageSrc () {
                if (this.imgUrlArrayDou && this.imgUrlArrayDou.length) {
                    return this.getImageUrl(this.imgUrlArrayDou[0].thumUrl)
                } else {
                    return 'bmlocal://assets/images/building.jpeg'
                }
            }
        },
        methods: {
            async quality (id, type) {
                const array = [{
                    'checkStatus': '0',
                    'constructionPlanName': '1.开工准备',
                    'signStage': '1'
                }, {
                    'checkStatus': '0',
                    'constructionPlanName': '2.水电施工',
                    'signStage': '2'
                }, {
                    'checkStatus': '0',
                    'constructionPlanName': '3.泥木施工',
                    'signStage': '3'
                }, {
                    'checkStatus': '0',
                    'constructionPlanName': '4.油漆施工及成品安装',
                    'signStage': '4'
                }, {
                    'checkStatus': '0',
                    'constructionPlanName': '5.竣工',
                    'signStage': '5'
                }]
                const result = await getQuality(id, type)
                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < array.length; j++) {
                        if (Number(result[i].signStage) === Number(array[j].signStage)) {
                            array[j] = result[i]
                        }
                    }
                }
                this.qualityReportList = array
                for (let i = 0; i < this.newArr.length; i++) {
                    if (this.newArr[i] === this.qualityReportList[0].projectStage) {
                        this.arrIndex = i
                    }
                }
            },
            getBig (url) {
                // 点击看大图
                this.showImg = true
                this.imageList = [{ 'src': url }]
            },
            wxcLightboxOverlayClicked (e) {
                // 无状态组件，需要在此次关闭
                this.showImg = false
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.projectId = params.id
            }
            if (params && params.name) {
                this.zhiJianName = params.name
            }
            await this.quality(this.projectId, 1)
            const result = await getFwAccount(params.qualityInspectorId)
            this.tanInfo = result
            this.imgId = result.headBusinessId
            if (this.imgId) {
                const results = await getImgUrls(this.imgId)
                this.imgUrlArrayDou = results.data
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 750px;
        border-top-width: 1px;
        border-top-color: #DBD6D6;
        padding-top: 30px;
        background-color: #FFFFFF;
    }

    .footer {
        width: 750px;
        height: 120px;
        padding: 0 40px;
        border-top-width: 1px;
        border-top-color: #DBD6D6;
        flex-direction: row;
        align-content: center;
        align-items: center;
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .head-portrait {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .label-text {
        color: #333333;
        font-size: 30px;
    }
</style>
