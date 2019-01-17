<template>
    <div>
        <text class="comment-tag">{{name}}</text>
    </div>
</template>

<script>
    export default {
        name: 'tag',
        props: ['name']
    }
</script>

<style lang="scss" scoped>
    .comment-tag {
        padding: 4 20;
        margin: 0 8 20;
        font-size: 28;
        color: #555;
        border-top-style: solid;
        border-top-color: #dbd6d6;
        border-top-width: 2;
        border-left-style: solid;
        border-left-color: #dbd6d6;
        border-left-width: 2;
        border-bottom-style: solid;
        border-bottom-color: #dbd6d6;
        border-bottom-width: 2;
        border-right-style: solid;
        border-right-color: #dbd6d6;
        border-right-width: 2;
        border-radius: 4;
    }
</style>
