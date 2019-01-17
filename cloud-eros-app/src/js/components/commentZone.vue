<template>
    <div class="comment-zone">
        <div class="comment-zone-title">
            <div class="title-wrapper">
                <text class="comment-title-prefix"></text>
                <text class="comment-title-content">评论({{comment.length}})</text>
            </div>
            <text class="write-comment" @click="goTo('others.comments',{id:id,type:type,url:urlHomePagesImg},'needLogin')">&#xe609; 写评论...</text>
        </div>
        <div class="comment-tag-list">
            <div class="designer-label-zone" v-for="(item,index) in details" :key="index">
                <text class="designer-label">{{item.name}}</text>
            </div>
        </div>
        <div class="comments" v-if="comment.length" v-for="(item,index) in comment" :key="index">
            <comment-item :comments="item" :type="item.commentType" @addComment="getCasesComments(id,type)"></comment-item>
        </div>
        <wxc-button text="全部评论" @wxcButtonClicked="goTo('others.allComments',{id:id,type:type,url:urlHomePagesImg,enter:'2'})"
                    :btnStyle="{'background-color': '#f5f5f5', 'margin-top': 40, 'margin-bottom': 40,'margin-left':20, height: 82, width: 710}"
                    :textStyle="{'font-size': 28, color: '#757575'}"></wxc-button>
    </div>
</template>

<script>
    import { WxcButton } from 'weex-ui'
    import commentItem from '../components/commentItem'
    import Tag from './tag'
    import { findPraiseCommentByBusinessIdAndType } from '../service/commentsApi'
    import mixins from '../common/mixins'

    export default {
        name: 'commentZone',
        components: { WxcButton, Tag, commentItem },
        mixins: [mixins],
        props: {
            details: {
                type: Array
            },
            enterIn: {
                type: Array
            },
            commentCount: {
                type: Number
            },
            id: {
                type: Number
            },
            type: {
                type: String
            },
            urlHomePagesImg: {
                urlHomePagesImg: String
            },
            enter: {
                type: String
            }
        },
        data () {
            return {
                id: '',
                type: '',
                comment: []
            }
        },
        watch: {
            type (newVal) {
                this.type = newVal
            },
            id () {
                if (this.id) {
                    this.getCasesComments(this.id, this.type)
                }
            }
        },
        methods: {
            async getCasesComments (id, type) {
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
                }
            }
        },
        eros: {
            async backAppeared (params) {
                if (params && params.type && params.id) {
                    this.type = params.type
                    this.id = params.id
                    this.enterIn = params.enter
                    if (this.enterIn === '1') {
                        await this.getCasesComments(this.id, this.type)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-zone {
        background-color: #ffffff;
    }

    .comment-zone-title {
        margin-top: 80;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750;
    }

    .title-wrapper {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .comment-title-prefix {
        width: 12;
        height: 40;
        margin-right: 20;
        background-color: #353535;
    }

    .comment-title-content {
        font-size: 32;
        color: #212121;
    }

    .write-comment {
        font-family: iconfont;
        font-size: 32;
        color: #353535;
        margin-right: 30px;
    }

    .comment-tag-list {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        margin-top: 20;
        height: 84;
        padding-right: 30;
        padding-left: 30;
    }

    .designer-label {
        margin-right: 10;
        padding: 5 8;
        font-size: 22;
        color: #fff;
        background-color: #353535;
        border-radius: 4;
        margin-top: 5;
    }

    .designer-label-zone {
        flex-direction: row;
    }
</style>
