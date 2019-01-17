<template>
    <div>
        <scroller style="background-color: #FFFFFF" :style="wrapCom?{height:pageHeight - 100}:{height:pageHeight}">
        <div class="someComment" v-for="(item, index) of parentComment" :key="index">
            <div>
                <div class="userInfor">
                    <image class="userHead" src="bmlocal://assets/images/CgpnG1rWsuKAbLOGAAGSGyrO6oA364.jpg"></image>
                    <text>{{item.createrName}}</text>
                    <text class="icon-box iconfont" @click="clickfollow">&#xe602;</text>
                    <text class="number">{{follows||0}}</text>
                    <text class="icon-box-com iconfont" @click="commentClick(index)">&#xe620;</text>
                </div>
                <text class="commentContent">{{item.commentContent}}</text>
            </div>
            <div class="reply" v-for="(items, indexs) of newCommentArray" :key="indexs" v-if="items.parentComment === item.id">
                <div class="replyStyle">
                    <text class="colorFont">{{items.createrName}}</text>
                    <text>回复</text>
                    <text class="colorFont">@{{item.createrName}}</text>
                    <text>{{items.commentContent}}</text>
                </div>
            </div>
            <comment-input class="commentButton" v-if="index === status" @clickedHidePanel="clickShow"></comment-input>
            <text class="commentTime">{{$dayjs(item.commentTime).format('YYYY-MM-DD HH:mm')}}</text>
        </div>
        <div class="writeComment" v-if="wrapCom">
            <input class="input" type="text" placeholder="写评论..." v-model="comments">
            <wxc-button text="发送"
                        :btnStyle="{'background-color': '#e60012', 'border-radius': 6, width: 80, height: 80}"
                        :textStyle="{'font-size': 32, 'font-weight': 600}"
                        @wxcButtonClicked="addComment"></wxc-button>
        </div>
        </scroller>
    </div>
</template>

<script>
    import mixins from '../../common/mixins'
    import { WxcButton } from 'weex-ui'
    import { addApp } from '../../service/commentsApi'
    import { getCommentList } from '../../service/baseApi'
    import commentInput from '../../components/commentInput'

    export default {
        components: { WxcButton, commentInput },
        data () {
            return {
                comment: 0,
                dynamicId: 0,
                type: 6,
                commentsArray: [],
                newCommentArray: [],
                parentComment: [],
                reply: false,
                wrapCom: true,
                replyComments: '',
                comments: '',
                commentIndex: 0,
                isShow: false,
                status: -1
            }
        },
        mixins: [mixins],
        methods: {
            async addComment () {
                const submitData = {
                    businessId: this.dynamicId,
                    commentContent: this.comments,
                    commentType: 6
                }
                await this.createdCustome(submitData)
            },
            async clickShow (val) {
                const submitData = {
                    parentComment: this.parentComment[this.commentIndex].id,
                    businessId: this.dynamicId,
                    commentContent: val,
                    commentType: 6
                }
                await this.createdCustome(submitData)
            },
            async createdCustome (data) {
                await addApp(data)
                this.toast('评论成功')
                this.comments = ''
                this.replyComments = ''
                this.comment++
                this.wrapCom = false
                this.status = -1
                const dataComment = {
                    id: this.dynamicId,
                    type: this.type
                }
                await this.displayComment(dataComment)
            },
            async displayComment (data) {
                const result = await getCommentList(data)
                this.commentsArray = result
                this.newCommentArray = []
                this.parentComment = []
                this.commentsArray.forEach((item, index) => {
                    if (item.parentComment) {
                        this.newCommentArray.push(item)
                    } else {
                        this.parentComment.push(item)
                    }
                })
            },
            commentClick (index) {
                this.commentIndex = index
                this.wrapCom = false
                this.isShow = true
                this.status = index
            }
        },
        async mounted () {
            const params = await this.$router.getParams()
            this.comment = params.comment
            this.dynamicId = params.dynamicId
            this.$navigator.setCenterItem({
                text: '评论' + '(' + this.comment + ')'
            })
            const data = {
                id: this.dynamicId,
                type: this.type
            }
            await this.displayComment(data)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/base";
    .someComment {
        background-color: #FFFFFF;
        width: 750px;
        margin-top: 20px;
        margin-left: 35px;
    }
    .userInfor {
        flex-direction: row;
    }
    .commentContent {
        margin-left:100px;
        margin-right: 100px;
    }
    .replyStyle {
        margin-top: 20px;
        width: 580px;
        padding-right: 10px;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .colorFont {
        color:#E60012;
    }
    .reply {
        width: 580px;
        background-color: #EEEEEE;
        margin-left:100px;
        margin-right: 100px;
        padding: 0 20px 20px 20px
    }
    .commentReplyContent {
        width: 600px;
        margin-right: 100px;
    }
    .commentTime{
        margin-left:100px;
        color: #AAAAAA;
        margin-top: 10px;
    }
    .userHead {
        width: 100;
        height: 100;
        border-radius: 50%;
    }
    .writeComment {
        bottom: 0;
        position: fixed;
        flex-direction: row;
        width: 750px;
        height: 100px;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        border-top-style: solid;
        border-top-color: #98999a;
        border-top-width: 1;
    }
    .icon-box {
        margin-left: 200px;
    }
    .commentButton {
        margin-top: 20px;
        margin-right: 50px
    }
    .number {
        color: #aaaaaa;
        margin-left: 20px
    }
    .icon-box-com {
        margin-left: 80px;
    }
    .input {
        width: 600;
        height: 80;
        padding: 0 16;
        background-color: #E9E9E9;
        border-radius: 6;
    }
</style>
