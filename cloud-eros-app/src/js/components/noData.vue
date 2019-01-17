<template>
    <div class="content" :style="{height: pageHeight}">
        <image class="nodata" resize="cover" src="bmlocal://assets/images/nodata.png"></image>
        <p class="null-text"><text class="text">搜索结果为空</text></p>
    </div>
</template>

<script>
    import mixins from '../common/mixins'
    export default {
        name: 'noData',
        mixins: [mixins]
    }
</script>

<style scoped>
.content{
    width: 750px;
    background-color: #fff;
}
    .nodata{
        width: 260px;
        height: 400px;
        margin-left: 245px;
        margin-top: 120px;
    }
    .null-text{
        margin-top: 60px;
        margin-left: 300px;
    }
    .text{
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(117,117,117,1);
    }
</style>
