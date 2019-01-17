<template>
    <div class="picker">
        <wxc-popup popup-color="#fff"
                   :show="showPicker"
                   @wxcPopupOverlayClicked="$emit('close')"
                   pos="bottom"
                   height="584">
            <div class="picker-contain">
                <div class="handdle">
                    <wxc-button text="取消"
                                :btnStyle="{'background-color': '#fff', width: 375, height: 80,}"
                                @wxcButtonClicked="$emit('close')"
                                :textStyle="{'font-size': 32, color: '#00BBE4'}"
                    ></wxc-button>
                    <wxc-button text="确定"
                                :btnStyle="{'background-color': '#fff', width: 375, height: 80,}"
                                :textStyle="{'font-size': 32, color: '#00BBE4'}"
                                @wxcButtonClicked="changeBirth"
                    ></wxc-button>
                </div>
                <div class="picker-wrapper">
                    <list class="listitem" @scroll="selectYear">
                        <cell v-for="(item, index) in year" :key="index">
                            <text class="picker-item" :style="{color:(index === selectYearIndex) ? '#00BBE4':'#000'}"> {{item}}</text>
                        </cell>
                    </list>
                    <list class="listitem" @scroll="selectMonth">
                        <cell v-for="(item ,index) in month" :key="index">
                            <text class="picker-item" :style="{color:(index === selectMonthIndex)?'#00BBE4':'#000'}"> {{item}}</text>
                        </cell>
                    </list>
                    <list class="listitem" @scroll="selectDay">
                        <cell v-for="(item, index) in days" :key="index">
                            <text class="picker-item" :style="{color:(index === selectDayIndex)?'#00BBE4':'#000'}"> {{item}}</text>
                        </cell>
                    </list>
                </div>
                <div class="top-line line"></div>
                <div class="bottom-line line"></div>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    import { WxcPopup, WxcButton } from 'weex-ui'

    export default {
        name: 'picker',
        props: ['showPicker'],
        components: { WxcPopup, WxcButton },
        data () {
            return {
                state: {
                    isShow: false
                },
                selectYearOffset: 3,
                selectYearIndex: 3,
                yearInterval: 0,
                selectMonthOffset: 3,
                selectMonthIndex: 3,
                monthInterval: 0,
                selectDayOffset: 3,
                selectDayIndex: 3,
                dayInterval: 0,
                month: ['', '', '', '01 月', '02 月', '03 月', '04 月', '05 月', '06 月', '07 月', '08 月', '09 月', '10 月', '11 月', '12 月', '', '', '']
            }
        },
        computed: {
            year () {
                const arr = ['', '', '']
                let year = 1970
                while (true) {
                    arr.push(year++ + ' 年')
                    if (year > new Date().getFullYear()) break
                }
                arr.push('', '', '')
                return arr
            },
            days () {
                const arr = ['', '', '']
                const curDate = new Date()
                /* 获取当前月份 */
                const curMonth = curDate.getMonth()
                /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
                curDate.setMonth(curMonth + 1)
                /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
                curDate.setDate(0)
                /* 返回当月的天数 */
                const days = curDate.getDate()
                for (let index = 1; index <= days; index++) {
                    arr.push(`${index} 日`)
                }
                arr.push('', '', '')
                return arr
            }
        },
        methods: {
            selectYear (e) {
                const offset = e.contentOffset.y
                this.selectYearOffset = offset % 72 < 36 ? -Math.round(offset / 72) + 3 : -Math.round(offset / 72) + 4
                clearTimeout(this.yearInterval)
                this.yearInterval = setTimeout(() => {
                    this.selectYearIndex = this.selectYearOffset
                }, 200)
            },
            selectMonth (e) {
                const offset = e.contentOffset.y
                this.selectMonthOffset = offset % 72 < 36 ? -Math.round(offset / 72) + 3 : -Math.round(offset / 72) + 4
                clearTimeout(this.monthInterval)
                this.monthInterval = setTimeout(() => {
                    this.selectMonthIndex = this.selectMonthOffset
                }, 200)
            },
            selectDay (e) {
                const offset = e.contentOffset.y
                this.selectDayOffset = offset % 72 < 36 ? -Math.round(offset / 72) + 3 : -Math.round(offset / 72) + 4
                clearTimeout(this.dayInterval)
                this.dayInterval = setTimeout(() => {
                    this.selectDayIndex = this.selectDayOffset
                }, 200)
            },
            changeBirth () {
                const year = this.year[this.selectYearIndex].replace(/年/, '-')
                const month = this.month[this.selectMonthIndex].replace(/月/, '-')
                const days = this.days[this.selectDayIndex].replace(/日/, '')
                const dt = year + month + days
                this.$emit('change', dt.replace(/\s+/g, ''))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .picker-contain {
        position: relative;
    }

    .handdle {
        height: 80;
        flex-direction: row;
    }

    .picker-wrapper {
        flex-direction: row;
    }

    .picker-item {
        width: 250;
        height: 72;
        line-height: 72;
        font-size: 36;
        color: #000;
        text-align: center;
    }

    .listitem {
        width: 250;
        height: 504;
    }

    .line {
        position: absolute;
        left: 0;
        width: 750;
        height: 1;
        background-color: #eaeaea;
    }

    .top-line {
        top: 296;
    }

    .bottom-line {
        top: 368;
    }
</style>
