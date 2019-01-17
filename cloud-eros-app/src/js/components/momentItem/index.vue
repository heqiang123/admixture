<template>
    <div class="container ">
        <div class="w1 hr"></div>
        <div class="ph-30 pt20">
            <top class="top" @handelDel="handelDel" :title="title" :name="name" :id="id" :stamp="stamp" :img="img"></top>
            <main :content="content" :images="images" :tags="tags"></main>
            <div class="fdr mb20 aic">
                <div class="location fdr">
                    <text v-if="location" class="iconfont mr10 c62 f28" style="font-size: 28px;">&#xe606;</text>
                    <text v-if="location" class="f22 c62" style="font-size: 22px;">{{location}}</text>
                </div>
                <div class="fdr aic">
                    <text class="icon-box iconfont" @click="clickfollow">&#xe602;</text>
                    <text class="number">{{follows||0}}</text>
                    <text class="icon-box iconfont" @click="goTo('comment.index', {comment: comments, dynamicId: id})">&#xe620;</text>
                    <text class="number">{{comments||0}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import top from './top'
    import main from './main'
    import { userUpCount } from '../../service/baseApi'
    import mixins from '../../common/mixins'

    export default {
        components: { top, main },
        props: {
            name: {
                type: String
            },
            stamp: {},
            img: {},
            content: {
                type: String
            },
            images: {
                type: String
            },
            follows: {
                type: Number,
                default: 0
            },
            comments: {
                type: Number,
                default: 0
            },
            tags: {
                type: Array
            },
            location: {
                type: String
            },
            dynamicId: {
                type: Number
            },
            id: {
                type: Number
            },
            title: {}
        },
        data () {
            return {
                isShow: false
            }
        },
        mixins: [mixins],
        methods: {
            handelDel () {
                this.$emit('handelDel')
            },
            async clickfollow () {
                await userUpCount(this.id)
                this.follows++
            }
        }
    }
</script>

<style src="../../../assets/css/basebase.css"></style>

<style scoped lang="scss">
    @import "../../../assets/css/base";

    .container {
        width: 750px;
        background-color: #fff;
        padding-left:20px;
        padding-right: 20px;
    }

    .icon-box {
        margin-left: 10px;
        margin-right: 10px;
    }

    .top {
        margin-top: 20px;
        margin-bottom: 16px;
    }

    .number {
        margin-left: 20px;
        margin-right: 30px;
        color: #999;
    }

    .location {
        width: 470px;
    }

    .c62 {
        color: #6287B2;
    }
</style>

