<template>
    <div class="case-item" @click="goTo('design.case',{id:item.id})" @appear="onappear()">
        <div class="case-cover">
            <image v-if="appearIsshow" class="cover" resize="cover" :src="`${item.homepageUrl}?x-oss-process=image/resize,w_600`"></image>
            <div class="cover-Mongolia"></div>
            <div class="designer-info"
                 @disappear="showNav"
                 @appear="hideNav">

                <image  v-if="appearIsshow" class="designer-image" resize="stretch" :src="`${item.headUrl}?x-oss-process=image/resize,w_100/crop,x_0,y_0,w_100,h_100/circle,r_100/format,png`"></image>
                <div class="designer-details">
                    <text class="designer-style">{{item.title}}</text>
                    <text class="designer-name">{{item.designerName}}</text>
                </div>
            </div>
            <div class="case-tag">
                <image class="tag-image" src="bmlocal://assets/images/Label.png"></image>
                <text class="tag-des">{{item.tags[0].name || ''}}</text>
            </div>
        </div>
        <div class="case-item-info">
            <div class="info-wrapper">
                <text class="icon">&#xe656;</text>
                <text class="info-text">{{item.housesAddress}}</text>
            </div>
            <div class="info-wrapper">
                <text class="icon">&#xe600;</text>
                <text class="info-text">{{item.ups}}</text>
            </div>
            <div class="info-wrapper">
                <text class="icon">&#xe6d9;</text>
                <text class="info-text">{{item.saves}}</text>
            </div>
            <div class="info-wrapper">
                <text class="icon">&#xe60d;</text>
                <text class="info-text">{{item.comments}}</text>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../common/mixins'

    export default {
        name: 'caseItems',
        mixins: [mixins],
        data () {
            return {
                appearIsshow: false
            }
        },
        props: {
            item: {
                type: Object

            },
            hotCase: {
                type: Boolean
            },
            isShowTag: {
                type: Boolean,
                require: false,
                default: true
            }
        },
        methods: {
            onappear () {
                this.appearIsshow = true
            }
        },
        created () {
            // console.log('----------------------------------')
            // console.log(this.item)
        }
    }
</script>

<style lang="scss" scoped>
    .case-item {
        margin-top: 30;
    }

    .case-cover {
        position: relative;
        width: 750;
        height: 530;
        padding-top: 30;
        background-color: #fff;
    }

    .cover {
        width: 750;
        height: 500;
    }

    .cover-Mongolia {
        width: 750;
        height: 500;
        background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
        position: absolute;
        top:30;
    }

    .designer-info {
        position: absolute;
        top: 380;
        padding: 0 60;
        flex-direction: row;
        align-items: center;
        height: 92;
    }

    .designer-image {
        width: 92px;
        height: 92px;
    }

    .designer-details {
        height: 92;
        justify-content: space-between;
        margin-left: 20;
    }

    .designer-name {
        font-size: 24;
        color: #fff;
    }

    .designer-style {
        font-size: 32;
        color: #fff;
    }

    .case-tag {
        position: absolute;
        top: 4;
        left: 40;
        width: 220;
        height: 52;
        padding-right: 30px;
    }

    .tag-image {
        width: 260;
        height: 52;
    }

    .tag-des {
        position: absolute;
        top: 10;
        left: 50;
        font-size: 28;
        color: #fff;
        font-weight: 300;
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

    .info-text {
        padding-left: 10;
        font-size: 24;
        color: #555;
    }
</style>

