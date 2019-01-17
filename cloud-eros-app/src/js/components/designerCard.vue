<template>
    <div @click="goToDesigner(item)" class="designer-card">
        <image class="designer-image" :style="{height: pageHeight * 0.4}" resize="cover" :src="item.headId+'?x-oss-process=style/w400_q80_s100'"></image>
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
</template>

<script>
    import mixins from '../common/mixins'

    export default {
        name: 'designerCard',
        props: {
            item: Object
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
        }
    }
</script>

<style lang="scss" scoped>
    .designer-card {
        background-color: #fff;
    }

    .designer-image {
        width: 370px;
        padding: 5;
        border-radius: 15px;
    }

    .designer-intr {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }

    .designer-box {
        width: 370;
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
