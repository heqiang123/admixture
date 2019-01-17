<template>
    <div class="fdr jcs main">
        <image class="img" :src="img" resize="cover"></image>
        <div class="fdc">
            <div class="fdr jcb title">
                <div class="fdr jcs">
                    <text class="name c3">{{name}}</text>
                    <text class="job c0">{{title}}</text>
                </div>
                <!--<text class="del" @click="handelDel(id)">删除</text>-->
            </div>
            <text class="stamp">{{stamp}}</text>
        </div>

    </div>
</template>


<script>
    import mixins from '../../common/mixins'

    export default {
        mixins: [mixins],
        props: {
            'img': {
                type: String,
                default: 'http://img.hb.aicdn.com/018a1314715879ae86da9c367d5d05d1647a4391c487-w52Q9p_fw658'
            },
            'name': {
                type: String,
                default: '昵称'
            },
            'title': {
                type: String,
                default: '设计师'
            },
            'id': {
                type: String,
                default: 'id'
            },
            'stamp': {
                type: Date
            }
        },
        computed: {
            // stampStr () {
            //     const stamp = this.$dayjs(this.stamp).format('YYYY-MM-DD HH:mm:ss')
            //     return this.$dayjs().from(stamp)
            // }
        },
        data () {
            return {}
        }
    }
</script>

<style src="../../../assets/css/basebase.css"></style>

<style scoped>
    .main {
        flex-direction: row;
    }

    .img {
        height: 80px;
        width: 80px;
        border-radius: 40px;
    }

    .fdc {
        margin-left: 20px;
        height: 80px;
    }

    .title {
        width: 590px;
    }

    .name {
        font-size: 30px;
    }

    .job {
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: rgba(230, 0, 18, 1);
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 22px;
        margin-left: 10px;
    }

    .del {
        font-size: 28px;
        color: rgba(159, 178, 200, 1);
    }

    .stamp {
        padding-top: 20px;
        padding-left: 10px;
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
    }

</style>
