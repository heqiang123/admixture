<template>
    <wxc-cell :has-top-border="hasTopBorder"
              :cell-style="{backgroundColor:backgroundColor}"
              @wxcCellClicked="wxcCellClicked"
              :accessible="true"
              :aria-label="`${name},状态为${checked?'已选中':'未选中'},${disabled?'不可更改':''}`">
        <text :style="{color:color}" class="title-text" slot="title">{{name}}</text>
        <image :src="radioIcon" v-if="radioIcon" slot="value " class="radio"></image>
    </wxc-cell>
</template>

<style scoped>
    .radio {
        width: 48px;
        height: 48px;
    }

    .title-text {
        text-align: center;
        font-size: 30px;
        color: #666666;
    }
</style>

<script>
    import { WxcCell } from 'weex-ui'

    export default {
        components: { WxcCell },
        name: 'cityRadioItem',
        props: {
            hasTopBorder: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                require: true
            },
            code: {
                type: [String, Number, Object],
                require: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            checked: {
                type: Boolean,
                default: false
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        data () {
            return {
                icon: ['https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png', 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png']
            }
        },
        watch: {
            code (val) {
                this.code = val
            },
            name (val) {
                this.name = val
            }
        },
        computed: {
            radioIcon () {
                const { icon, disabled, checked, config } = this
                const mergeIcon = icon
                config.checkedIcon && (mergeIcon[0] = config.checkedIcon)
                config.disabledIcon && (mergeIcon[1] = config.disabledIcon)
                return checked ? mergeIcon[disabled ? 1 : 0] : ''
            },
            backgroundColor () {
                const { disabled } = this
                return disabled ? '#F2F3F4' : '#FFFFFF'
            },
            color () {
                const { disabled, checked, config } = this
                let checkedColor = '#EE9900'
                config.checkedColor && (checkedColor = config.checkedColor)
                return checked && !disabled ? checkedColor : '#3D3D3D'
            }
        },
        methods: {
            wxcCellClicked () {
                const { disabled, value } = this
                if (!disabled) {
                    this.$emit('wxcRadioItemChecked', { value, disabled })
                }
            }
        }
    }
</script>
