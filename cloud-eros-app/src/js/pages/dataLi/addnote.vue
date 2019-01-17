<template>
    <div class="textarea-box">
        <div class="title">
            <text class="text-left">添加随手笔记</text>
        </div>
        <textarea class="textarea" v-model="note"></textarea>
    </div>
</template>

<script>
    import { addProjectNote } from '../../service/atjiaApi'
    import mixins from '../../common/mixins'

    export default {
        name: 'addnote',
        mixins: [mixins],
        data () {
            return {
                createTime: '',
                userInfo: {},
                note: '',
                id: ''
            }
        },
        methods: {
            async submit () {
                const result = await addProjectNote({
                    'noteTime': this.createTime,
                    'creater': this.userId,
                    'note': this.note,
                    'serviceId': this.id
                })
                if (result.type === 'success') {
                    this.toast(result.text)
                    this.$router.setBackParams({ name: 'refresh' })
                    this.goBack()
                } else {
                    this.toast('系统异常')
                }
            }
        },
        beforeCreate () {
            this.$navigator.setRightItem({
                text: '保存',
                fontSize: '30',
                textColor: '#333333'
            }, () => {
                this.submit()
                // this.goTo('dataLi.addnote', 'needLogin')
            })
        },
        async created () {
            const params = await this.$router.getParams()
            this.createTime = params.time
            this.id = params.id
        }
    }
</script>

<style scoped>
    .textarea-box {
        padding: 0 30px;
    }

    .textarea {
        margin-top: 10px;
        font-size: 32px;
        width: 690px;
        height: 150px;
        padding: 10px;
        color: #333333;
        background-color: #ffffff;
        border-width: 1px;
        border-style: solid;
        border-color: #b3b3b3;
        border-radius: 4px;
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
        color: #333333;
        font-size: 30px;
    }

    .text-right {
        color: rgba(255, 255, 255, 0.5);
        font-size: 28px;
    }
</style>
