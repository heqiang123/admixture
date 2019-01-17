<template>
    <div class="container">
            <div :class="[heightIndex===1?'header-box':'header-newbox']">
                <image class="header-box-bg" resize="cover" src="bmlocal://assets/images/oval-head-bg@3x.png"></image>
                <status-bar bgColor="transparent"></status-bar>
               <div v-for="(needItme,index) of needInfo" :key="index" v-if="needItme.houseId===houseIds">
                   <div class="title-box">
                       <div class="left-box">
                           <image src="bmlocal://assets/images/Slice@2x.png" style="height: 60px;width: 60px;" @click="$router.back()"></image>
                       </div>
                       <div class="content-box">
                           <text class="info-top-text" v-if="needInfo.length">{{needItme.houseName}}</text>
                       </div>
                       <div class="right-box">
                           <image resize="cover" src="bmlocal://assets/images/group-home-1@3x.png" style="height: 60px;width: 60px" @click="openDiary"></image>
                       </div>
                   </div>
                   <div  class="head-content">
                       <div  class="arrow-btn"></div>
                       <div class="head-content-middle">
                           <image class="head-content-image" resize="cover" :src="urls ? urls : 'bmlocal://assets/images/CgpnG1rWsuKAbLOGAAGSGyrO6oA364.jpg'" v-if="userInfo"></image>
                           <div class="head-content-info">
                               <div class="info-top">

                                   <div class="info-top-tag" v-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName">
                                       <text class="tag-1" v-if="workStage === 'I001'">开工准备</text>
                                       <text class="tag-1" v-if="workStage === 'I002'">土建阶段</text>
                                       <text class="tag-1" v-if="workStage === 'I003'">水电阶段</text>
                                       <text class="tag-1" v-if="workStage === 'I004'">泥木阶段</text>
                                       <text class="tag-1" v-if="workStage === 'I005'">油漆阶段</text>
                                       <text class="tag-1" v-if="workStage === 'I006'">竣工验收</text>
                                   </div>
                               </div>
                               <div class="info-bottom">
                                   <text class="info-address " v-if="needInfo.length">{{needItme.houseLocation}}</text>
                               </div>
                           </div>
                       </div>
                       <div class="arrow-btn"></div>
                   </div>
               </div>
                <div class="box-expand" v-if="state.isShowButton" @click="showTeam">
                    <image class="expand-image" src="bmlocal://assets/images/expand.png"></image>
                </div>
            </div>
        <scroller class="warp" :style="{height:pageHeight + 400}" v-if="newsFlag">
                <div class="s2-box" v-if="state.isShowTeam">
                    <div class="s2-header">
                        <div class="s2-left">
                            <div class="s2-header-item" v-for="(item,index) of serviceOrderList" @click="qieHuan(index,item.id)" v-if="serviceOrderList.length > 1">
                                <div class="line" :class="[index===isActiveLine?'activeLine':'']"></div>
                            </div>
                            <image class="select-icon" src="bmlocal://assets/images/more.png" v-if="serviceOrderList.length > 1"></image>
                        </div>
                    </div>
                    <scroller scroll-direction:horizontal class="s2-content">
                        <div class="s2-content-item">
                            <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg"  @click="showTan(serviceGeShu.designerId)" v-if="!imgUrlArrayGetter[0] && serviceGeShu.designerName" :key="1"></image>
                            <image class="head-img" resize="cover" v-else-if="serviceGeShu.designerName" @click="showTan(serviceGeShu.designerId)" :src="getImageUrl(imgUrlArrayGetter[0].thumUrl)" :key="2"></image>
                            <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="3"></image>
                            <div class="item-designer" v-if="serviceGeShu.designerName" :key="4">
                                <text class="designer-font">设计师</text>
                                <text class="designer-name">{{serviceGeShu.designerName}}</text>
                            </div>
                            <div class="item-designer" v-else :key="5">
                                <text class="designer-font">设计师</text>
                                <text class="designer-name">未知</text>
                            </div>
                        </div>
                        <div class="s2-content-item">
                            <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.customerManagerId)" v-if="!imgUrlArrayGetter[1] && serviceGeShu.customerManagerName" :key="6"></image>
                            <image class="head-img" resize="cover" v-else-if="serviceGeShu.customerManagerName" @click="showTan(serviceGeShu.customerManagerId)" :src="getImageUrl(imgUrlArrayGetter[1].thumUrl)" :key="7"></image>
                            <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="8"></image>
                            <div class="item-designer" v-if="serviceGeShu.customerManagerName" :key="9">
                                <text class="designer-font">客户经理</text>
                                <text class="designer-name">{{serviceGeShu.customerManagerName}}</text>
                            </div>
                            <div class="item-designer" v-else :key="10">
                                <text class="designer-font">客户经理</text>
                                <text class="designer-name">未知</text>
                            </div>
                        </div>
                        <div class="s2-content-item">
                            <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.materialManagerId)" v-if="!imgUrlArrayGetter[2] && serviceGeShu.materialManagerName" :key="11"></image>
                            <image class="head-img" resize="cover" v-else-if="serviceGeShu.materialManagerName" @click="showTan(serviceGeShu.materialManagerId)" :src="getImageUrl(imgUrlArrayGetter[2].thumUrl)" :key="12"></image>
                            <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="13"></image>
                            <div class="item-designer" v-if="serviceGeShu.materialManagerName" :key="14">
                                <text class="designer-font">材料管家</text>
                                <text class="designer-name">{{serviceGeShu.materialManagerName}}</text>
                            </div>
                            <div class="item-designer" v-else :key="15">
                                <text class="designer-font">材料管家</text>
                                <text class="designer-name">未知</text>
                            </div>
                        </div>
                        <div class="s2-content-item">
                            <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.projectDto.projectManager)" v-if="!imgUrlArrayGetter[3] && serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" :key="16"></image>
                            <image class="head-img" resize="cover" v-else-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" @click="showTan(serviceGeShu.projectDto.projectManager)" :src="getImageUrl(imgUrlArrayGetter[3].thumUrl)" :key="17"></image>
                            <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" @click="showTan()" :key="18"></image>
                            <div class="item-designer" v-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" :key="19">
                                <text class="designer-font">项目经理</text>
                                <text class="designer-name">{{serviceGeShu.projectDto.projectManagerName}}</text>
                            </div>
                            <div class="item-designer" v-else :key="20">
                                <text class="designer-font">项目经理</text>
                                <text class="designer-name">未知</text>
                            </div>
                        </div>
                    </scroller>
                    <div style="justify-content: center;align-items: center" @click="pull">
                        <image style="height: 50px;width: 50px;" src="bmlocal://assets/images/pull.png"></image>
                    </div>
                </div>
                <div class="boundary" v-if="state.isShowTeam"></div>
                <scroller scroll-direction="horizontal" class="s3-scroller-header">
                    <div :class="[heightIndex===1?'s3-newitem':'s3-item']" v-for="(item,index) in jieDuanList" :key="index" @click="show(index)">
                        <div class="s3-header-item" :class="[index===isActive?'active':'']">
                            <text class="s3-header-item-text" :class="[index === isActive?'textActive':'']">{{item}}</text>
                        </div>
                    </div>
                </scroller>
                <div class="checkWarp" v-if="showListChox" :key="1">
                    <wxc-checkbox-list :list="titlelist" class="checkBoxList"
                                       @wxcCheckBoxListChecked="wxcCheckBoxListChecked" :config="config"
                                       :has-bottom-border="false"
                                       v-if="showListChox"></wxc-checkbox-list>
                </div>
                <div class="checkWarp" v-if="showFontListChox" :key="2">
                    <wxc-checkbox-list :list="titleFontlist" class="checkBoxList"
                                       @wxcCheckBoxListChecked="wxcFontCheckBoxListChecked" :config="config"
                                       :has-bottom-border="false"
                                       v-if="showFontListChox"></wxc-checkbox-list>
                </div>
                <div class="whitewash"></div>
                <flow :items="dongtaiList" :code="code" :itemName="itemNames" :itemNameDesign="serviceGeShu.designerName" :isActive="isActive" :id="serviceGeShu.projectDto.id" :name="serviceGeShu.projectDto.qualityInspector" :qualityInspectorId="serviceGeShu.projectDto.qualityInspectorId" @clickShow="clickShow" v-if="serviceGeShu.projectDto"></flow>
                <flow :items="dongtaiList" :code="code" :itemName="itemNames" :itemNameDesign="serviceGeShu.designerName" :isActive="isActive" @clickShow="clickShow" v-else></flow>
            </scroller>
        <scroller class="warp" :style="{height:pageHeight-320}" v-else>
            <!--<div class="s1-box" v-if="Object.keys(serviceGeShu).length">-->
            <!--<div class="item" @click="goTo('contract.list',{id:serviceGeShu.id},'needLogin')">-->
            <!--<image class="s1-icon" resize="cover" src="bmlocal://assets/images/home-ht@3x.png"></image>-->
            <!--<text class="s1-text">合同</text>-->
            <!--</div>-->
            <!--<div class="item" @click="goTo('others.draw',{designerName:serviceGeShu.designerName,id:serviceGeShu.id},'needLogin',`设计师图纸 · ${serviceGeShu.designerName}` )">-->
            <!--<image class="s1-icon" resize="cover" src="bmlocal://assets/images/home-sj@3x.png"></image>-->
            <!--<text class="s1-text">设计</text>-->
            <!--</div>-->
            <!--<div class="item" @click="goTo('quotation.list',{id:serviceGeShu.id},'needLogin')">-->
            <!--<image class="s1-icon" resize="cover" src="bmlocal://assets/images/home-cl@3x.png"></image>-->
            <!--<text class="s1-text">材料</text>-->
            <!--</div>-->
            <!--<div class="item" v-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" @click="goTo('others.report',{id:serviceGeShu.projectDto.id,name:serviceGeShu.projectDto.qualityInspector,qualityInspectorId:serviceGeShu.projectDto.qualityInspectorId},'needLogin')">-->
            <!--<image class="s1-icon" resize="cover" src="bmlocal://assets/images/home-zj@3x.png"></image>-->
            <!--<text class="s1-text">质检记录</text>-->
            <!--</div>-->
            <!--<div class="item" v-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" @click="goTo('project.modification',{id:serviceGeShu.projectDto.id,serviceId:serviceGeShu.id},'needLogin')">-->
            <!--<image class="s1-icon" resize="cover" src="bmlocal://assets/images/home-bg@3x.png"></image>-->
            <!--<text class="s1-text">变更记录</text>-->
            <!--</div>-->
            <!--</div>-->
            <div class="s2-box" v-if="state.isShowTeam">
                <div class="s2-header">
                    <div scroll-direction="horizontal" class="s2-left">
                        <div class="s2-header-item" v-for="(item,index) of serviceOrderList" @click="qieHuan(index,item.id)" v-if="serviceOrderList.length > 1">
                            <div class="line" :class="[index===isActiveLine?'activeLine':'']"></div>
                        </div>
                    </div>
                    <image class="select-icon" src="bmlocal://assets/images/more.png" v-if="serviceOrderList.length > 1"></image>
                </div>
                <div class="s2-content">
                    <div class="s2-content-item">
                        <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg"  @click="showTan(serviceGeShu.designerId)" v-if="!imgUrlArrayGetter[0] && serviceGeShu.designerName" :key="1"></image>
                        <image class="head-img" resize="cover" v-else-if="serviceGeShu.designerName" @click="showTan(serviceGeShu.designerId)" :src="getImageUrl(imgUrlArrayGetter[0].thumUrl)" :key="2"></image>
                        <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="3"></image>
                        <div class="item-designer" v-if="serviceGeShu.designerName" :key="4">
                            <text class="designer-font">设计师</text>
                            <text class="designer-name">{{serviceGeShu.designerName}}</text>
                        </div>
                        <div class="item-designer" v-else :key="5">
                            <text class="designer-font">设计师</text>
                            <text class="designer-name">未知</text>
                        </div>
                    </div>
                    <div class="s2-content-item">
                        <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.customerManagerId)" v-if="!imgUrlArrayGetter[1] && serviceGeShu.customerManagerName" :key="6"></image>
                        <image class="head-img" resize="cover" v-else-if="serviceGeShu.customerManagerName" @click="showTan(serviceGeShu.customerManagerId)" :src="getImageUrl(imgUrlArrayGetter[1].thumUrl)" :key="7"></image>
                        <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="8"></image>
                        <div class="item-designer" v-if="serviceGeShu.customerManagerName" :key="9">
                            <text class="designer-font">客户经理</text>
                            <text class="designer-name">{{serviceGeShu.customerManagerName}}</text>
                        </div>
                        <div class="item-designer" v-else :key="10">
                            <text class="designer-font">客户经理</text>
                            <text class="designer-name">未知</text>
                        </div>
                    </div>
                    <div class="s2-content-item">
                        <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.materialManagerId)" v-if="!imgUrlArrayGetter[2] && serviceGeShu.materialManagerName" :key="11"></image>
                        <image class="head-img" resize="cover" v-else-if="serviceGeShu.materialManagerName" @click="showTan(serviceGeShu.materialManagerId)" :src="getImageUrl(imgUrlArrayGetter[2].thumUrl)" :key="12"></image>
                        <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" :key="13"></image>
                        <div class="item-designer" v-if="serviceGeShu.materialManagerName" :key="14">
                            <text class="designer-font">材料管家</text>
                            <text class="designer-name">{{serviceGeShu.materialManagerName}}</text>
                        </div>
                        <div class="item-designer" v-else :key="15">
                            <text class="designer-font">材料管家</text>
                            <text class="designer-name">未知</text>
                        </div>
                    </div>
                    <div class="s2-content-item">
                        <image class="head-img" resize="cover" src="bmlocal://assets/images/head.jpg" @click="showTan(serviceGeShu.projectDto.projectManager)" v-if="!imgUrlArrayGetter[3] && serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" :key="16"></image>
                        <image class="head-img" resize="cover" v-else-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" @click="showTan(serviceGeShu.projectDto.projectManager)" :src="getImageUrl(imgUrlArrayGetter[3].thumUrl)" :key="17"></image>
                        <image class="head-img" resize="cover" v-else src="bmlocal://assets/images/head-default-d-y.png" @click="showTan()" :key="18"></image>
                        <div class="item-designer" v-if="serviceGeShu.projectDto && serviceGeShu.projectDto.projectManagerName" :key="19">
                            <text class="designer-font">项目经理</text>
                            <text class="designer-name">{{serviceGeShu.projectDto.projectManagerName}}</text>
                        </div>
                        <div class="item-designer" v-else :key="20">
                            <text class="designer-font">项目经理</text>
                            <text class="designer-name">未知</text>
                        </div>
                    </div>
                </div>
                <div style="justify-content: center;align-items: center" @click="pull">
                    <image style="height: 50px;width: 50px;" src="bmlocal://assets/images/pull.png"></image>
                </div>
            </div>
            <div class="boundary" v-if="state.isShowTeam"></div>
            <scroller scroll-direction="horizontal" class="s3-scroller-header">
                <div :class="[heightIndex===1?'s3-newitem':'s3-item']" v-for="(item,index) in jieDuanList" :key="index" @click="show(index)">
                    <div class="s3-header-item" :class="[index===isActive?'active':'']">
                        <text class="s3-header-item-text" :class="[index === isActive?'textActive':'']">{{item}}</text>
                    </div>
                </div>
            </scroller>
            <div class="checkWarp" v-if="showListChox" :key="1">
                <wxc-checkbox-list :list="titlelist" class="checkBoxList"
                                   @wxcCheckBoxListChecked="wxcCheckBoxListChecked" :config="config"
                                   :has-bottom-border="false"
                                   v-if="showListChox"></wxc-checkbox-list>
            </div>
            <div class="checkWarp" v-if="showFontListChox" :key="2">
                <wxc-checkbox-list :list="titleFontlist" class="checkBoxList"
                                   @wxcCheckBoxListChecked="wxcFontCheckBoxListChecked" :config="config"
                                   :has-bottom-border="false"
                                   v-if="showFontListChox"></wxc-checkbox-list>
            </div>
            <div class="whitewash"></div>
            <flow :items="dongtaiList" :code="code" :itemName="itemNames" :itemNameDesign="serviceGeShu.designerName" :isActive="isActive" :id="serviceGeShu.projectDto.id" :name="serviceGeShu.projectDto.qualityInspector" :qualityInspectorId="serviceGeShu.projectDto.qualityInspectorId" @clickShow="clickShow" v-if="serviceGeShu.projectDto"></flow>
            <flow :items="dongtaiList" :code="code" :itemName="itemNames" :itemNameDesign="serviceGeShu.designerName" :isActive="isActive" @clickShow="clickShow" v-else></flow>
        </scroller>
            <wxc-mask height="1600"
                      width="750"
                      border-radius="20"
                      duration="0"
                      mask-bg-color="#ffffff"
                      :has-overlay="false"
                      :show-close="false"
                      :show="state.isShow"
                      @wxcMaskSetHidden="wxcMaskSetHidden">
                <image style="width: 750px;height: 1600px;position: absolute;" src="bmlocal://assets/images/Group40@2x.png"></image>
                <div v-if="jugeIndex === 1 && state.isShow">
                    <image class="head-img-pop" resize="cover" :src="getImageUrl(imgUrlArray[0].thumUrl)" v-if="imgUrl.success && imgId"></image>
                    <image class="head-img-pop" resize="cover" src="bmlocal://assets/images/head.jpg" v-else></image>
                    <div class="designerText">
                        <text class="popUpsText">{{tanInfo.postName}}·{{tanInfo.userName}}</text>
                    </div>
                    <div class="phoneAndNumber">
                        <text class="phoneText">联系电话：</text>
                        <text class="numberText">{{tanInfo.phone}}</text>
                        <text class="callText" @click="$coms.call(tanInfo.phone, false)">拨打电话</text>
                    </div>
                    <image class="foot-img-pop" resize="cover" src="bmlocal://assets/images/Group-21@2x.png" @click="wxcMaskSetHidden"></image>
                </div>
                <div v-if="jugeIndex === 2 && state.isShow">
                    <image class="head-img-pop" resize="cover" src="bmlocal://assets/images/head-default-d-y.png"></image>
                    <div class="designerText">
                        <text class="popUpsTextManger">项目经理岗位施工阶段才开放哦！</text>
                        <text class="popManger">项目经理</text>
                    </div>
                    <div class="phoneAndNumber">
                        <text class="mangerText">1 根据生产计划和施工进度计划，将劳动力在施工现场上合理使用，科学按排各专业工种施工衔接，负责好日常工作。</text>
                        <text class="manger">2 根据施工形象进度计划，对各分区域月度计划认真执行,确保形象进度与施工进度同步.</text>
                        <text class="manger">3 根据各作业面特点，对班组进行计划交底，检查落实完成情况，若未按时完成及时调动人员加班完成．</text>
                    </div>
                    <image class="foot-img-pop" resize="cover" src="bmlocal://assets/images/Group-21@2x.png" @click="wxcMaskSetHidden"></image>
                </div>
            </wxc-mask>
            <wxc-popover ref="wxc-popover"
                         :buttons="btns"
                         :position="popoverPosition"
                         :arrowPosition="popoverArrowPosition"
                         @wxcPopoverButtonClicked="popoverButtonClicked()"></wxc-popover>
        </div>
