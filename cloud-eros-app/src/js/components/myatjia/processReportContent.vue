<template>
    <div>
        <div class="item-container-box" v-for="(item, index) in items" :key="index">
            <div class="business-left">
                <div class="business-time" v-if="item.applyCheckTime">
                    <text class="business-time-p2">{{$dayjs(item.applyCheckTime).format('YYYY-MM-DD')}}</text>
                    <text class="business-time-p2">{{$dayjs(item.applyCheckTime).format('HH:mm:ss')}}</text>
                </div>
            </div>
            <div class="business-right">
                <div class="business-content-box1">
                    <text class="business-content-box1-p1">{{item.constructionPlanName}}</text>
                    <text class="business-content-p1" v-if="item.checkStatus === '4'">(合格)</text>
                    <text class="business-content-p1" v-if="item.checkStatus === '3'">(不合格)</text>
                </div>
                <div class="stage" v-if="!(isrelateIndex === index)">
                    <div class="stagePhoto" @click="showRelatePicture(index)">
                        <text class="stagePhototext">验收照片</text>
                    </div>
                    <div class="checkPhoto" @click="showRelatePicture(index)">
                        <text class="checkPhotoText">质检单</text>
                    </div>
                </div>
                <div v-if="isrelateIndex === index">
                    <div class="business-content-box2" v-if="item.checkRemark">
                        <text class="business-content-box2-p1">{{item.checkRemark}}</text>
                    </div>
                    <div class="business-content-box3" v-if="item.applyCheckAttachId">
                        <img-list :items="item.attachId" @getBig="getBig($event)"></img-list>
                    </div>
                </div>
            </div>
            <div class="business-process" v-if="index>arrIndex">
                <text class="iconfont font-38 color-black">&#xe617;</text>
            </div>
            <div class="business-process" v-if="index === arrIndex">
                <text class="iconfont font-38 color-red">&#xe617;</text>
            </div>
            <div class="business-process" v-if="index < arrIndex">
                <text class="iconfont font-38 color-cbcbcb">&#xe617;</text>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import imgList from '../../components/imgList'

    export default {
        mixins: [mixins],
        props: {
            items: {
                type: Array
            },
            arrIndex: {
                type: Number
            }
        },
        data () {
            return {
                imgUrlArray: [],
                imgUrlArrayPost: [],
                isrelateIndex: -1,
                isrelateIndexArray: [],
                indexArray: [0, 1, 2, 3, 4],
                indexFirst: 0,
                indexSecond: 1,
                indexThird: 2,
                indexFouth: 3,
                indexFifth: 4,
                indexItem: ''
            }
        },
        components: { imgList },
        methods: {
            getBig (url) {
                this.$emit('getBig', url)
            },
            showRelatePicture (index) {
                this.isrelateIndex = index
                this.isrelateIndexArray.push(this.isrelateIndex)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/css/base";

    .item-container {
        width: 750px;
        margin-top: 40px;
        background-color: #ffffff;
    }

    .content {
        width: 750px;
        height: 300px;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
    }

    .item-container-box {
        width: 750px;
        flex-direction: row;
    }

    .business-left {
        width: 180px;
        padding-bottom: 50px;
        flex-direction: row;
    }

    .business-time {
        width: 140px;
        position: relative;
    }

    .business-process {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #FFFFFF;
        position: absolute;
        top: 0;
        left: 161px;
    }

    .business-time-p1 {
        height: 40px;
        font-size: 28px;
        color: #666666;
        line-height: 40px;
        text-align: right;
    }

    .business-time-p2 {
        height: 28px;
        font-size: 26px;
        color: #666666;
        line-height: 28px;
        text-align: right;
    }

    .business-time-p3 {
        height: 34px;
        font-size: 24px;
        color: #6287B2;
        line-height: 34px;
        text-align: right;
    }

    .business-right {
        width: 570px;
        padding-bottom: 50px;
        padding-left: 50px;
        border-left-color: #cbcbcb;
        border-left-width: 1px;
        border-left-style: solid;
    }

    .business-content-box1 {
        flex-direction: row;
        width: 500px;
    }

    .stage {
        flex-direction: row;
    }

    .stagePhoto {
        height: 50px;
        width: 150px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #E60012;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #E60012;
        border-left-width: 2px;
        border-left-style: solid;
        border-left-color: #E60012;
        border-right-width: 2px;
        border-right-style: solid;
        border-right-color: #E60012;
    }

    .checkPhoto {
        height: 50px;
        width: 100px;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #E60012;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #E60012;
        border-left-width: 2px;
        border-left-style: solid;
        border-left-color: #E60012;
        border-right-width: 2px;
        border-right-style: solid;
        border-right-color: #E60012;
    }

    .checkPhotoText {
        color: #E60012
    }

    .stagePhototext {
        color: #E60012
    }

    .business-content-box1-p1 {
        color: #333333;
        font-size: 30px;
    }

    .business-content-box1-p2 {
        font-size: 30px;
    }

    .business-content-box2-p1 {
        margin-top: 10px;
        font-size: 28px;
        color: #737685;
    }

    .business-content-box3 {
        flex-direction: row;
        flex-wrap: wrap;
        width: 536px;
    }

    .business-content-box3-img {
        width: 160px;
        height: 160px;
        margin: 20px 18px 0 0
    }

    .tags-image {
        /*width: 160px;*/
        width: 600px;
    }

    .textArrangement {
        flex-direction: row;
        width: 600px;
        height: 80px;
    }

    .arrangementLeft {
        width: 250px;
        justify-content: flex-start;
    }

    .arrangementRight {
        width: 300px;
        justify-content: flex-start;
    }

    .tags-text {
        color: #E60012;
        width: 240px;
        justify-content: flex-start;
    }

    .tags-anotherText {
        margin-right: 0;
        flex: 1;
        color: #999999;
    }

    .top-border {
        padding-bottom: 40px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
    }
</style>
