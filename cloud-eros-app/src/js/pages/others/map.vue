<template>
    <weex-amap class="map" :center="pos" zoom="16" :style="{'height': pageHeight}" ref="map" myLocationEnabled="true">
        <weex-amap-marker :position="marker.position" :title="marker.title" hideCallout="true" icon="bmlocal://assets/images/mark_b.png"></weex-amap-marker>
    </weex-amap>
</template>

<script>
    const Amap = weex.requireModule('amap')
    import { androidMapKey, iosMapKey } from '../../config/urls'
    import mixins from '../../common/mixins'

    export default {
        mixins: [mixins],
        data () {
            return {
                pos: [121.48, 31.22],
                marker: {
                    position: [121.48, 31.22],
                    title: '上海市'
                }
            }
        },
        methods: {
            initMap () {
                weex.config.env.platform === 'android' ? Amap.initAmap(androidMapKey) : Amap.initAmap(iosMapKey)
            }
        },
        async created () {
            const params = await this.$router.getParams()
            if (params && params.marker) {
                this.pos = params.marker.position
                this.marker = params.marker
                this.initMap()
            } else {
                this.initMap()
            }
        }
    }

</script>
<style>
    .title {
        font-size: 60;
    }

    .btn-250 {
        width: 250;
    }
</style>
