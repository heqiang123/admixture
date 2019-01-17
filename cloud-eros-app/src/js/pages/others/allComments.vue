<template>
    <div>
        <div class="comment-zone">
            <div class="comment-zone-title">
                <div class="title-wrapper">
                    <text class="comment-title-content">评论 ({{comment.length}})</text>
                </div>
                <text class="write-comment" @click="goTo('others.comments',{id:id,type:type,url:urlImaged},'needLogin')">&#xe609; 写评论...</text>
            </div>
            <div class="comment-tag-list" v-if="tagArr.length">
                <text class="tag" :style="selectStyle(item)" @click="changeSelected(index)" v-for="(item, index) of tagArr" :key="index">{{item.name}}</text>
            </div>
            <list class="comment-zzz" :style="{height:commentHeight}">
                <cell v-for="(commentItem,index) in comment" :key="index">
                    <comment-item :comments="commentItem" :showCcomments="showBottom" @addComment="getComments(id,type)"></comment-item>
                </cell>
            </list>
        </div>
    </div>
</template>

<script>
    import commentItem from '../../components/commentItem'
    import downLoading from '../../components/bui/downLoading'
    import refreshLoading from '../../components/bui/refreshLoading'
    import { WxcButton } from 'weex-ui'
    import Tag from '../../components/Tag'
    import mixins from '../../common/mixins'
    import { findTagsByTypeAndBusinessId, findPraiseCommentByBusinessIdAndType } from '../../service/commentsApi'

    export default {
        name: 'allComments',
        components: { WxcButton, Tag, commentItem, refreshLoading, downLoading },
        props: {
            url: {
                url: String
            }
        },
        data () {
            return {
                showBottom: false,
                state: {
                    isFocus: false,
                    isReply: false
                },
                enterIn: '',
                comment: [],
                type: '',
                id: '',
                tagArr: [],
                selected: [],
                urlImage: '',
                urlImaged: ''
            }
        },
        computed: {
            commentHeight () {
                if (this.tagArr.length) {
                    return this.pageHeight - 300
                } else {
                    return this.pageHeight - 100
                }
            }
        },
        mixins: [mixins],
        methods: {
            async getfindTagsByTypeAndBusinessId (data, method) {
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
                        'background-color': '#888'
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
            },
            // 得到评论的数量
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
            onPullingdown (e) {
                // 默认refresh文字与图标
                this.refreshIcon = 'icon-todown'
                this.refreshText = '下拉可以刷新...'
                // 下拉一定距离时文字与图标
                if (Math.abs(e.pullingDistance) > 60) {
                    this.refreshIcon = 'icon-toup'
                    this.refreshText = '松开即可刷新...'
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params.id) {
                this.id = params.id
            }
            if (params.type) {
                this.type = params.type
            }
            if (params.url) {
                this.urlImaged = params.url
            }
            this.enterIn = params.enter
            if (this.type === '4' || this.type === '0' || this.type === '1') {
                await this.getfindTagsByTypeAndBusinessId({ id: this.id, type: this.type })
            }
            if (this.enterIn === '2') {
                await this.getComments(this.id, this.type)
            }
        },
        eros: {
            async beforeBackAppear (params) {
                if (params && params.type && params.id) {
                    this.id = params.id
                    this.type = params.type
                    this.enterIn = params.enter
                    if (this.enterIn === '1') {
                        await this.getComments(this.id, this.type)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-zone {
        height: 30000;
        background-color: #fff;
    }

    .comment-zone-title {
        margin-top: 30;
        margin-bottom: 30;
        padding: 0 20 0 12;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title-wrapper {
        flex-direction: row;
        align-items: center;
    }

    .comment-title-content {
        font-size: 28;
        color: #212121;
    }

    .write-comment {
        font-family: iconfont;
        font-size: 28;
        color: #353535;
    }

    .comment-tag-list {
        flex-direction: row;
        flex-wrap: wrap;
        width: 710px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .comment-zzz {
        margin: 0 20;
        padding-bottom: 20px;
    }

    .reply-to-user {
        flex-direction: row;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750;
        height: 100;
    }

    .input {
        margin: 20;
        width: 570;
        height: 60;
        font-size: 24;
        background-color: #fff;
        border-radius: 10;
    }

    .tag {
        padding: 10 10px;
        margin: 0 8 10 0;
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
