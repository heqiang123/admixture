<template>
    <div class="tag-list">
        <text class="tag" :style="itemStyle(key)" @click="changeSelected(tag,key)" v-for="(tag, key) of items" :key="key">{{tag}}</text>
        <text class="tag add-tag" @click="state.isShow = true">+自定义</text>
        <wxc-dialog title="自定义风格"
                    :show="state.isShow"
                    main-btn-color="#e60012"
                    @wxcDialogCancelBtnClicked="state.isShow = false"
                    @wxcDialogConfirmBtnClicked="addTag">
            <input type="text" :autofocus="true"
                   class="input" slot="content"
                   :value="value"
                   @input="e => value = e.value"
                   @change="e => value = e.value" />
        </wxc-dialog>
    </div>
</template>

<script>
    import { WxcDialog } from 'weex-ui'

    export default {
        name: 'selectTags',
        components: { WxcDialog },
        props: {
            items: {
                type: Array
            },
            keyId: {
                type: String
            },
            index: {
                type: Number
            }
        },
        data () {
            return {
                state: {
                    isShow: false
                },
                selectList: [],
                value: ''
            }
        },
        methods: {
            addTag () {
                this.items.push(this.value)
                this.state.isShow = false
            },
            itemStyle (index) {
                if (this.selectList.indexOf(index) === -1) {
                    return {
                        'background-color': '#fff',
                        color: '#555'
                    }
                } else {
                    return {
                        'background-color': '#e60012',
                        color: '#fff'

                    }
                }
            },
            changeSelected (tag, index) {
                if (this.selectList.indexOf(index) === -1) {
                    this.selectList.push(index)
                } else {
                    this.selectList.splice(this.selectList.indexOf(index), 1)
                }
                const submitItemList = []
                for (let index = 0; index < this.selectList.length; index++) {
                    const element = this.selectList[index]
                    submitItemList.push(this.items[element])
                }
                const key = this.keyId
                const submitData = {}
                submitData[key] = submitItemList
                this.$emit('submitData', { index: this.index, submitData: submitData, id: key })
            }
        }
    }
</script>

<style scoped>
    .tag-list {
        margin: 80 36 0;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .tag {
        margin: 10 10 14;
        width: 170;
        height: 92;
        line-height: 92;
        text-align: center;
        font-size: 32;
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
        border-radius: 8;
    }

    .add-tag {
        color: #757575;
    }

</style>
