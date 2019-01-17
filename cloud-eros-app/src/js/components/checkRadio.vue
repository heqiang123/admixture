<template>
    <wxc-radio :list="items" class="radio-list" @wxcRadioListChecked="wxcRadioListChecked"
               :config="{ checkedColor: '#e60012',
                                checkedIcon: 'bmlocal://assets/images/circle_red.png',
                                disabledIcon:'bmlocal://assets/images/circle.png' }"></wxc-radio>
</template>

<script>
    import { WxcRadio } from 'weex-ui'

    export default {
        props: {
            items: {
                type: Array
            },
            index: {
                type: Number
            },
            keyId: {
                type: String
            }
        },
        name: 'checkRadio',
        components: { WxcRadio },
        methods: {
            wxcRadioListChecked (e) {
                const checkValue = e.value
                const key = this.keyId
                const submitData = {}
                const tempArray = []
                tempArray.push(checkValue)
                submitData[key] = tempArray
                this.$emit('submitData', { index: this.index, submitData: submitData, id: this.keyId })
            }
        }

    }
</script>

<style scoped>
    .radio-list {
        margin: 80 36 0;
    }
</style>
