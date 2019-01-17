<template>
    <div>
        <status-bar></status-bar>
        <div class="search">
            <div class="search-title">
                <div class="minibar-left">
                    <text class="icon" @click="goTo('index')">&#xe601;</text>
                    <div class="left-type" @click="showTypeMenu">
                        <text :style="{width: 100, color: '#555', 'text-align': 'center'}">{{searchType}}</text>
                        <text class="icon" :style="{marginRight:20}">&#xe605;</text>
                    </div>
                </div>
                <div class="minibar-middle">
                    <div class="middle-wrapper">
                        <input :value="searchValue" @change="onchange" @input="onchange" @return="search" class="input" type="text" return-key-type="search" placeholder="请输入关键字"
                               @focus="state.isFocus = true" @blur="state.isFocus = false" />
                        <text class="icon" v-if="state.isFocus" :style="{fontSize: 28}" @click="searchValue = ''">&#xe76c;</text>
                    </div>
                </div>
                <text class="minibar-right" @click="search">搜索</text>
            </div>
            <wxc-popover ref="wxc-popover" :buttons="btns" :position="{x: 20,y:100}" :arrowPosition="{pos:'top',x: 80}" @wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>
        </div>
    </div>
</template>

<script>
    import { WxcMinibar, WxcPopover } from 'weex-ui'
    import StatusBar from '../../components/statusBar'
    import mixins from '../../common/mixins'

    export default {
        name: 'search',
        components: { WxcMinibar, WxcPopover, StatusBar },
        mixins: [mixins],
        data () {
            return {
                state: {
                    isFocus: false
                },
                searchType: '案例',
                selectIndex: 0,
                searchValue: '',
                btns: [
                    {
                        icon: '',
                        text: '案例',
                        key: '案例'
                    },
                    {
                        icon: '',
                        text: '设计师',
                        key: '设计师'
                    },
                    {
                        icon: '',
                        text: '楼盘',
                        key: '楼盘'
                    },
                    {
                        icon: '',
                        text: '工地',
                        key: '工地'
                    },
                    {
                        icon: '',
                        text: '门店',
                        key: '门店'
                    },
                    {
                        icon: '',
                        text: '文章',
                        key: '文章'
                    }]
            }
        },
        methods: {
            showTypeMenu () {
                this.$refs['wxc-popover'].wxcPopoverShow()
            },
            popoverButtonClicked (obj) {
                this.searchType = obj.key
            },
            search (e) {
                switch (this.searchType) {
                case '案例':
                    this.goTo('case.index', { searchValue: this.searchValue })
                    break
                case '设计师':
                    this.goTo('designer.index', { searchValue: this.searchValue })
                    break
                case '楼盘':
                    this.goTo('estate.index', { searchValue: this.searchValue })
                    break
                case '工地':
                    this.goTo('con.index', { searchValue: this.searchValue })
                    break
                case '门店':
                    this.goTo('store.index', { searchValue: this.searchValue })
                    break
                case '文章':
                    this.goTo('home.newsList', { searchValue: this.searchValue, id: 125, type: false })
                    break
                default:
                    break
                }
            },
            onchange (e) {
                this.searchValue = e.value
            }
        },
        beforeCreate () {
            this.$router.getParams(dt => {
                this.type = dt.type || '案例'
            })
            this.$navigator.setNavigationInfo({
                title: '',
                navShow: false,
                statusBarStyle: 'Default'
            })
        },
        async created () {
            const params = await this.$router.getParams()
            if (params.type === 'case') {
                this.selectIndex = 0
                this.searchType = '案例'
            }
            if (params.type === 'designer') {
                this.selectIndex = 1
                this.searchType = '设计师'
            }
            if (params.type === 'estate') {
                this.selectIndex = 2
                this.searchType = '楼盘'
            }
            if (params.type === 'construction') {
                this.selectIndex = 3
                this.searchType = '工地'
            }
            if (params.type === 'store') {
                this.selectIndex = 4
                this.searchType = '门店'
            }
            if (params.type === 'news') {
                this.selectIndex = 5
                this.searchType = '文章'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        width: 750px;
        height: 2000px;
        background-color: #fff;
    }

    .search-title{
        flex-direction: row;
        align-items: center;
        align-content: center;
        width: 750px;
        margin-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .minibar-left {
        flex-direction: row;
        align-items: center;
        width: 180px;
        margin-right: 10px;
    }

    .left-type{
        flex-direction: row;
        align-items: center;
    }

    .minibar-middle {
        flex-direction: row;
        align-items: center;
        width: 430px;
        height: 60px;
        line-height: 60;
        text-align: center;
        font-family: iconfont;
        color: #888;
        border-radius: 4px;
    }

    .middle-wrapper {
        flex-direction: row;
        align-items: center;
        width: 430px;
        background-color: #e9e9e9;
    }

    .minibar-right {
        margin-left: 30px;
        color: #555;
    }

    .icon {
        font-family: iconfont;
        font-size: 42px;
        color: #555;
        font-weight: 600;
    }

    .input {
        width: 380px;
        height: 60px;
        padding: 0 20px;
        font-size: 28px;
        tint-color: #e60012;
    }
</style>
