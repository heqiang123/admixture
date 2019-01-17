<template>
    <div>
        <div class="business-left">
            <div class="business-time">
                <text class="business-time-p1">{{item.applyCheckTime}}</text>
            </div>
        </div>
        <div class="business-right">
            <div class="business-content-box1">
                <text class="business-content-p1">{{item.constructionPlanName}}</text>
                <text class="business-content-p1-1">（合格）</text>
            </div>
            <div class="business-right-content" v-for='(item,index) in urls' :key="index">
                <!--<text class="tags">阶段照片</text>-->
                <image :src="getImageUrl(item.preViewUrl)" class="imageLocal"></image>
                <!--<image :src="item.name" class="imageLocal"></image>-->
                <text class="tags">质检单</text>
            </div>
        </div>
        <div class="business-process">
            <text class="iconfont font-40 color-c">&#xe601;</text>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'process'
    }
</script>

<style scoped>

</style>
