<template>
    <div class="input-item">
        <input v-model="inputValue" @change="onchange" @input="onchange" @return="search" :style="{width:width }" class="input" :type="type" :placeholder="placeholder" />
        <text v-if="isCode" class="captchared" @click="getCode">{{codeText}}</text>
    </div>
</template>

<script>
    export default {
        name: 'home',
        props: {
            type: {
                default: 'text'
            },
            placeholder: {
                default: ''
            },
            codeText: {
                default: '获取验证码'
            },
            isCode: {
                type: Boolean
            },
            width: {
                default: 440
            }
        },
        data () {
            return {
                inputValue: '',
                codeEnable: true
            }
        },
        methods: {
            onchange (e) {
                this.value = e.value
                this.$emit('inputValue', e.value)
            },
            getCode () {
                this.$emit('getCode')
            },
            clear () {
                this.inputValue = ''
            }

        }
    }
</script>

<style lang="scss" scoped>
    .input-item {
        flex-direction: row;
        align-items: center;
        width: 600;
        border-bottom-color: #f2f2f2;
        border-bottom-style: solid;
        border-bottom-width: 1;
    }

    .icon {
        width: 120;
        height: 106;
        line-height: 106;
        text-align: center;
        font-family: iconfont;
        font-size: 60;
        color: #555;
        font-weight: 600;
    }

    .input {
        width: 360;
        height: 106px;
        padding: 0 20;
        font-size: 32;
        tint-color: #e60012;
    }

    .captcha {
        border: 1px solid rgb(179, 179, 179);
        width: 160;
        height: 60;
        line-height: 60;
        font-size: 28;
        color: #b3b3b3;
        border-top-style: solid;
        border-top-color: #b3b3b3;
        border-top-width: 1;
        border-left-style: solid;
        border-left-color: #b3b3b3;
        border-left-width: 1;
        border-bottom-style: solid;
        border-bottom-color: #b3b3b3;
        border-bottom-width: 1;
        border-right-style: solid;
        border-right-color: #b3b3b3;
        border-right-width: 1;
        border-radius: 4;
    }

    .captchared {
        border: 1px solid #E60012;
        width: 160;
        height: 60;
        line-height: 60px;
        text-align: center;
        font-size: 28;
        color: #E60012;
        border-top-style: solid;
        border-top-color: #b3b3b3;
        border-top-width: 1;
        border-left-style: solid;
        border-left-color: #b3b3b3;
        border-left-width: 1;
        border-bottom-style: solid;
        border-bottom-color: #b3b3b3;
        border-bottom-width: 1;
        border-right-style: solid;
        border-right-color: #b3b3b3;
        border-right-width: 1;
        border-radius: 4;
    }
</style>
