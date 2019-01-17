<template>
    <div>
        <bmcalendar class="calendar" :minimumDate="minimumDate" :maximumDate="maximumDate" :startDate="formatTime(toDayTime)" :selectType="type" ref="calendar" @finish="finish"></bmcalendar>
        <scroller class="scorll-box" :style="{height:pageHeight-800}">
            <div class="dec" v-if="notes.length" v-for="(item,index) of notes">
                <div class="dec-top">
                    <text class="dec-time">{{item.noteTime}}</text>
                    <text class="dec-delete" @click="deleteNote(item.id)">删除</text>
                </div>
                <div class="dec-content">
                    <text class="note" lines="3">{{item.note}}</text>
                </div>
            </div>
            <div>

            </div>
        </scroller>
    </div>
</template>
<script>
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'
    import { WxcCell, WxcButton, WxcPopup } from 'weex-ui'
    import { format, setDays } from '../../utils/calendar'
    import { getDiaryList, deleteNoteById } from '../../service/atjiaApi'

    export default {
        components: { WxcCell, WxcButton, StatusBar, WxcPopup },
        data () {
            return {
                id: '',
                type: 'single',
                minimumDate: '',
                maximumDate: '',
                toDayTime: '',
                isBottomShow: false,
                height: 400,
                notes: []
            }
        },
        mixins: [mixins],
        beforeCreate () {
            this.$navigator.setRightItem({
                text: '添加',
                fontSize: '30',
                textColor: '#333333'
            }, () => {
                this.goTo('dataLi.addnote', { time: this.toDayTime, id: this.id }, 'needLogin')
            })
        },
        async created () {
            const params = await this.$router.getParams()
            this.id = params.id
            this.toDayTime = new Date().getTime()
            // this.defaultTime = format(this.toDayTime, 'YYYY-MM-DD');
            this.minimumDate = format(setDays('', 'subtract', 365), 'YYYY-MM-DD')
            this.maximumDate = format(setDays('', 'add', 365), 'YYYY-MM-DD')
            await this.getNotes(this.id, this.toDayTime)
        },
        methods: {
            async finish (params) {
                const tempTime = new Date(params.startDate).getTime()
                this.toDayTime = tempTime
                await this.getNotes(this.id, this.toDayTime)
            },
            /**
             * 删除日记
             * @param id
             * @returns {Promise<void>}
             */
            async deleteNote (id) {
                await deleteNoteById(id)
                await this.getNotes(this.id, this.toDayTime)
            },
            /**
             * 获取日记列表
             * @returns {Promise<void>}
             */
            async getNotes (id, time) {
                const result = await getDiaryList(id, time)
                this.notes = result
                for (let i = 0; i < this.notes.length; i++) {
                    this.notes[i].noteTime = format(this.notes[i].noteTime, 'YYYY-MM-DD HH:mm:ss')
                }
            },
            formatTime (time) {
                return format(time, 'YYYY-MM-DD')
            }

        },
        eros: {
            async backAppeared (params) {
                if (params && params.name === 'refresh') {
                    if (!this.xRequest()) {
                        return
                    } else {
                        this.$router.refresh()
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    .calendar {
        height: 800px;
        background-color: #ffffff;
        select-color: #1da1f2;
        position: relative;
    }

    .scorll-box {
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .modal-top {
        align-items: flex-start;
        justify-content: flex-start;
    }

    .dec {
        flex-direction: column;
        padding: 30px 30px;
        background-color: #FFFFFF;
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #999999;
    }

    .dec-time {
        font-size: 26px;
        color: #666666;
    }

    .dec-delete {
        font-size: 26px;
        color: #E60012;
    }

    .dec-top {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 30px 0;
    }

    .note {
        color: #333333;
        font-size: 28px;
    }
</style>

