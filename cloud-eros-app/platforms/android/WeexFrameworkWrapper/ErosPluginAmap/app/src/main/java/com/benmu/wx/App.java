package com.benmu.wx;

import android.app.Application;

import com.eros.framework.BMInitConfig;
import com.eros.framework.BMWXApplication;
import com.eros.framework.BMWXEngine;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;




    }

}
