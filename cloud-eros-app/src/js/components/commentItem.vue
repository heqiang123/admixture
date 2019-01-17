<template>
    <div>
        <div class="comment-item">
            <image class="comment-avatar" resize="cover" :src="`${getImageUrl(comments.customerPhoto)}&level=4`"></image>
            <div class="comment-contain">
                <div class="comment-header">
                    <text class="user-name" v-if="comments.nickName">{{comments.nickName}}</text>
                    <text class="user-name" v-else>{{comments.createrName}}</text>
                    <div class="user-handdle">
                        <text class="iconfont-text-2 praise" @click="upsClick" :class="[isUp?'active':'']">{{isUp?'&#xe8ed;':'&#xe602;'}}</text>
                        <text>{{comments.ups}}</text>
                        <text class="icon" :style="{'margin-top': 10}" @click="showComment">&#xe60d;</text>
                    </div>
                </div>
                <div class="comment-tags">
                    <div class="tags-contraner" v-for="(item, index) of comments.tags" :key="index">
                        <text class="contraner-font">{{item.name}}</text>
                    </div>
                </div>
                <text class="comment-content">{{comments.commentContent}}</text>
                <div class="comment-style">
                    <image class="comment-image" :src="getImageUrl(item.thumUrl)" v-for="(item, index) of imgageArray" :key="index"></image>
                </div>
                <div class="comment-reply-list" v-if="comments.childComment">
                    <div class="comment-reply" v-for="item of comments.childComment">
                        <!--<text class="reply-user">{{item.createrName}} ：</text>-->
                        <text class="reply-user" v-if="item.nickName">{{item.nickName}} ：</text>
                        <text class="reply-user" v-else>{{item.createrName}} ：</text>
                        <text class="reply-content">{{item.commentContent}}</text>
                    </div>
                </div>
                <text class="time">{{comments.commentTime}}</text>
            </div>
        </div>
        <comment-input v-if="isShow" @clickedHidePanel="clickShow"></comment-input>
    </div>
</template>

<script>
    import mixins from '../common/mixins'
    import commentInput from '../components/commentInput'
    import { addApp } from '../service/commentsApi'
    import { getFileInfo } from '../service/baseApi'
    import { upItem } from '../service/userApi'

    export default {
        name: 'commentItem',
        components: { commentInput },
        props: {
            showBottoms: {
                type: Boolean
            },
            comments: {
                type: Object
            }
        },
        mixins: [mixins],
        data () {
            return {
                imgageArray: [],
                panelShow: false,
                has: this.reply,
                showState: '',
                isShow: false,
                inputContent: '',
                commentInfo: '',
                id: '',
                type: '',
                commentsstate: {},
                isUp: false,
                urlId: '',
                isUps: 1
            }
        },
        watch: {
            comments: {
                handler (newVal, oldVal) {
                    this.commentsstate = newVal
                },
                deep: true
            }
        },
        methods: {
            showClick (value) {
            },
            showComment () {
                this.isShow = true
            },
            // 点赞
            async upsClick () {
                if (this.isUps === 1) {
                    await upItem('COMMENT', this.comments.id)
                    this.comments.up = true
                    this.comments.ups = this.comments.ups + 1
                    this.isUp = true
                    this.isUps = Number(this.isUps) + 1
                } else {
                    this.toast('您已经赞过啦')
                }
            },
            async clickShow (value) {
                this.isShow = false
                this.inputContent = value
                const reslutData = {
                    parentComment: this.comments.id,
                    businessId: this.comments.businessId,
                    commentContent: this.inputContent,
                    commentType: this.comments.commentType
                }
                const result = await addApp(reslutData)
                this.$emit('addComment')
            },
            async getFilePict () {
                if (!this.comments.commentImageId) {
                    return
                }
                const result = await getFileInfo(this.comments.commentImageId)
                if (result && result.data) {
                    this.imgageArray = result.data
                }
            }
        },
        async created () {
            await this.getFilePict()
        }
    }
</script>

<style lang="scss" scoped>
    .comment-item {
        flex-direction: row;
        margin: 40 0 0 10;
    }

    .comment-avatar {
        width: 80;
        height: 80;
        border-radius: 40;
    }

    .comment-contain {
        margin-left: 28;
        width: 602;
    }

    .comment-header {
        flex-direction: row;
        justify-content: space-between;
    }

    .user-name {
        color: #353535;
        font-size: 32;
    }

    .user-handdle {
        flex-direction: row;
        width: 160;
        justify-content: space-around;
        align-items: center;
    }

    .comment-tags {
        margin-top: 10px;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .tags-contraner {
        margin-bottom: 10px;
        padding: 0 20px;
        height: 40px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #999999;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #999999;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: #999999;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #999999;
        border-radius: 5px;
    }

    .contraner-font {
        font-size: 18px;
        color: #000000;
    }

    .comment-content {
        margin-top: 20;
        color: #353535;
        font-size: 32;
    }

    .comment-style {
        flex-direction: row;
        width: 650px;
        flex-wrap: wrap;
        align-items: center;
    }

    .comment-image {
        width: 100px;
        height: 100px;
        margin-top: 10px;
        margin-right: 10px;
    }

    .comment-reply {
        margin-top: 20;
        padding: 20;
        flex-direction: row;
        background-color: #f2f2f2;
    }

    .reply-user {
        color: #e60012;
        font-size: 28;
    }

    .reply-content {
        color: #666;
        font-size: 28;
    }

    .praise {
        font-size: 40;
    }

    .icon {
        font-family: iconfont;
        font-size: 32;
        color: #999;
    }

    .time {
        color: #999;
        font-size: 24;
        margin-top: 30;
    }

    .active {
        color: #E60012;
    }

    .iconfont-text-2 {
        font-family: iconfont2;
        font-size: 26px;
        color: #999999;
    }
</style>