</template>

<script>
    import StatusBar from '../../components/statusBar'
    import {
        WxcTabPage,
        WxcMinibar,
        WxcPanItem,
        WxcPopover,
        WxcCheckbox,
        WxcMask,
        WxcCell,
        WxcCheckboxList,
        WxcOverlay
    } from 'weex-ui'
    import WxcLightbox from '../../components/wxcLightBox'
    import { buiCheckbox } from 'bui-weex'
    import flow from '../../components/myatjia/flow'
    import { getImgUrls } from '../../service/baseApi'
    import mixins from '../../common/mixins'
    import { getDynamicDtoServiceId, getProjectByServiceId, getBizDynamicDto, getAllDynamicDto } from '../../service/atjiaApi'
    import {
        getServiceByOrder,
        getHouseByCustomerId,
        queryServices,
        getQueryOrder,
        getFwAccount
    } from '../../service/homeAtj.Api'

    export default {
        name: 'index',
        mixins: [mixins],
        components: {
            StatusBar,
            WxcTabPage,
            WxcMinibar,
            WxcPanItem,
            WxcPopover,
            flow,
            buiCheckbox,
            WxcCheckbox,
            WxcMask,
            WxcCell,
            WxcCheckboxList,
            WxcOverlay,
            WxcLightbox
        },
        data () {
            return {
                state: {
                    isShow: false,
                    isObjectBase: false,
                    isShowTeam: false,
                    isShowButton: true
                },
                jugeIndex: 0,
                needIndex: 0, // 显示第几个房屋，默认为0
                itemNames: '',
                itemNameDesign: '',
                showIndex: 0,
                showListChox: false,
                heightIndex: 1,
                showFontListChox: true,
                // toProject: {},
                imageList: [],
                code: '',
                porjectId: 0,
                workStage: '',
                dongtaiList: [],
                tabPageHeight: 308,
                jieDuanList: ['全部', '量房', '初步设计', '深化设计', '开工阶段', '水电阶段', '泥木阶段', '油漆/安装', '竣工验收'],
                isActive: 0,
                flag: false,
                newsFlag: false,
                // 获取需求订单的数据
                needInfo: [],
                // 图片的id
                imgId: 0,
                imgIdArray: [],
                imgUrl: {},
                imgUrlArray: [],
                imgUrlArrayPost: [],
                imgUrlArrayGetter: [],
                pictureId: [],
                popoverPosition: { x: -30, y: 540 },
                popoverArrowPosition: { pos: 'top', x: -15 },
                // 根据服务订单的id获取各个数据
                serviceGeShu: {},
                // 弹框显示的数据
                // 房屋的详细信息
                houseDeatils: [],
                tanInfo: {},
                titlelist: [
                    { title: '待办事项', value: 0, checked: true },
                    { title: '项目汇报', value: 1, checked: true },
                    { title: '质检验收', value: 2, checked: true },
                    { title: '随手笔记', value: 3, checked: true }
                ],
                titleFontlist: [
                    { title: '待办事项', value: 0, checked: true },
                    { title: '随手笔记', value: 2, checked: true }
                ],
                checkedList: { key: [0, 1, 2, 3] },
                checkedFontList: { key: [0, 1, 2] },
                config: {
                    checkedIcon: 'bmlocal://assets/images/checked.png',
                    disabledIcon: 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
                    checkedDisabledIcon: 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
                    unCheckedDisabledIcon: 'bmlocal://assets/images/uncheck.png',
                    checkedColor: '#333333'
                },
                // 服务订单得id
                serviceOrderId: '',
                type: 0,
                needIndexId: '',
                // 服务订单列表
                serviceOrderList: [],
                // 改变line的状态
                isActiveLine: 0,
                // 切换团队的id
                qiehuanId: '',
                changeIndex: -1
            }
        },
        props: {
            token: {
                type: String
            },
            userInfo: {
                type: Object
            },
            houseIds: {
                type: String
            },
            isActive: {
                type: Number
            },
            urls: {
                type: String
            },
            teamIndex: {
                type: Number
            }
        },
        watch: {
            code (val) {
                this.code = val
            }
        },
        methods: {
            async imgUrlArrayGet () {
                this.imgUrlArrayPost = []
                this.imgUrlArrayPost.push(this.serviceGeShu.designerId)
                this.imgUrlArrayPost.push(Number(this.serviceGeShu.customerManagerId))
                this.imgUrlArrayPost.push(Number(this.serviceGeShu.materialManagerId))
                if (this.serviceGeShu.projectDto && this.serviceGeShu.projectDto.projectManager) {
                    this.imgUrlArrayPost.push(Number(this.serviceGeShu.projectDto.projectManager))
                }
                return this.imgUrlArrayPost
            },
            async cycleGetInformation () {
                this.imgUrlArrayGetter = []
                for (let i = 0; i < this.imgUrlArrayPost.length; i++) {
                    await this.getGeInfo(this.imgUrlArrayPost[i])
                    if (this.imgId) {
                        await this.getImgsUrl(this.imgId)
                        if (this.imgUrl.success) {
                            this.imgUrlArrayGetter.push(this.imgUrlArray[0])
                        }
                    }
                }
            },
            wxcOverlayBodyClicked () {
                this.state.isShow = false
                this.showOverlay = false
            },
            wxcMaskSetHidden () {
                this.showOverlay = false
                this.state.isShow = false
            },
            clickShow (val) {
                this.show(val)
            },
            show (index) {
                this.isActive = index
                if (this.isActive === 0) {
                    this.showListChox = false
                    this.showFontListChox = false
                    this.itemNames = '全部'
                    this.dongtaiList = []
                    this.getAllDongTai()
                }
                if (this.isActive === 1) {
                    this.showListChox = false
                    this.showFontListChox = true
                    this.itemNames = '量房'
                    this.dongtaiList = []
                    this.getFontDongTai('B001', this.checkedFontList)
                }
                if (this.isActive === 2) {
                    this.showListChox = false
                    this.showFontListChox = true
                    this.itemNames = '初步设计'
                    this.dongtaiList = []
                    this.getFontDongTai('B002', this.checkedFontList)
                }
                if (this.isActive === 3) {
                    this.showListChox = false
                    this.showFontListChox = true
                    this.itemNames = '深化设计'
                    this.dongtaiList = []
                    this.getFontDongTai('B003', this.checkedFontList)
                }
                if (this.checkedList && this.isActive === 4) {
                    this.showFontListChox = false
                    this.showListChox = true
                    this.itemNames = '开工阶段'
                    this.dongtaiList = []
                    this.getDongtai('I001', this.checkedList)
                }
                if (this.checkedList && this.isActive === 5) {
                    this.showListChox = true
                    this.showFontListChox = false
                    this.itemNames = '水电阶段'
                    this.dongtaiList = []
                    this.getDongtai('I003', this.checkedList)
                }
                if (this.checkedList && this.isActive === 6) {
                    this.showListChox = true
                    this.showFontListChox = false
                    this.itemNames = '泥木阶段'
                    this.dongtaiList = []
                    this.getDongtai('I004', this.checkedList)
                }
                if (this.checkedList && this.isActive === 7) {
                    this.showListChox = true
                    this.showFontListChox = false
                    this.itemNames = '油漆/安装'
                    this.dongtaiList = []
                    this.getDongtai('I005', this.checkedList)
                }
                if (this.checkedList && this.isActive === 8) {
                    this.showListChox = true
                    this.showFontListChox = false
                    this.itemNames = '竣工验收'
                    this.dongtaiList = []
                    this.getDongtai('I006', this.checkedList)
                }
            },
            wxcCheckBoxListChecked (e) {
                if (Array.isArray(e.checkedList)) {
                    this.checkedList = { 'key': e.checkedList }
                } else if (Object.keys(e.checkedList).length) {
                    this.checkedList = e.checkedList
                } else {
                    this.checkedList = { 'key': [e.checkedList] }
                }
                if (this.isActive === 4) {
                    this.getDongtai('I001', this.checkedList)
                }
                if (this.isActive === 5) {
                    this.getDongtai('I003', this.checkedList)
                }
                if (this.isActive === 6) {
                    this.getDongtai('I004', this.checkedList)
                }
                if (this.isActive === 7) {
                    this.getDongtai('I005', this.checkedList)
                }
                if (this.isActive === 8) {
                    this.getDongtai('I006', this.checkedList)
                }
            },
            wxcFontCheckBoxListChecked (e) {
                if (Array.isArray(e.checkedList)) {
                    this.checkedFontList = { 'key': e.checkedList }
                } else if (Object.keys(e.checkedList).length) {
                    this.checkedFontList = e.checkedList
                } else {
                    this.checkedFontList = { 'key': [e.checkedList] }
                }
                if (this.isActive === 1) {
                    this.checkedFontList.key = this.checkedFontList.key.concat(1)
                    this.getFontDongTai('B001', this.checkedFontList)
                }
                if (this.isActive === 2) {
                    this.checkedFontList.key = this.checkedFontList.key.concat(1)
                    this.getFontDongTai('B002', this.checkedFontList)
                }
                if (this.isActive === 3) {
                    this.checkedFontList.key = this.checkedFontList.key.concat(1)
                    this.getFontDongTai('B003', this.checkedFontList)
                }
            },
            showTeam () {
                this.state.isShowButton = false
                this.state.isShowTeam = true
                this.heightIndex = 2
            },
            pull () {
                this.state.isShowButton = true
                this.state.isShowTeam = false
                this.heightIndex = 1
            },
            async qieHuan (index, id) {
                this.isActiveLine = index
                this.changeIndex = index
                await this.getQueryList(this.needIndexId)
                await this.getQuservice(id)
                await this.getProjectId(id)
                this.show(this.isActive)
                await this.imgUrlArrayGet()
                await this.cycleGetInformation()
                console.log('子组件的id', id)
                this.$emit('changeServiceId', id)
            },
            popoverButtonClicked (obj) {
                this.toast(obj.key)
                if (obj.index === 1) {
                    this.deleteService(this.qiehuanId)
                    this.serviceOrderList.splice(this.isActiveLine, 1)
                }
                if (obj.index === 2) {
                    this.zhongZhishutDownByServiceId(this.qiehuanId)
                    this.serviceOrderList.splice(this.isActiveLine, 1)
                }
            },
            // 根据登录者的id获取需求订单的数据
            async getOrderById (id) {
                const result = await getQueryOrder(id)
                if (result.length) {
                    this.needInfo = result
                    if (this.houseIds) {
                        for (const value of this.needInfo) {
                            if (value.houseId === this.houseIds) {
                                this.needIndexId = value.id
                            }
                        }
                    }
                    return true
                } else {
                    return false
                }
            },
            // 根据不同角色的id 获取材料管家，客户经理，项目经理信息
            async getGeInfo (id) {
                const result = await getFwAccount(id)
                this.tanInfo = result
                this.imgId = this.tanInfo.headBusinessId
            },
            async getImgsUrl (id) {
                if (!id) return
                const result = await getImgUrls(id)
                this.imgUrl = result
                this.imgUrlArray = result.data
            },
            // 根据需求订单的id获取服务订单
            async getQueryList (id) {
                const result = await getServiceByOrder(id, 'GET')
                if (result.length > 0) {
                    this.serviceOrderList = result
                    this.serviceOrderId = this.serviceOrderList[this.changeIndex].id
                } else {
                    return false
                }
            },
            // 根据服务订单查询各个信息
            async getQuservice (id) {
                if (id) {
                    const result = await queryServices(id)
                    if (Object.keys(result).length) {
                        this.qiehuanId = result.id
                        this.serviceGeShu = result
                        this.state.isObjectBase = true
                    }
                }
            },
            // 动态获取工程段数据
            async getDongtai (code, checkedList) {
                this.code = code
                if (this.serviceGeShu.projectDto.projectManagerName && this.serviceGeShu.projectDto) {
                    if (Object.keys(checkedList).length) {
                        this.dongtaiList = await getDynamicDtoServiceId(this.serviceGeShu.projectDto.id, code, 0, checkedList)
                    } else {
                        this.dongtaiList = await getDynamicDtoServiceId(this.serviceGeShu.projectDto.id, code, 0, { 'key': checkedList })
                    }
                }
            },
            // 动态获取量房、初步设计、深化设计（商务段）数据
            async getFontDongTai (code, checkedFontList) {
                if (this.serviceGeShu) {
                    if (Object.keys(checkedFontList).length) {
                        this.dongtaiList = await getBizDynamicDto(this.serviceGeShu.id, code, checkedFontList)
                    } else {
                        this.dongtaiList = await getBizDynamicDto(this.serviceGeShu.id, code, { 'key': checkedFontList })
                    }
                }
            },
            // 获取全部的动态数据
            async getAllDongTai () {
                if (this.serviceGeShu) {
                    console.log('服务id', this.serviceOrderId)
                    this.dongtaiList = await getAllDynamicDto(this.serviceOrderId)
                }
            },
            // 根据登录的id获取楼盘详情
            async getHouseDetails (id, method) {
                const result = await getHouseByCustomerId(id, method)
                this.houseDeatils = result
            },
            // 获取工程ID
            async getProjectId (serviceOrderId) {
                if (this.serviceGeShu.projectDto && this.serviceGeShu.projectDto.projectManagerName) {
                    const result = await getProjectByServiceId(serviceOrderId)
                    if (result && result.id) {
                        this.porjectId = result.id
                        this.workStage = result.workStage
                    }
                }
            },
            // 点击出现弹框
            async showTan (id) {
                if (id) {
                    await this.getGeInfo(id)
                    if (this.imgId) {
                        await this.getImgsUrl(this.imgId)
                    }
                    this.state.isShow = true
                    this.jugeIndex = 1
                } else {
                    this.jugeIndex = 2
                    this.state.isShow = true
                }
            },
            async init () {
                if (this.userId) {
                    const result = await this.getOrderById(this.userId)
                    if (result && this.needIndexId) {
                        await this.getQueryList(this.needIndexId)
                        this.qieHuan(this.changeIndex, this.serviceOrderList[this.changeIndex].id)
                        await this.getHouseDetails(this.userId, 'GET')
                    }
                }
            },
            /**
             * 填写笔记
             */
            openDiary () {
                this.goTo('dataLi.index', { id: this.serviceOrderId }, 'needLogin')
            }
        },
        async created () {
            this.changeIndex = this.teamIndex
            const params = await this.$router.getParams()
            if (params && params.id) {
                this.houseIds = params.id
                this.newsFlag = true
            }
            if (params && params.dynamic) {
                this.isActive = params.dynamic
            }
            if (params && params.userInfo) {
                this.userInfo = params.userInfo
            }
            await this.init()
        },
        eros: {
            async backAppeared (params) {
                if (params && params.name === 'refresh') {
                    if (!this.xRequest()) {
                        return
                    } else {
                        this.$router.refresh()
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: #FFFFFF;
    }
    .moduel {
        width: 100px;
        height: 100px;
    }

    .iconfont {
        font-family: iconfont2;
    }

    .header-box {
        width: 750;
        height: 380;
        position: relative;
        background-color: #FFFFFF;
    }

    .header-newbox {
        width: 750;
        /*height: 308;*/
        height: 346;
        position: relative;
        background-color: #FFFFFF;
    }

    .header-box-bg {
        position: absolute;
        width: 750;
        height: 308;
    }

    .box-expand {
        position: absolute;
        height: 120px;
        width: 120px;
        top:240px;
        right:60px;
        border-radius: 60px;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.1)
    }

    .expand-image {
        height: 120px;
        width: 120px;
    }

    .s1-box {
        width: 750px;
        height: 188;
        padding: 0 50;
        background-color: #ffffff;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: space-around;
    }

    .active {
        background-color: #E60012;
        color: #FFFFFF;
    }

    .backGround {
        background-color: #000000;
        opacity: 0;
        z-index: 10000
    }

    .back-b {
        background-color: #000000;
        position: relative;
    }

    .item {
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        width: 120;
        height: 146;
        margin-right: 20
    }

    .s1-icon {
        width: 75;
        height: 75;
    }

    .s1-text {
        font-size: 26;
        color: #333333;
    }

    .s2-box {
        width: 750px;
        padding: 0 40px;
        background-color: #ffffff;
    }

    .s2-header {
        width: 670px;
        height: 50px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .line {
        width: 120px;
        height: 4px;
        background-color: #EEEEEE;
    }

    .activeLine {
        background-color: #E60012;
        width: 120px;
    }

    .s2-header-item {
        width: 120px;
        height: 50px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-content: center;
    }

    .s2-text {
        width: 160;
        height: 84;
        line-height: 84;
        text-align: center;
        font-size: 30;
    }

    .s2-textActive {
        color: #E60012
    }

    .s2-left {
        width: 500px;
        height: 50px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .select-icon {
        height: 50px;
        width: 50px;
        position: absolute;
        right: 4px
    }

    .s2-right {
        width: 50;
        height: 80;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
    }

    .s2-content {
        width: 670px;
        flex-direction: row;
        height: 260px
    }

    .font-40 {
        font-size: 40;
        color: #353535;
    }

    .s2-content-item {
        width: 112px;
        height: 210px;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-right: 74px;
    }

    .item-designer {
        margin-top:26px;
    }

    .designer-font {
        font-size: 26px;
        width: 112px;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .designer-name {
        color: #999999;
        margin-top: 10px;
        font-size: 26px;
        width: 112px;
        text-align: center;
    }

    .head-img {
        width: 100;
        height: 100;
        border-radius: 50%;
    }

    .head-img-pop {
        margin-top: 340px;
        margin-left: 320px;
        width: 120;
        height: 120;
        border-radius: 60px
    }

    .designerText {
        width: 550px;
        height: 100px;
        background-color: #FFFFFF;
        margin-top: 60px;
        margin-left: 100px;
        align-items: center;
        justify-content: center;
    }

    .phoneAndNumber {
        width: 570px;
        height: 350px;
        background-color: #FFFFFF;
        margin-left: 90px;
        margin-top: 40px;
        align-items: center;
        justify-content: center;
    }

    .foot-img-pop {
        margin-top: 20px;
        margin-left: 310px;
        width: 140;
        height: 140;
        border-radius: 70px;
    }

    .s2-text-name {
        color: #333333;
        font-size: 26px;
        width: 112;
        text-align: center;
    }

    .s2-text-status {
        color: #999999;
        font-size: 26px;
        width: 112;
        text-align: center;
    }

    .s3 {
        width: 750;
        background-color: #ffffff;
    }

    .s3-scroller-header {
        margin-left: 10;
        width: 750;
        height: 112;
        padding-bottom: 20;
        flex-direction: row;
    }

    .s3-item {
        width: 188;
        height: 92;
        position: relative;
        padding-top: 20px;
    }

    .s3-newitem {
        width: 188;
        height: 92;
        position: relative;
    }

    .s3-header-item {
        width: 168;
        height: 72;
        border-radius: 8;
        background-color: #EEEEEE;
        justify-content: center;
        align-content: center;
        align-items: center;
    }

    .s3-header-item-text {
        font-size: 28;
        color: #C7C7C7;
    }

    .textActive {
        color: #FFFFFF;
    }

    .checkWarp {
        width: 750;
        height: 80;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: space-around;
    }

    .checkBoxList {
        width: 760;
        height: 80;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: space-around;
    }

    .whitewash {
        top:710px;
        position:absolute;
        background-color: #FFFFFF;
        width: 750px;
        height: 10px;
    }

    .title-box {
        height: 60px;
        width: 750px;
        padding: 0 30px;
        flex-direction: row;
        align-content: center;
        align-items: center;
    }

    .right-box {
        width: 120px;
        height: 60px;
        flex-direction: row;
        justify-content: flex-end;
    }

    .left-box {
        width: 120px;
        height: 60px;
    }

    .content-box {
        width: 450px;
        height: 60px;
        align-items: center;
        justify-content: center;
    }

    .head-content {
        width: 750px;
        height: 120px;
        flex-direction: row;
        justify-content: space-between;
    }

    .head-content-middle {
        width: 654px;
        height: 240px;
        padding: 0 14px;
        flex-direction: row;
        justify-content: space-between;
    }

    .head-content-image {
        width: 120px;
        height: 120px;
        border-radius: 100%;
    }

    .head-content-info {
        width: 534px;
        margin-top: 10px;
        height: 240px;
        padding-left: 34px;
        flex-direction: column;
        justify-content: space-between;
    }

    .info-top {
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        width: 534px;
        height: 30px;
    }

    .info-top-tag {
        flex-direction: row;
        width: 136px;
        height: 36px;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
        color: #ffffff;
        font-size: 26px;
        background-color: rgba(230, 0, 18, 0.3);
    }

    .info-top-text {
        color: #ffffff;
    }

    .tag-1 {
        width: 136px;
        height: 36px;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
        color: #ffffff;
        font-size: 26px;
        background-color: rgba(230, 0, 18, 0.3);
    }

    .info-bottom {
        width: 450px;
        height: 220px;
        padding-top: 10px;
        padding-left: 0px;
    }

    .info-address {
        font-size: 26px;
        color: #ffffff;
        lines: 2;
        text-overflow: ellipsis;
    }

    .margin-left-10 {
        margin-left: 10px;
    }

    .boundary {
        height: 10px;
        background-color: #EEEEEE;
        box-shadow: 0 10px 4px #EEEEEE;
    }

    .warp {
        flex-direction: column;
        width: 750px;
        background-color: #ffffff;
    }

    .arrow-btn {
        width: 46px;
        height: 110px;
    }

    .popUpsText {
        margin-top: 60;
        font-weight: bold;
        font-size: 50px
    }

    .mangerText {
        font-size: 26px;
        margin-top: 30px;
        padding-left:40px;
        padding-right: 40px;
        color:#666666;
     }

    .manger {
        font-size: 26px;
        padding-left:40px;
        padding-right: 40px;
        color:#666666;
    }

    .popUpsTextManger {
        color: #999999;
        font-size:30px;
        margin-top: 10px;
    }

    .popManger {
        color: #333333;
        font-weight: 700;
        font-size: 40px;
        margin-top: 20px;
    }

    .phoneText {
        margin-top: 0;
        color: #999999;
        font-size: 40px
    }

    .numberText {
        margin-top: 30px;
        font-size: 40px;
        font-weight: bold
    }

    .callText {
        margin-top: 40px;
        width: 500px;
        line-height: 80px;
        background-color: #E60012;
        border-radius: 8px;
        color: #FFFFFF;
        text-align: center;
        font-size: 40px;
    }

    wxc-cell {
        font-size: 26
    }
</style>
