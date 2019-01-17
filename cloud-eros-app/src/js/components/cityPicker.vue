<template>
    <am-list>
        <am-picker :show.sync="show" title="请选择" :data="district" v-model="value" @ok="onOK" @hide="onHide">
            <am-list-item class="am-item" slot-scope="{ extra, show }" title=" " :extra="extra" @click="show"></am-list-item>
        </am-picker>
    </am-list>
</template>
<script>
    import { AmPicker, AmList, AmListItem } from 'weex-amui'
    import { district } from '../utils/city'

    export default {
        components: { AmPicker, AmList, AmListItem },
        data () {
            return {
                district,
                show: false,
                value: []
            }
        },
        methods: {
            onOK (value, labels) {
                this.$emit('areCode', { code: value[2] })
            },
            onHide (type) {
                console.log('hide', type)
            }
        }
    }
</script>

<style scoped>
    .am-item {
        font-size: 30px;
        color: #555555;
        height: 100px;
    }
</style>
