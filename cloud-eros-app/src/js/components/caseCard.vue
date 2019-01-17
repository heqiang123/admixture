<template>
    <div class="case-item-wrapper" @click="goTo('design.case',{id:item.id})">
        <image class="case-image" :style="{height: pageHeight * 0.3}" resize="cover" :src="`${item.homepageId}?x-oss-process=style/w400_Q85`"></image>
    </div>
</template>
<script>
    import mixins from '../common/mixins'

    export default {
        props: ['item'],
        mixins: [mixins]
    }
</script>
<style lang="scss" scoped>
    .case-item-wrapper {
        width: 370;
    }

    .case-image {
        width: 370;
    }
</style>
