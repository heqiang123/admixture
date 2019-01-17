<template>
    <scroller>
        <div class="storeDesigner">
            <div @click="goToDesigner(item)" class="designer-card" v-for="(item, index) of storeDesigner" :key="index">
                <image class="designer-image" :style="{height: pageHeight * 0.4}" resize="cover" :src="`${getImageUrl(item.headUrl)}&level=4`"></image>
                <div class="designer-box">
                    <div class="designer-intr">
                        <text class="designer-name">{{item.name}}</text>
                        <text class="designer-title info">{{item.level}}</text>
                    </div>
                    <div class="designer-intr">
                        <text class="designer-company info">{{item.busiContentStoreName}}</text>
                    </div>
                    <div class="designer-label-zone">
                        <text class="designer-label" v-for="(nameItem,index) in item.tags" :key="index" v-if="index<3">{{nameItem.name}}</text>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<script>
    import mixins from '../../common/mixins'

    export default {
        name: 'designerCard',
        data () {
            return {
                storeDesigner: []
            }
        },
        mixins: [mixins],
        methods: {
            goToDesigner (item) {
                if (item.accountId) {
                    this.goTo('design.designer', { id: item.id })
                } else {
                    this.goTo('desig.index', { id: item.id })
                }
            }
        },
        async created () {
            const params = await this.$router.getParams()
            this.storeDesigner = params.storeDesigner
        }
    }
</script>

<style lang="scss" scoped>
    .storeDesigner {
        flex-direction:row;
        width: 750px;
        flex-wrap: wrap;
    }

    .designer-card {
        width: 370;
        height: 640px;
        padding: 5px;
        background-color: #fff;
    }

    .designer-image {
        width: 370px;
        border-radius: 15px;
    }

    .designer-intr {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }

    .designer-box {
        width: 370;
        height: 150px;
        padding: 20;
    }

    .designer-name {
        margin-right: 20;
        font-size: 30;
        color: #212121;
    }

    .info {
        font-size: 24;
        color: #757575;
    }

    .designer-company {
        margin: 10 0;
    }

    .designer-label-zone {
        flex-direction: row;
    }

    .designer-label {
        margin-right: 10;
        padding: 5 8;
        font-size: 22;
        color: #fff;
        background-color: #353535;
        border-radius: 4;
    }
</style>
