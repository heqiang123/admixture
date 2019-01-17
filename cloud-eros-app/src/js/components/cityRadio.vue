<template>
    <div>
        <city-radio-item v-for="(item,i) in updateList"
                         :config="config"
                         v-bind="item"
                         @wxcRadioItemChecked="wxcRadioItemChecked(i,$event)"
                         :key="i">
        </city-radio-item>
    </div>
</template>

<style scoped>

</style>

<script>
    import cityRadioItem from './cityRadioItem'

    export default {
        components: { cityRadioItem },
        name: 'cityRadio',
        props: {
            list: {
                type: Array,
                default: () => ([])
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        data () {
            return {
                checkedIndex: -1
            }
        },
        computed: {
            updateList () {
                const { checkedIndex, list } = this
                const updateList = []
                list && list.forEach((item, i) => {
                    item.checked = i === checkedIndex
                    updateList.push(item)
                })
                return updateList
            }
        },
        watch: {
            list (newList) {
                this.setListChecked(newList)
            }
        },
        created () {
            this.setListChecked(this.list)
        },
        methods: {
            setListChecked (list) {
                if (list && list.length > 0) {
                    list.forEach((item, i) => {
                        item.checked && (this.checkedIndex = i)
                    })
                }
            },
            wxcRadioItemChecked (i, e) {
                const oldIndex = this.checkedIndex
                const { name, code } = this.list[i]
                this.checkedIndex = i
                this.$emit('wxcRadioListChecked', { name, code, oldIndex, index: i })
            }
        }
    }
</script>
