<template>
    <div>
        <title-bar type="ADVERTORIAL" :ID="newId" :upCount="newsData.ups"
                   :isSave="newsData.save" :saveCount="newsData.saves"
                   :shareTitleName="newsData.title"
                   :shareContentName="newsData.description"
                   :shareId="newId"
                   :sharePicture="softUrl"
                   address="news-detail"
                   @clickSave="clickSave"></title-bar>
        <div class="news-details">
            <div class="article-detail-title">
                <text class="title">{{newsData.title}}</text>
            </div>
            <div class="article-detail-time">
                <text class="time">{{newsData.releaseDate}}</text>
            </div>
        </div>
        <atjia-view :width="750" :height="pageHeight-225" :id="newId"></atjia-view>
        <div class="comment-wrapper" v-if="newId" @click='popup()'>
            <div class="comment-input" @click='popup()'>
                <text class="comment-input-text">有什么想评论的，直接评论吧！</text>
            </div>
            <text class="comment-comment" @click='popup()'>查看评论</text>
        </div>

        <wxc-popup popup-color="rgb(255, 255, 255)"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="`${pageHeight-50}`">
            <div class="popBox">
                <div class="allNums">
                    <text class="allNums-text">{{comment.length}}条评论</text>
                </div>
                <div class="popup-title">
                    <text class="popup-title-text">全部评论</text>
                </div>
                <list class="comment-zzz" :style="{height:`${pageHeight-listHeight}px`}">
                    <cell v-for="(commentItem,index) in comment" :key="index">
                        <comment-item :comments="commentItem" :showCcomments="showBottom" @addComment="getComments(newId,5)"></comment-item>
                    </cell>
                </list>
                <div class="submit-text">
                    <input type="text" class="comment-input" placeholder="有什么想评论的，直接评论吧！" v-model="userInput" />
                    <div class="comment-submit-box" @click="submitComment()">
                        <text class="comment-submit">发送</text>
                    </div>
                </div>
                <div class="" v-if="tagArr.length">
                    <scroller @click="purchaseOrderDetails(item.id)" class="comment-tag-list" scroll-direction='horizontal' flex-direction = 'row'>
                        <text class="tag" :style="selectStyle(item)" @click="changeSelected(index)" v-for="(item, index) of tagArr" :key="index">{{item.name}}</text>
                    </scroller>
                </div>
            </div>
        </wxc-popup>
    </div>
