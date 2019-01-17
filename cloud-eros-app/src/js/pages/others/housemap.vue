<template>
    <div>
        <weex-amap class="map" id="map2017" :center="pos" zoom="10" :style="{'height': pageHeight}">
            <weex-amap-marker v-for="(item,index) of  marker" :key="index" :position="item.position" :title='item.title' hideCallout="true" :icon="item.icon"
                              @click="onMarkerClicked">
            </weex-amap-marker>
        </weex-amap>
    </div>
</template>

<script>
    const Amap = weex.requireModule('amap')
    import { androidMapKey, iosMapKey } from '../../config/urls'
    import mixins from '../../common/mixins'
    import { getBusiContentHouseByMap } from '../../service/baseApi'

    export default {
        mixins: [mixins],
        data () {
            return {
                pos: [],
                marker: [{ position: [], title: '' }]
            }
        },
        watch: {
            pos: {
                handler (newValue, oldValue) {
                    this.pos = newValue
                },
                deep: true
            },
            marker: {
                handler (newValue, oldValue) {
                    this.initMap()
                },
                deep: true
            }
        },

        methods: {
            onMarkerClicked () {

            },
            async getList () {
                const result = await getBusiContentHouseByMap()
                const tempList = []
                for (let i = 0; i < result.length; i++) {
                    const marker = {
                        position: [result[i].longitude, result[i].latitude],
                        title: result[i].name,
                        icon: 'bmlocal://assets/images/mark_b.png'
                    }
                    tempList.push(marker)
                }
                this.marker = tempList
                this.pos = tempList[0].position
            },

            initMap () {
                weex.config.env.platform === 'android' ? Amap.initAmap(androidMapKey) : Amap.initAmap(iosMapKey)
            }
        },
        async created () {
            this.initMap()
            await this.getList()
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
