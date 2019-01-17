<template>
    <wxc-tab-bar :tab-titles="tabTitles" :tab-styles="tabStyles" ref="wxc-tab-bar" @wxcTabBarCurrentTabSelected="selected">
        <div class="width-750">
            <home :isTop="state.isTop"></home>
        </div>
        <div class="width-750">
            <design v-if="indexDesignIsshow"></design>
        </div>
        <div class="width-750">
            <div v-if="indexServiceIsshow">
                <myHome v-if="state.showAtjia" :myFlag="flag"></myHome>
                <service v-else></service>
            </div>
        </div>
        <div class="width-750">
            <user v-if="indexUserIsshow" :userInfo="userInfo"></user>
        </div>
    </wxc-tab-bar>
</template>

<script>
    import mixins from '../common/mixins'
    import { WxcTabBar } from 'weex-ui'
    import home from '../pages/home/index.vue'
    import design from '../pages/design/index.vue'
    import service from '../pages/service/index.vue'
    import user from '../pages/user/index.vue'
    import atjia from '../pages/atjia/index.vue'
    import myHome from '../pages/myHome/myHome.vue'
    import { getQueryOrder } from '../service/homeAtj.Api'
    import { getUserInfoById } from '../service/userApi'

export default {
        name: 'App',
        mixins: [mixins],
        components: { WxcTabBar, home, design, service, user, atjia, myHome },
        data () {
            return {
                // titleArray: ['动态1', '动态2', '动态3', '动态4'],
                tabStyles: {
                    iconWidth: 44,
                    iconHeight: 44,
                    width: 160,
                    height: 100,
                    fontSize: 24
                },
                userInfo: {
                    nickname: ''
                },
                state: {
                    isTop: true,
                    showAtjia: false,
                    isShowPicture: false
                },
                indexDesignIsshow: false,
                indexServiceIsshow: false,
                indexUserIsshow: false,
                flag: 0
            }
        },
        computed: {
            tabTitles () {
                const array = [{
                    'title': '首页',
                    'icon': 'bmlocal://assets/home@2x.png',
                    'activeIcon': 'bmlocal://assets/home_Selected@2x.png'
                },
                {
                    'title': '设计',
                    'icon': 'bmlocal://assets/design@2x.png',
                    'activeIcon': 'bmlocal://assets/design_Selected@2x.png'
                },
                {
                    'title': '服务',
                    'icon': 'bmlocal://assets/service@2x.png',
                    'activeIcon': 'bmlocal://assets/service_Selected@2x.png'
                },
                {
                    'title': '我的',
                    'icon': 'bmlocal://assets/user@2x.png',
                    'activeIcon': 'bmlocal://assets/user_Selected@2x.png'
                }]
                if (this.state.showAtjia) {
                    array.splice(2, 1, {
                        'title': '我的家',
                        'icon': 'bmlocal://assets/images/wodejianame.png',
                        'activeIcon': 'bmlocal://assets/images/wodejiaicon.png'
                    })
                }
                return array
            }
        },
        methods: {
            selected (e) {
                const index = e.page
                if (Number(index) === 0) {
                    this.state.isTop = true
                } else {
                    this.state.isTop = false
                }
                if (Number(index) === 1) {
                    this.indexDesignIsshow = true
                }
                if (Number(index) === 2) {
                    this.flag++
                    this.indexServiceIsshow = true
                }
                if (Number(index) === 3) {
                    this.indexUserIsshow = true
                }
            },
            async getOrderById (id) {
                const result = await getQueryOrder(id)
                if (result.length) {
                    return true
                } else {
                    return false
                }
            },
            async checkProject () {
                if (this.userId) {
                    this.userInfo = await getUserInfoById(this.userId)
                    const result = await this.getOrderById(this.userId)
                    if (result) {
                        this.state.showAtjia = true
                    } else {
                        setTimeout(() => {
                            this.checkProject()
                        }, 500)
                    }
                } else {
                    setTimeout(() => {
                        this.checkProject()
                    }, 500)
                }
            }
        },
        async mounted () {
            await this.checkProject()
        },
        beforeCreate () {
            if (!this.$storage.getSync('oneGet')) {
                this.$router.setHomePage('/pages/noLogin/noLogin.js')
            }
        },
        eros: {
            beforeBackAppear (params) {
                if (params.todo === 'refresh') {
                    this.checkProject()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/base.scss";
</style>
