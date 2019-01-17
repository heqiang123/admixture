<template>
    <div class="por">
        <slider class="slider" :infinite="false" @change="onchange" :style="{height:pageAllHeight  + 'px' }">
            <div class="frame" v-for="img of [1,2,3]" :key="index">
                <image class="image wl" @click="jump('index')" :style="{height:pageAllHeight  + 'px' }"  resize="cover" :src="`bmlocal://assets/images/page${img}.png`"></image>
            </div>
        </slider>
    </div>

</template>

<script>
    import mixins from '../../common/mixins'
    export default {
        name: 'noLogin',
        mixins: [mixins],
        data: () => ({
            showBtn: false,
            page: 0
        }),
        methods: {
            jump (url) {
                if (this.page === 2) {
                    this.$router.setHomePage('/pages/index.js')
                }
            },
            onchange ({ index }) {
                if (index === 2) {
                    this.page = 2
                }
            }
        },
        created () {
            this.$storage.setSync('oneGet', '1')
        }
    }
</script>

<style scoped>
    .wl{
        width: 750px;
    }
</style>
