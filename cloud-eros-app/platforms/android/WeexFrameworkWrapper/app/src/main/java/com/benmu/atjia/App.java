package com.benmu.atjia;

import android.app.Application;

import com.eros.framework.BMWXApplication;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;
//import com.benmu.erosplugingt;erosplugingt?
/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
        try {
            WXSDKEngine.registerModule("yyy", MyModule.class);
        } catch (WXException e) {
            e.printStackTrace();
        }
    }

}
