package com.benmu.atjia;

import android.util.Log;
import android.widget.Toast;

import com.igexin.sdk.PushManager;
import com.igexin.sdk.Tag;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

import java.lang.reflect.Array;


/**
 * Created by hefoni on 2018/11/28.
 */

public class MyModule extends WXModule {
    //run ui thread
    @JSMethod(uiThread = false)
    public void printLog(String msg) {
        Log.e("666", "msg");
        PushManager.getInstance().bindAlias (App.getWXApplication().getApplicationContext(),msg,msg);
    }
    @JSMethod(uiThread = false)
    public void bindTag(String msg) {
        String[] tags = new String[] {msg};
        Tag[] tagParam = new Tag[tags.length];

        for (int i = 0; i < tags.length; i++) {
            Tag t = new Tag();
            //name 字段只支持：中文、英文字母（大小写）、数字、除英文逗号和空格以外的其他特殊符号, 具体请看代码示例
            t.setName(tags[i]);
            tagParam[i] = t;
        }
        PushManager.getInstance().setTag (App.getWXApplication().getApplicationContext(),tagParam,msg);
    }

}
