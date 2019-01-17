<template>
    <div>
        <wxc-popup popup-color="rgba(0,0,0,0.5)"
                   :show="show"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="top"
                   height="800">
            <bmcalendar class="calendar" :selectType="type" ref="calendar" @finish="finish"></bmcalendar>
            <div class="textarea-box">
                <div class="title">
                    <text class="title-text text-left">随手笔记</text>
                    <text class="title-text text-right" @click="submit">保存</text>
                </div>
                <textarea class="textarea"></textarea>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    export default {
        name: 'diary',
        props: {
            show: {
                type: Boolean
            }
        },
        methods: {
            submit () {
                this.isBottomShow = false
                this.toast('测试提交成功')
            },
            popupOverlayBottomClick () {
                // this.isBottomShow = false;
            },
            prev () {
                this.$refs['calendar'].goPrve()
            },
            next () {
                this.$refs['calendar'].goNext()
            },
            finish (params) {
                // this.isBottomShow = true
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
        select-color: #1da1f2;
    }

    .scorll-box {
    }

    .textarea-box {
        padding: 0px 30px;
        justify-content: center;
    }

    .textarea {
        margin-top: 10px;
        font-size: 32px;
        width: 690px;
        height: 150px;
        color: #333333;
        background-color: #f1f1f1;
        border-width: 2px;
        border-style: solid;
        border-color: rgba(47, 47, 47, 1);
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.5);

    }

    .title {
        width: 690px;
        height: 80px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }

    .text-left {
        color: #ffffff;
        font-size: 30px;
    }

    .text-right {
        color: rgba(255, 255, 255, 0.5);
        font-size: 28px;
    }

</style>
