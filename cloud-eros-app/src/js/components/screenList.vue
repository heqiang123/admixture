<template>
    <div class="box">
        <div class="list">
            <down-menu name="智能排序" @chooseValue="chooseDes" :data="sortData"></down-menu>
            <screen-menu @reset="reset" v-for="(item,index) of tagDataList" :item="item" :key="index" @chooseValue="chooseValue"></screen-menu>
        </div>
       <scroller class="tag-list" scroll-direction="horizontal" style="height: 80px;flex-direction: row;" v-if="temptags.length > 0">
               <div class="tags" v-for="(tag, index) of temptags" :key="index">
                   <text class="tag-texts">{{tag.name}}</text>
                   <text class="icons" @click="closeTag(tag,index)">&#xe76c;</text>
               </div>
       </scroller>
    </div>

</template>

<script>
    import screenMenu from './screenMenu'
    import downMenu from './downMenu'
    import { getTags } from '../service/baseApi'
    import MulMenu from './mulMenu'

    export default {
        name: 'screenList',
        props: {
            type: {
                type: Number,
                default: ''
            },
            sortData: {
                type: Array
            }

        },
        components: { screenMenu, MulMenu, downMenu },
        data () {
            return {
                state: {
                    isShow: false
                },
                tagDataList: {},
                tags: [],
                temptags: [],
                keys: [],
                paramsTag: []
            }
        },
        watch: {
            type (val) {
                this.type = val
            },
            temptags (val) {
                this.temptags = val
            }
        },
        methods: {
            chooseDes (sort) {
                this.$emit('chooseDes', sort)
            },
            reset (e) {
                const parentId = e.parentId
                const list = this.tagDataList[parentId].arry
                const paramsTag = this.paramsTag
                const taglist = this.temptags
                for (let i = 0; i < list.length; i++) {
                    list[i].selected = false
                }
                for (let i = 0; i < taglist.length; i++) {
                    if (parentId === taglist[i].parentId) {
                        taglist.splice(i, taglist.length)
                    }
                }
                for (let i = 0; i < paramsTag.length; i++) {
                    if (parentId === paramsTag[i].key) {
                        paramsTag[i].tags = []
                    }
                }
                this.$emit('reset', { paramsTag: paramsTag })
            },
            closeTag (obj, index) {
                const paramsTag = this.paramsTag
                const tagDataList = this.tagDataList
                this.temptags.splice(index, 1)
                for (let i = 0; i < paramsTag.length; i++) {
                    if (obj.parentId === paramsTag[i].key) {
                        for (let j = 0; j < paramsTag[i].tags.length; j++) {
                            if (obj.code === paramsTag[i].tags[j]) {
                                paramsTag[i].tags.splice(j, 1)
                            }
                        }
                    }
                }
                const tagsArr = tagDataList[obj.parentId].arry
                for (let i = 0; i < tagsArr.length; i++) {
                    if (obj.code === tagsArr[i].code) {
                        tagsArr[i].selected = false
                    }
                }
                this.tagDataList[obj.parentId].arry = tagsArr
                this.$emit('chooseValue', { paramsTag: this.paramsTag, temptags: this.temptags })
            },
            chooseValue (e) {
                this.tagDataList[e.key] = e.item
                const keys = this.keys
                const obj = this.tagDataList
                const paramsTag = this.paramsTag
                const tempList = []
                const tempParams = []
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i]
                    const arr = obj[key].arry
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].selected) {
                            tempList.push(arr[j])
                        }
                    }
                }
                this.temptags = tempList

                for (let i = 0; i < paramsTag.length; i++) {
                    paramsTag[i].tags = []
                }

                for (let i = 0; i < paramsTag.length; i++) {
                    for (let j = 0; j < tempList.length; j++) {
                        const pid = tempList[j].parentId
                        if (paramsTag[i].key === pid) {
                            paramsTag[i].tags.push(tempList[j].code)
                        }
                    }
                }
                this.$emit('chooseValue', { paramsTag: this.paramsTag, temptags: this.temptags })
            },
            async getTagList () {
                const taglist = {}
                const paramsTag = []
                this.keys = []
                const tagData = await getTags(this.type)
                for (let index = 0; index < tagData.length; index++) {
                    if (!tagData[index].parentId) {
                        if (tagData[index].id) {
                            this.keys.push(tagData[index].id)
                            if (!taglist[tagData[index].id]) {
                                taglist[tagData[index].id] = {
                                    id: tagData[index],
                                    arry: []
                                }
                            }
                        }
                    }
                }
                for (let index = 0; index < tagData.length; index++) {
                    if (taglist[tagData[index].parentId]) {
                        const newTagData = tagData[index]
                        newTagData.selected = false
                        taglist[tagData[index].parentId].arry.push(newTagData)
                    }
                }
                const keys = this.keys
                for (let i = 0; i < keys.length; i++) {
                    const obj = {}
                    obj['key'] = keys[i]
                    obj['tags'] = []
                    paramsTag.push(obj)
                }
                this.paramsTag = paramsTag
                this.tagDataList = taglist
            }
        },
        async mounted () {
            if (this.type) {
                this.getTagList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .down-menu {
        flex-direction: row;
        align-items: center;
        margin: 0 6;
        padding: 0 12;
        height: 56;
        color: '#212121';
        border-top-style: solid;
        border-top-color: #e0e0e0;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #e0e0e0;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #e0e0e0;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #e0e0e0;
        border-right-width: 2;
    }

    .down-icon {
        font-family: iconfont;
        font-size: 36;
    }

    .tag-list {
        /*flex-direction: row;*/
        /*flex-wrap: wrap;*/
        width: 710px;
        height: 54px;
    }

    .box {
        flex-direction: column;
        width: 750px;
        padding: 0 20px;
        background-color: #fff;
    }

    .list {
        flex-direction: row;
        align-items: center;
        align-content: center;
        width: 710px;
        height: 96px;
    }

    .tags {
        flex-direction: row;
        align-items: center;
        margin-right: 15;
        line-height: 44px;
        height: 44px;
        padding: 0px 16px;
        background-color: #353535;
        border-radius: 200;
    }

    .tag-texts {
        font-size: 24;
        color: #fff;
    }

    .icons {
        font-family: iconfont;
        font-size: 36;
        color: #f5f5f5;
        font-weight: 600;
    }
</style>
