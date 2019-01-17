//package com.eros.wx.wxapi;
//
//import android.content.BroadcastReceiver;
//import android.content.Context;
//import android.content.Intent;
//
//import com.eros.framework.BMWXEnvironment;
//import com.tencent.mm.opensdk.openapi.IWXAPI;
//
//
//public class AppRegister extends BroadcastReceiver {
//
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        IWXAPI mWXApi = BMWXEnvironment.mWXApi;
//        if (mWXApi == null) return;
//        mWXApi.registerApp(BMWXEnvironment.mPlatformConfig.getWechat().getAppId());
//    }
//}
