<template>
   <scroller :style="{height:`${pageHeight}px`}">
          <div class="message"  v-for="(commentsItem,index) in dataComment"  :key="index">
              <bui-swipe-cell @actionClick="clickmenu(commentsItem.id)"
                              :items="btnAry"
                              :height="'200px'">
                  <div slot="content" class="comment-item">
                      <div class="right-item">
                          <image class="comment-avatar" resize="cover" :src="getImageUrl(commentsItem.viewImage)"></image>
                      </div>
                      <div class="comment-contain">
                          <div class="comment-header">
                              <text class="font-28">{{commentsItem.commentUserName}}评论了</text>
                              <text class="comment-name font-26" @click="toDetail(commentsItem.commentType,commentsItem.businessId)" v-if="commentsItem.commentType==4">{{commentsItem.deName}}</text>
                              <text class="comment-name font-26" @click="toDetail(commentsItem.commentType,commentsItem.businessId)" v-else>#{{commentsItem.title}}#</text>
                          </div>
                          <text class="font-26">{{$dayjs().to($dayjs(commentsItem.commentTime))}}</text>
                          <text class="comment-content font-28">{{commentsItem.commentContent}}</text>
                      </div>
                  </div>
              </bui-swipe-cell>
          </div>
   </scroller>
</template>

<script>
    const animation = weex.requireModule('animation')
    import { buiSwipeCell } from 'bui-weex'
    import mixins from '../common/mixins'
    import { getAllPraiseByCusId } from '../service/commentApi'
    import { deleteComment } from '../service/homeAtj.Api'
    export default {
        name: 'commentItem',
        components: {
            buiSwipeCell
        },
        mixins: [mixins],
        data () {
            return {
                dataComment: [],
                leftTitle: '',
                leftTitle2: '',
                linkTitle: '',
                rightTitle: '',
                rightTitle2: '',
                timeShow: '',
                page: 1,
                btnAry: [
                    {
                        'title': '删除',
                        'bgcolor': '#E60012'
                    }
                ]
            }
        },
        async created () {
            await this.getMessage()
        },
        methods: {
            async clickmenu (id) {
                const arr = []
                arr.push(id)
                const result = await deleteComment(arr)
                if (result.type === 'success') {
                    this.getMessage()
                }
            },
            async getMessage () {
                const result = await getAllPraiseByCusId({
                    'export': true,
                    'orderBy': '',
                    'page': this.page,
                    'pageSize': 10,
                    'queryParamList': []
                })
                this.dataComment = result.content
                for (const value of this.dataComment) {
                    const stringTime = value.commentTime
                    let timestamp2 = this.$dayjs(stringTime)
                    timestamp2 = timestamp2 / 1000
                    let timestamp = this.$dayjs(new Date())
                    timestamp = timestamp / 1000

                    const timeInfo = timestamp - timestamp2

                    if (timeInfo < 60) {
                        this.timeShow = String(timeInfo) + '秒前'
                    }

                    if (timeInfo > 60 && timeInfo < 3600) {
                        this.timeShow = String((timeInfo / 60).toFixed()) + '分前'
                    }

                    if (timeInfo > 3600 && timeInfo < 216000) {
                        this.timeShow = String((timeInfo / 3600).toFixed()) + '小时前'
                    }

                    if (timeInfo > 216000) {
                        this.timeShow = String((timeInfo / 216000).toFixed()) + '天前'
                    }
                    if (!value.parentComment) {
                        this.leftTitle = '你评论了'
                        this.rightTitle = ''
                    } else {
                        this.leftTitle = ''
                        this.rightTitle = '回复了你的评论'
                        this.leftTitle2 = '回复了你对'
                        this.rightTitle2 = '的评论'
                    }
                    if (value.commentType === '4') {
                        this.linkTitle = value.deName
                    } else {
                        this.linkTitle = '#' + value.title + '#'
                    }
                }
            },
            toDetail (commentType, businessId) {
                if (commentType === '0') {
                    // 案例详情
                    this.goTo('design.case', { id: businessId })
                }
                if (commentType === '1') {
                    // 楼盘详情
                    this.goTo('estate.details', { id: businessId })
                }
                if (commentType === '2') {
                    // 门店详情
                    this.goTo('store.details', { id: businessId })
                }
                if (commentType === '3') {
                    // 工地详情
                    this.goTo('con.details', { id: businessId })
                }
                if (commentType === '4') {
                    // 设计师详情
                    this.goTo('design.designer', { id: businessId })
                }
                if (commentType === '5') {
                    // 软文详情
                    this.goTo('home.newsDetails', { id: businessId })
                }
            }
        }
        // mounted () {
        //     console.log(1)
        //     console.log('我的评论-------', JSON.stringify(this.commentsItem))
        //     const stringTime = this.commentsItem.commentTime
        //     let timestamp2 = this.$dayjs(stringTime)
        //     timestamp2 = timestamp2 / 1000
        //     let timestamp = this.$dayjs(new Date())
        //     timestamp = timestamp / 1000
        //
        //     const timeInfo = timestamp - timestamp2
        //
        //     if (timeInfo < 60) {
        //         this.timeShow = String(timeInfo) + '秒前'
        //     }
        //
        //     if (timeInfo > 60 && timeInfo < 3600) {
        //         this.timeShow = String((timeInfo / 60).toFixed()) + '分前'
        //     }
        //
        //     if (timeInfo > 3600 && timeInfo < 216000) {
        //         this.timeShow = String((timeInfo / 3600).toFixed()) + '小时前'
        //     }
        //
        //     if (timeInfo > 216000) {
        //         this.timeShow = String((timeInfo / 216000).toFixed()) + '天前'
        //     }
        //     if (!this.commentsItem.parentComment) {
        //         this.leftTitle = '你评论了'
        //         this.rightTitle = ''
        //     } else {
        //         this.leftTitle = ''
        //         this.rightTitle = '回复了你的评论'
        //         this.leftTitle2 = '回复了你对'
        //         this.rightTitle2 = '的评论'
        //     }
        //     if (this.commentsItem.commentType === '4') {
        //         this.linkTitle = this.commentsItem.deName
        //     } else {
        //         this.linkTitle = '#' + this.commentsItem.title + '#'
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/base";
    .message {
        width: 750px;
        background:rgba(255,255,255,1);
    }
    .comment-item {
        flex-direction: row;
        margin-top: 40px;
        margin-left: 20px;
        /*height:400;*/
        width: 750px;
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
        width: 600px;
        flex-direction: row;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        lines: 1;
    }

    .comment-name {
        width: 350px;
        font-size: 32;
        color: dodgerblue;
        text-overflow: ellipsis;
        lines: 1;
    }

    .user-handdle {
        flex-direction: row;
        width: 160;
        justify-content: space-around;
        align-items: center;
    }

    .comment-content {
        margin-top: 20;
        color: #353535;
        font-size: 32;
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
</style>