</template>
<script>
    import commentItem from '../../components/commentItem'
    import titleBar from '../../components/titleBar'
    import commentZone from '../../components/commentZone'
    import atjiaView from '../../components/atjiaView'
    import { getContentById } from '../../service/softApi'
    import { addApp, findPraiseCommentByBusinessIdAndType, findTagsByTypeAndBusinessId } from '../../service/commentsApi'
    import mixins from '../../common/mixins'
    import { AmHtml } from 'weex-amui'
    import { WxcPopup } from 'weex-ui'

    export default {
        name: 'newsDetails',
        mixins: [mixins],
        components: { titleBar, commentZone, AmHtml, atjiaView, WxcPopup, commentItem },
        data () {
            return {
                type: 'news',
                newId: '',
                newsData: {},
                userInput: '',
                softUrl: '',
                contentName: '软文的分享',
                isBottomShow: false,
                urlImage: '',
                urlImaged: '',
                tagArr: [],
                comment: [],
                listHeight: 380
            }
        },
        computed: {
            boxheight () {
                return this.$getConfig().eros.deviceHeight - this.$getConfig().eros.navBarHeight
            },
            height () {
                return this.$getConfig().eros.deviceHeight - this.$getConfig().eros.navBarHeight
            }
        },
        methods: {
            focus () {
                if (weex.config.env.platform === 'android') {
                    this.listHeight = this.pageHeight - 200
                }
            },
            onblur () {
                if (weex.config.env.platform === 'android') {
                    this.listHeight = 380
                }
            },
            // 获取软文详情
            async getSoftContent (id) {
                const result = await getContentById(id)
                this.newsData = result.content
                console.log('软文详情的收藏', JSON.stringify(this.newsData))
            },
            clickSave (val) {
                this.newsData.save = val
            },
            async submitComment () {
                if (!this.userId) {
                    this.goTo('user.login')
                    return
                }
                if (this.userInput) {
                    console.log(JSON.stringify(this.tagArr))
                    const array = []
                    for (const item of this.tagArr) {
                        if (item.select) {
                            delete item.select
                            array.push(item)
                        }
                    }
                    const submitData = {
                        businessId: this.newId,
                        commentContent: this.userInput,
                        commentType: 5,
                        tags: array
                    }
                    await addApp(submitData)
                    this.userInput = ''
                    this.toast('发送成功！')
                    this.getComments(this.newId, 5)
                    this.getfindTagsByTypeAndBusinessId({ id: this.newId, type: 5 })
                } else {
                    this.toast('请输入评论内容')
                }
            },
            async getComments (id, type) {
                if (!this.xRequest()) {
                    return
                }
                if (id && type) {
                    const result = await findPraiseCommentByBusinessIdAndType({ id, type })
                    for (let i = 0; i < result.length; i++) {
                        for (let j = 0; j < result.length; j++) {
                            if (result[i].parentComment) {
                                if (result[i].parentComment === result[j].id) {
                                    if (Array.isArray(result[j].childComment) && result[j].childComment.length) {
                                        result[j].childComment.push(JSON.parse(JSON.stringify(result[i])))
                                    } else {
                                        result[j].childComment = [JSON.parse(JSON.stringify(result[i]))]
                                    }
                                    result.splice(i, 1)
                                    --i
                                }
                            }
                        }
                    }
                    this.comment = result
                    this.urlImage = this.$storage.getSync('urlHomeImg')
                }
            },
            popup () {
                this.tagArr = []
                this.getComments(this.newId, 5)
                this.getfindTagsByTypeAndBusinessId({ id: this.newId, type: 5 })
                this.isBottomShow = true
            },
            popupOverlayBottomClick () {
                this.isBottomShow = false
            },
            async getfindTagsByTypeAndBusinessId (data, method) {
                this.tagArr = []
                const result = await findTagsByTypeAndBusinessId(data, method)
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].select = false
                        this.tagArr.push(result[i])
                    }
                }
            },
            selectStyle (item) {
                if (item.select) {
                    return {
                        'background-color': '#ccc'
                    }
                } else {
                    return {
                        'background-color': '#f5f5f5'
                    }
                }
            },
            changeSelected (index) {
                let selectedNum = 0
                for (let i = 0; i < this.tagArr.length; i++) {
                    const element = this.tagArr[i]
                    if (element.select) {
                        selectedNum++
                    }
                }
                if (selectedNum > 4) {
                    return this.toast('最多选择5个标签!')
                }
                this.tagArr[index].select = !this.tagArr[index].select
                console.log(JSON.stringify(this.tagArr))
            }
        },
        beforeCreate () {
            this.$router.getParams(dt => {
                this.type = dt.type
            })
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.newId = params.id
                this.softUrl = params.url
                // this.$storage.deleteSync('urlHomeImg')
                this.$storage.setSync('urlHomeImg', this.softUrl)
                this.showLoading('正在加载中...')
                await this.getSoftContent(this.newId)
                this.hideLoading()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news-details {
        width: 750px;
        background-color: #FFFFFF;
        height: 150px;
    }

    .article-detail-title {
        padding: 20;
    }

    .article-detail-time {
        padding: 20;
    }

    .title {
        font-size: 36;
        font-weight: 600;
        color: #333333
    }

    .time {
        font-size: 30;
        color: #555555
    }

    .webview {
        justify-content: center;
    }

    .comment-wrapper {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        width: 750px;
        height: 100px;
        padding-left: 50px;
        padding-right: 50px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #cccccc;
        background-color: #FFFFFF;
    }

    .comment-input {
        width: 550px;
        height: 68px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 10px;
        background-color: #e9e9e9;
        justify-content: center;
        align-items: center;
        font-size: 28px;
    }

    .comment-input-text {
        color: #666666;
        font-size: 28/px;
    }

    .comment-submit-box{
        height: 70px;
        width: 140px;
        justify-content: center;
        align-items: center;
    }

    .comment-submit {
        color: #666666;
        font-size: 26px;
    }

    .comment-comment {
        color: #999999;
        font-size: 26px;
        margin-left: 20px;
    }

    .allNums{
        height: 80px;
        width: 750px;
        justify-content: center;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
    }

    .popup-title {
        padding-top: 30px;
        height: 70px;
        width: 260px;
        /*justify-content: center;*/
        align-items: center;
    }
    .popup-title-text {
        font-size: 38px;
        color: #000000;
        font-weight: bold;
    }
    .submit-text {
        width: 750px;
        height: 100px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .comment-tag-list {
        flex-direction: row;
        /*flex-wrap: wrap;*/
        /*height: 80px;*/
        width: 750px;
        padding-left: 50px;
        padding-right: 50px;
    }
    .tag {
        padding: 15px;
        margin: 0 15px 15px 0;
        font-size: 26;
        color: #555;
        background-color: #f5f5f5;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 4;
    }
</style>
