<template>
      <div>
          <scroller :style="{height:`${pageHeight}px`}">
                  <div class="message" v-for="(noticeItem,index) in newsArray" :key="index">
                      <bui-swipe-cell @actionClick="clickmenu(noticeItem.id)"
                                      :items="btnAry"
                                      :height="'150px'">
                          <div slot="content" class="content-items"  @click="jumpPages(noticeItem, noticeItem.newsType, noticeItem.newsId, noticeItem.creater, noticeItem.modifierName, noticeItem.id, userInfo)">
                              <div class="items-left">
                                  <image src="bmlocal://assets/images/xingjiename.png" style="width: 80px;height: 80px;"></image>
                              </div>
                              <div class="items-right">
                                  <text class="item-top" v-if="noticeItem.isRead === '0'">{{noticeItem.remark}}</text>
                                  <text class="item-newtop" v-else>{{noticeItem.remark}}</text>
                                  <text class="newsTime-font" v-if="noticeItem.isRead === '0'">{{noticeItem.createTime}}</text>
                                  <text class="newsTime-newfont" v-else>{{noticeItem.createTime}}</text>
                              </div>
                          </div>
                      </bui-swipe-cell>
                  </div>
          </scroller>
      </div>
</template>
<script>
    import { getNews } from '../service/userApi'
    import { getUserInfoById } from '../service/userApi'
    import { deleteMessage } from '../service/homeAtj.Api'
    import { buiSwipeCell } from 'bui-weex'
    import { updateNews } from '../service/userApi'
    const animation = weex.requireModule('animation')
    import mixins from '../common/mixins'
    export default ({
        mixins: [mixins],
        components: {
            buiSwipeCell
        },
        props: {
            itemData: Object,
            index: Number
        },
        data () {
            return {
                newsArray: [],
                userInfo: {
                    nickname: ''
                },
                btnAry: [
                    {
                        'title': '删除',
                        'bgcolor': '#E60012'
                    }
                ]
            }
        },
        methods: {
            async getNewsContent (id) {
                const result = await getNews(id)
                if (result && result.bizNewsAppDtos) {
                    this.newsArray = result.bizNewsAppDtos
                }
            },
            async clickmenu (id) {
                const result = await deleteMessage(id)
                if (result.text === '消息删除成功') {
                    this.getNewsContent(this.userId)
                }
            },
            async checkProject () {
                if (this.userId) {
                    this.userInfo = await getUserInfoById(this.userId)
                } else {
                    setTimeout(() => {
                        this.checkProject()
                    }, 500)
                }
            },
            async jumpPages (noticeItem, type, newsId, creater, modifierName, id, userInfo) {
                if (type === 'MaterialShould') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('feeDetails.allFees', { id: newsId })
                } else if (type === 'BaseReality') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('feeDetails.feeDetails', { id: newsId })
                } else if (type === 'DesignReality') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('contract.coatDetail', { id: newsId, type: 1 })
                } else if (type === 'Measure') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('atjia.index', { id: newsId, userInfo: userInfo, dynamic: 1 })
                } else if (type === 'Graphic') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('others.draw', { pageP: 0, graphicId: newsId })
                } else if (type === 'Depth') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('others.draw', { page: 1, depthId: newsId })
                } else if (type === 'Offer') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('allOrders.allOrders', { id: newsId })
                } else if (type === 'Report') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('atjia.index', { id: newsId, userInfo: userInfo, dynamic: 4 })
                } else if (type === 'Construction') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('others.report', { id: newsId, name: modifierName, qualityInspectorId: creater })
                } else if (type === 'BaseChange') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    return ''
                } else if (type === 'MaterialReality') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('feeDetails.allFees', { id: newsId })
                } else if (type === 'MaterialChange') {
                    return ''
                } else if (type === 'Back') {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    return ''
                } else {
                    await updateNews(id)
                    noticeItem.isRead = 0
                    this.goTo('contract.list', { id: newsId })
                }
            }
        },
        created () {
            this.getNewsContent(this.userId)
            this.checkProject()
        }
    })
</script>
<style lang="scss" src="../../../node_modules/bui-weex/src/css/buiweex.scss"></style>
<style lang="scss" scoped>
    @import "../../assets/css/base.scss";

    .message {
        width: 750px;
        margin-top: 20px;
        background:rgba(255,255,255,1);
    }

    .newsWrap {
        width: 750px;
        align-items: center;
    }

    .newsTime {
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #EEEEEE;
        justify-content: center;
        align-items: center;
        border-radius:10px;
        width: 300px;
        height: 50px;
    }

    .newsTime-font {
        color: #999999;
        font-size: 30px;
        font-weight: bold;
    }

    .newsTime-newfont {
        color: #999999;
        font-size: 30px;
    }

    .item-top {
        font-size: 28px;
        margin-bottom: 20px;
        color: #999999;
        font-weight: bold;
    }

    .item-newtop {
        font-size: 28px;
        margin-bottom: 20px;
        color: #999999;
    }

    .item-center {
        font-size: 30px;
        color: #333333;
    }

    .items-left {
        width: 90px;
        align-items: center;
        margin-left: 40px;
    }

    .content-items {
        flex-direction: row;
        align-items: center;
        align-content: center;
        width: 700px;
        height: 150px;
        background-color: #FFFFFF;
        border-radius:10px;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.1)
    }

    .items-right {
        margin-left: 20px;
    }
</style>

