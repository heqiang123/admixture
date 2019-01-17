<template>
    <web class="webView" :src="url" :style="{width: `${width}px`, height: `${height}px`}"></web>
</template>

<script>
    import { webUrl } from '../config/urls'
    import commentZone from './commentZone'

    export default {
        name: 'atjiaView',
        components: { commentZone },
        props: {
            width: {
                type: Number,
                default: 750
            },
            height: {
                type: Number
            },
            id: {
                type: [String, Number]
            }
        },
        computed: {
            url () {
                if (this.id) {
                    return `${webUrl}/news-detail-app/${this.id}`
                } else {
                    return ''
                }
            }
        }
    }
</script>
<style scoped>
    a {
        color: #555
    }

    p {
        color: #555
    }

    div {
        color: #555
    }

    .webView {
        padding: 20px;
        background-color: #ffffff;
    }

    .webBox {
        flex-flow: row;
        justify-content: center;
        background-color: #ffffff;
    }

    .comment-wrapper {
        padding: 0 20;
    }
</style>
