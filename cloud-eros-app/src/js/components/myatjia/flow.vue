<template>
    <div class="item-container">
        <div class="item-container-box">
            <div class="business-left">
                <div class="business-time"></div>
            </div>
            <div class="business-right">
                <div class="business-content-box1 top-border">
                    <text class="business-content-box1-p1">{{itemName}}</text>
                </div>
            </div>
            <div class="business-process-red"></div>
        </div>
        <div class="item-container-box" v-for="(item, index) in newItems" :key="index" v-if="newItems.length">
            <div class="business-left" v-if="isActive !== 0 && item.againStage === code || item.stopStage === code">
                <div v-if="item.againDate">
                    <div class="business-time" v-if="item.againDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.againDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-time" v-else>
                        <text class="business-time-p4">{{$dayjs(item.againDate).format('MM-DD')}}</text>
                    </div>
                    <div class="business-newtime" v-if="item.stopDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.stopDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-newtime" v-else>
                        <text class="business-time-p4">{{$dayjs(item.stopDate).format('MM-DD')}}</text>
                    </div>
                </div>
                <div v-else>
                    <div class="business-time" v-if="item.stopDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.stopDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-time" v-else>
                        <text class="business-time-p4">{{$dayjs(item.stopDate).format('MM-DD')}}</text>
                    </div>
                </div>
            </div>
            <div class="business-left" v-if="isActive === 0 && (item.againStage || item.stopStage) && item.againStage !== code && item.stopStage !== code">
                <div v-if="item.againDate">
                    <div class="business-time" v-if="item.againDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.againDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-time" v-else>
                        <text class="business-time-p4">{{$dayjs(item.againDate).format('MM-DD')}}</text>
                    </div>
                    <div class="business-newtime" v-if="item.stopDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.stopDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-newtime" v-else>
                        <text class="business-time-p4">{{$dayjs(item.stopDate).format('MM-DD')}}</text>
                    </div>
                </div>
                <div v-if="item.stopDate && !item.againDate">
                    <div class="business-time" v-if="item.stopDate && item.flag === 1">
                        <text class="business-time-p2">{{$dayjs(item.stopDate).format('YYYY-MM-')}}</text>
                    </div>
                    <div class="business-time" v-else>
                        <text class="business-time-p4">{{$dayjs(item.stopDate).format('MM-DD')}}</text>
                    </div>
                </div>
            </div>
            <div class="business-left" v-if="item.title==='量房' && !item.againStage && !item.stopStage">
                <div class="business-time" v-if="item.creatTime && item.flag === 1">
                    <text class="business-time-p2">{{$dayjs(item.creatTime).format('YYYY-MM-')}}</text>
                    <!--<text class="business-time-p2">{{$dayjs(item.creatTime).format('DD-HH:mm')}}</text>-->
                </div>
                <div class="business-time" v-else>
                    <text class="business-time-p4">{{$dayjs(item.creatTime).format('MM-DD')}}</text>
                    <!--<text class="business-time-p2">{{$dayjs(item.creatTime).format('HH:mm')}}</text>-->
                </div>
            </div>
            <div class="business-left" v-if="item.title!=='量房' && !item.againStage && !item.stopStage">
                <div class="business-time" v-if="item.creatTime && item.flag === 1">
                    <text class="business-time-p2">{{$dayjs(item.creatTime).format('YYYY-MM-')}}</text>
                    <text class="business-time-p2">{{$dayjs(item.creatTime).format('DD-HH:mm')}}</text>
                </div>
                <div class="business-time" v-else>
                    <text class="business-time-p4">{{$dayjs(item.creatTime).format('MM-DD')}}</text>
                    <text class="business-time-p2">{{$dayjs(item.creatTime).format('HH:mm')}}</text>
                </div>
            </div>
            <div class="business-right" v-if="item.againStage === code || item.stopStage === code">
                <text v-if="item.title !== '随手笔记' && isActive === 0 && item.title !== '项目汇报' && item.title !== '质检验收' && item.title !== '待办事项' && item.title !== '项目状态'">{{item.title}}</text>
                <div class="business-content-box1" v-if="item.title!=='量房'&&item.title!=='初步设计'&&item.title!=='深化设计'">
                    <text class="business-content-box1-p1" v-if="item.title==='质检验收' && item.status===4">{{item.title}}(合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title==='质检验收' && item.status===3">{{item.title}}(不合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title!=='项目状态'">{{item.title}}</text>
                </div>
                <div class="business-content-newbox2" v-if="!item.againRemark && !item.stopRemark">
                    <text class="business-content-box2-p1">{{item.describe}}</text>
                    <div v-if="item.title === '随手笔记'" class="handy-edit">
                        <text class="edit-font" @click="commentClick(index, item.id)">继续编辑</text>
                    </div>
                    <comment-input class="commentButton" v-if="index === status" @clickedHidePanel="clickShow" type="1"></comment-input>
                </div>
                <div class="business-content-newbox2" v-if="item.againRemark">
                    <text class="business-content-box1-Newp1" v-if="item.title==='项目状态' && item.againRemark">{{item.title}}·已复工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.againRemark">复工原因:{{item.againRemark}}</text>
                    <img-list :items="item.againBusinessIds" v-if="item.againBusinessIds"></img-list>
                </div>
                <div class="business-content-newbox2" v-if="item.stopRemark">
                    <text class="business-content-box1-newp1" v-if="item.title==='项目状态' && item.stopRemark">{{item.title}}·已停工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.stopRemark">停工原因:{{item.stopRemark}}</text>
                    <img-list :items="item.stopBusinessIds" v-if="item.stopBusinessIds"></img-list>
                </div>
                <div class="tags-image" v-for="(imgItem,index) in item.photoIds" :key="index" v-if="item.photoIds">
                    <img-list :items="imgItem.businessId" v-if="imgItem.businessId"></img-list>
                    <img-list :items="imgItem" v-else></img-list>
                </div>
                <div class="business-content-box3" v-if="item.businessIds">
                    <div class="tags-image" v-for="(imgItem,index) in item.businessIds" :key="index">
                        <div class="textArrangement" v-if="item.title==='量房'">
                            <div class="arrangementLeft">
                                <text class="tags-text">设计师·{{itemNameDesign}}</text>
                            </div>
                            <div class="arrangementRight">
                                <text class="tags-anotherText">{{item.orgName}}</text>
                            </div>
                        </div>
                        <text v-if="imgItem">{{imgItem.describe}}</text>
                        <img-list :items="imgItem"></img-list>
                        <div v-if="item.title === '质检验收'" class="handy-edit" @click="goTo('others.report', {id:id,name:name,qualityInspectorId:qualityInspectorId})">
                            <text class="edit-font">查看全部</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="business-right" v-if="isActive === 0 && (item.againStage || item.stopStage)">
                <text v-if="item.title !== '随手笔记' && isActive === 0 && item.title !== '项目汇报' && item.title !== '质检验收' && item.title !== '待办事项' && item.title !== '项目状态'">{{item.title}}</text>
                <div class="business-content-box1" v-if="item.title!=='量房'&&item.title!=='初步设计'&&item.title!=='深化设计'">
                    <text class="business-content-box1-p1" v-if="item.title==='质检验收' && item.status===4">{{item.title}}(合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title==='质检验收' && item.status===3">{{item.title}}(不合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title!=='项目状态'">{{item.title}}</text>
                </div>
                <div class="business-content-newbox2" v-if="!item.againRemark && !item.stopRemark">
                    <text class="business-content-box2-p1">{{item.describe}}</text>
                    <div v-if="item.title === '随手笔记'" class="handy-edit">
                        <text class="edit-font" @click="commentClick(index, item.id)">继续编辑</text>
                    </div>
                    <comment-input class="commentButton" v-if="index === status" @clickedHidePanel="clickShow" type="1"></comment-input>
                </div>
                <div class="business-content-newbox2" v-if="item.againRemark">
                    <text class="business-content-box1-Newp1" v-if="item.title==='项目状态' && item.againRemark">{{item.title}}·已复工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.againRemark">复工原因:{{item.againRemark}}</text>
                    <img-list :items="item.againBusinessIds"v-if="item.againBusinessIds"></img-list>
                </div>
                <div class="business-content-newbox2" v-if="item.stopRemark">
                    <text class="business-content-box2-p1" v-if="commentIndex === index">{{note}}</text>
                    <text class="business-content-box1-newp1" v-if="item.title==='项目状态' && item.stopRemark">{{item.title}}·已停工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.stopRemark">停工原因:{{item.stopRemark}}</text>
                    <img-list :items="item.stopBusinessIds" v-if="item.stopBusinessIds"></img-list>
                </div>
                <div class="tags-image" v-for="(imgItem,index) in item.photoIds" :key="index" v-if="!item.againRemark && !item.stopRemark">
                    <img-list :items="imgItem.businessId" v-if="imgItem.businessId"></img-list>
                    <img-list :items="imgItem" v-else></img-list>
                </div>
                <div class="business-content-box3" v-if="item.businessIds && !item.againRemark && !item.stopRemark">
                    <div class="tags-image" v-for="(imgItem,index) in item.businessIds" :key="index">
                        <div class="textArrangement" v-if="item.title==='量房'">
                            <div class="arrangementLeft">
                                <text class="tags-text">设计师·{{itemNameDesign}}</text>
                            </div>
                            <div class="arrangementRight">
                                <text class="tags-anotherText">{{item.orgName}}</text>
                            </div>
                        </div>
                        <text v-if="imgItem">{{imgItem.describe}}</text>
                        <img-list :items="imgItem"></img-list>
                        <div v-if="item.title === '质检验收'" class="handy-edit" @click="goTo('others.report', {id:id,name:name,qualityInspectorId:qualityInspectorId})">
                            <text class="edit-font">查看全部</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="business-right" v-if="item.title==='量房' && !item.againStage && !item.stopStage">
                <text v-if="item.title !== '随手笔记' && isActive === 0 && item.title !== '项目汇报' && item.title !== '质检验收' && item.title !== '待办事项' && item.title !== '项目状态'">{{item.title}}</text>
                <div class="business-content-box1" v-if="item.title!=='量房'&&item.title!=='初步设计'&&item.title!=='深化设计'">
                    <text class="business-content-box1-p1" v-if="item.title==='质检验收' && item.status===4">{{item.title}}(合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title==='质检验收' && item.status===3">{{item.title}}(不合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title!=='项目状态'">{{item.title}}</text>
                </div>
                <div class="business-content-box2" v-if="!item.againRemark && !item.stopRemark">
                    <text class="business-content-box2-p1">{{item.describe}}</text>
                    <div v-if="item.title === '随手笔记'" class="handy-edit">
                        <text class="edit-font" @click="commentClick(index, item.id)">继续编辑</text>
                    </div>
                    <comment-input class="commentButton" v-if="index === status" @clickedHidePanel="clickShow" type="1"></comment-input>
                </div>
                <div class="business-content-box2" v-if="item.againRemark">
                    <text class="business-content-box1-Newp1" v-if="item.title==='项目状态' && item.againRemark">{{item.title}}·已复工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.againRemark">复工原因:{{item.againRemark}}</text>
                    <img-list :items="item.againBusinessIds"v-if="item.againBusinessIds"></img-list>
                </div>
                <div class="business-content-box2" v-if="item.stopRemark">
                    <text class="business-content-box2-p1" v-if="commentIndex === index">{{note}}</text>
                    <text class="business-content-box1-newp1" v-if="item.title==='项目状态' && item.stopRemark">{{item.title}}·已停工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.stopRemark">停工原因:{{item.stopRemark}}</text>
                    <img-list :items="item.stopBusinessIds" v-if="item.stopBusinessIds"></img-list>
                </div>
                <div class="tags-image" v-for="(imgItem,index) in item.photoIds" :key="index" v-if="!item.againRemark && !item.stopRemark">
                    <img-list :items="imgItem.businessId" v-if="imgItem.businessId"></img-list>
                    <img-list :items="imgItem" v-else></img-list>
                </div>
                <div class="business-content-box3" v-if="item.businessIds && !item.againRemark && !item.stopRemark">
                    <div class="tags-image" v-for="(imgItem,index) in item.businessIds" :key="index">
                        <div class="textArrangement" v-if="item.title==='量房'">
                            <div class="arrangementLeft">
                                <text class="tags-text">设计师·{{itemNameDesign}}</text>
                            </div>
                            <div class="arrangementRight">
                                <text class="tags-anotherText">{{item.orgName}}</text>
                            </div>
                        </div>
                        <text v-if="imgItem">{{imgItem.describe}}</text>
                        <img-list :items="imgItem"></img-list>
                        <div v-if="item.title === '质检验收'" class="handy-edit" @click="goTo('others.report', {id:id,name:name,qualityInspectorId:qualityInspectorId})">
                            <text class="edit-font">查看全部</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="business-right" v-if="item.title!=='量房' && !item.againStage && !item.stopStage">
                <text v-if="item.title !== '随手笔记' && isActive === 0 && item.title !== '项目汇报' && item.title !== '质检验收' && item.title !== '待办事项' && item.title !== '项目状态'">{{item.title}}</text>
                <div class="business-content-box1" v-if="item.title!=='量房'&&item.title!=='初步设计'&&item.title!=='深化设计'">
                    <text class="business-content-box1-p1" v-if="item.title==='质检验收' && item.status===4">{{item.title}}(合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title==='质检验收' && item.status===3">{{item.title}}(不合格)</text>
                    <text class="business-content-box1-p1" v-else-if="item.title!=='项目状态'">{{item.title}}</text>
                </div>
                <div class="business-content-box2" v-if="!item.againRemark && !item.stopRemark">
                    <text class="business-content-box2-p1">{{item.describe}}</text>
                    <div v-if="item.title === '随手笔记'" class="handy-edit">
                        <text class="edit-font" @click="commentClick(index, item.id)">继续编辑</text>
                    </div>
                    <comment-input class="commentButton" v-if="index === status" @clickedHidePanel="clickShow" type="1"></comment-input>
                </div>
                <div class="business-content-box2" v-if="item.againRemark">
                    <text class="business-content-box1-Newp1" v-if="item.title==='项目状态' && item.againRemark">{{item.title}}·已复工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.againRemark">复工原因:{{item.againRemark}}</text>
                    <img-list :items="item.againBusinessIds"v-if="item.againBusinessIds"></img-list>
                </div>
                <div class="business-content-box2" v-if="item.stopRemark">
                    <text class="business-content-box2-p1" v-if="commentIndex === index">{{note}}</text>
                    <text class="business-content-box1-p1" v-if="item.title==='项目状态' && item.stopRemark">{{item.title}}·已停工</text>
                    <text class="business-content-box2-p1" v-if="item.title==='项目状态' && item.stopRemark">停工原因:{{item.stopRemark}}</text>
                    <img-list :items="item.stopBusinessIds" v-if="item.stopBusinessIds"></img-list>
                </div>
                <div class="tags-image" v-for="(imgItem,index) in item.photoIds" :key="index" v-if="!item.againRemark && !item.stopRemark">
                    <img-list :items="imgItem.businessId" v-if="imgItem.businessId"></img-list>
                    <img-list :items="imgItem" v-else></img-list>
                </div>
                <div class="business-content-box3" v-if="item.businessIds && !item.againRemark && !item.stopRemark">
                    <div class="tags-image" v-for="(imgItem,index) in item.businessIds" :key="index">
                        <div class="textArrangement" v-if="item.title==='量房'">
                            <div class="arrangementLeft">
                                <text class="tags-text">设计师·{{itemNameDesign}}</text>
                            </div>
                            <div class="arrangementRight">
                                <text class="tags-anotherText">{{item.orgName}}</text>
                            </div>
                        </div>
                        <text v-if="imgItem">{{imgItem.describe}}</text>
                        <img-list :items="imgItem"></img-list>
                        <div v-if="item.title === '质检验收'" class="handy-edit" @click="goTo('others.report', {id:id,name:name,qualityInspectorId:qualityInspectorId})">
                            <text class="edit-font">查看全部</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="business-process" v-if="!item.againDate && !item.stopStage"></div>
            <div class="business-process" v-if="item.againDate"></div>
            <div class="business-newprocess" v-if="item.stopDate && item.againDate"></div>
            <div class="business-process" v-else-if="item.stopDate && !item.againDate"></div>
        </div>
    </div>
</template>

<script>
    import imgList from '../../components/imgList'
    import mixins from '../../common/mixins'
    import { getImgUrls } from '../../service/baseApi'
    import { editNote } from '../../service/atjiaApi'
    import commentInput from '../../components/commentInput'

export default {
        props: {
            // 数据s
            items: {
                type: Array
            },
            code: {
                type: String
            },
            itemName: {
                type: String
            },
            itemNameDesign: {
                type: String
            },
            isActive: {
                type: Number
            },
            id: {
                type: Number
            },
            name: {
                type: String
            },
            qualityInspectorId: {
                type: Number
            },
            // 自定义
            customStyles: {
                type: Object,
                default: () => ({})
            }
        },
        data () {
            return {
                dayDate: null,
                dayShiFen: null,
                imgUrlArrayList: null,
                status: -1,
                commentId: '',
                note: '',
                commentIndex: -2
            }
        },
        mixins: [mixins],
        components: {
            imgList,
            commentInput
        },
        watch: {
            items () {
                this.status = -1
            },
            isActive (val) {
                this.isActive = val
            }
        },
        computed: {
            newItems () {
                return this.initItems(this.items)
            }
        },
        methods: {
            async clickShow (val) {
                this.note = val
                this.commentIndex = this.status
                const submitData = {
                    'note': val
                }
                await editNote(this.commentId, submitData)
                this.$emit('clickShow', this.isActive)
                this.status = -1
            },
            commentClick (index, id) {
                this.status = index
                this.commentId = id
            },
            async getImgUrl (id) {
                const result = await getImgUrls(id)
                return result.data
            },

            getDate () {
                const time = this.$dayjs(this.items.creatTime)
                this.dayDate = time.format('MM-DD')
                this.dayShiFen = time.format('HH:mm')
            },
            _click (index) {
                this.$emit('click', index)
            },
            initItems (items) {
                const {
                    lineColor,
                    pointInnerColor,
                    pointBorderColor
                } = this.customStyles
                const pre = Date.now()

                return items.map((item, index) => {
                    item.key = `${pre}_${index}`
                    item.pointStyle = {}
                    item.lineStyle = {}
                    item.titleStyle = {}
                    item.contentStyle = {}

                    if (lineColor) item.lineStyle.backgroundColor = lineColor
                    if (pointInnerColor) item.pointStyle.backgroundColor = pointInnerColor
                    if (pointBorderColor) item.pointStyle.borderColor = pointBorderColor

                    if (item.highlight) {
                        item.contentStyle.color = '#444444'
                        item.titleStyle.color = '#E60012'
                        item.pointStyle.backgroundColor = '#E60012'
                        item.pointStyle.borderColor = '#E60012'
                    }
                    return item
                })
            }
        },
        async created () {
            await this.getDate()
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
        width: 160px;
        padding-bottom: 50px;
        /*flex-direction: row;*/
    }

    .business-time {
        width: 120px;
        position: relative;
    }

    .business-newtime {
        width: 120px;
        position: relative;
        margin-top: 270px;
    }

    .business-process {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #cbcbcb;
        position: absolute;
        top: 0;
        left: 147px;
    }

    .business-newprocess {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #cbcbcb;
        position: absolute;
        top: 296px;
        left: 147px;
    }

    .business-process-red {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #E60012;
        position: absolute;
        top: 0;
        left: 141px;
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

    .business-time-p4 {
        height: 30px;
        font-size: 30px;
        color: #666666;
        line-height: 30px;
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
        width: 590px;
        padding-bottom: 50px;
        padding-left: 50px;
        border-left-color: #cbcbcb;
        border-left-width: 1px;
        border-left-style: solid;
    }

    .business-newright {
        width: 590px;
        padding-bottom: 0;
        /*padding-bottom: 50px;*/
        padding-left: 50px;
        border-left-color: #cbcbcb;
        border-left-width: 1px;
        border-left-style: solid;
        background-color: #EEEEEE;
    }

    .new-whiteline {
        width: 620px;
        background-color: #FFFFFF;
        height: 10px;
        margin-left: -80px;
    }

    .business-content-box1 {
        flex-direction: row;
        justify-content: space-between;
        width: 516px;
    }

    .business-content-box1-p1 {
        color: #333333;
        font-size: 30px;
    }

    .business-content-box1-p5 {
        color: #E60012;
        font-size: 30px;
    }

    .business-content-box1-p2 {
        font-size: 30px;
    }

    .business-content-newbox2 {
        height: 250px;
        /*height: 270px;*/
        /*height: 320px;*/
    }

    .business-content-box2-p1 {
        margin-top: 10px;
        font-size: 28px;
        color: #737685;
    }

    .business-content-box1-newp1 {
         margin-top: 40px;
         font-size: 30px;
         color: #E60012;
     }
    .business-content-box1-newlp1 {
        font-size: 30px;
        color: #E60012;
    }

    .business-content-box1-Newp1 {
        /*margin-top: 10px;*/
        font-size: 30px;
        /*color: #737685;*/
        color: #E60012;
    }

    .business-content-box2-newp1 {
        margin-top: 40px;
        font-size: 30px;
        color: #E60012;
    }

    .handy-edit {
        height: 50px;
        width: 150px;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        border-left-color: #E60012;
        border-left-width: 1px;
        border-left-style: solid;
        border-right-color: #E60012;
        border-right-width: 1px;
        border-right-style: solid;
        border-top-color: #E60012;
        border-top-width: 1px;
        border-top-style: solid;
        border-bottom-color: #E60012;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .edit-font {
        color: #E60012
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

    .top-border{
        padding-bottom: 40px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #DBD6D6;
    }

    .commentButton {
        margin-top: 20px;
        /*margin-right: 100px*/
        /*margin-right: 50px;*/
    }
</style>
