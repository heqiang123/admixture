<template>
    <div>
        <div class="reply-to-newuser" :style="{'background-color': state.isFocus ? '#e2e2e2' : '#f2f2f2'}" v-if="type">
            <input type="text" class="input-new" v-model="inputValue" placeholder="说点什么吧..." @focus="state.isFocus = true" @blur="state.isFocus = state.isReply = false">
            <div class="btn" @click="submitComment">
                <text class="btn-btn">发表</text>
            </div>
        </div>
        <div class="reply-to-user" :style="{'background-color': state.isFocus ? '#e2e2e2' : '#f2f2f2'}" v-else>
            <input type="text" class="input" v-model="inputValue" placeholder="说点什么吧..." @focus="state.isFocus = true" @blur="state.isFocus = state.isReply = false">
            <div class="btn" @click="submitComment">
                <text class="btn-btn">发表</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'allComments',
        props: {
            panelShow: {
                type: Boolean
            },
            type: {
                type: Number
            }
        },
        data () {
            return {
                showBottom: false,
                state: {
                    isFocus: false,
                    isReply: false
                },
                enterIn: '',
                comment: [],
                type: '',
                id: '',
                tagArr: [],
                selected: [],
                inputValue: ''
            }
        },
        methods: {
            submitComment () {
                this.$emit('clickedHidePanel', this.inputValue)
                // this.inputValue = ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .reply-to-user {
        justify-self: flex-end;
        align-self: flex-end;
        flex-direction: row;
        align-items: center;
        width: 600;
        height: 100;
    }

    .reply-to-newuser {
        justify-self: flex-start;
        align-self: flex-start;
        flex-direction: row;
        align-items: center;
        width: 500;
        height: 100;
    }

    .input {
        margin: 20;
        width: 440;
        height: 60;
        font-size: 24;
        padding: 0 20;
        background-color: #fff;
        border-radius: 10;
    }

    .input-new {
        margin: 20;
        width: 340;
        height: 60;
        font-size: 24;
        padding: 0 20;
        background-color: #fff;
        border-radius: 10;
    }

    .btn {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100;
        height: 60;
        background-color: #f79f20;
        border-radius: 10px;
    }

    .btn-btn {
        color: #ffffff;
        font-size: 26px;
    }
</style>
