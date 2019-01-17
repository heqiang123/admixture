//
//  AppDelegate.m
//  WeexEros
//
//  Created by XHY on 2017/8/7.
//  Copyright © 2017年 benmu. All rights reserved.
//

#import "AppDelegate.h"
#import <UserNotifications/UserNotifications.h>
#import <WeexSDK/WeexSDK.h>
#import "WXCustomEventModul.h"
/// 个推开发者网站中申请App时，注册的AppId、AppKey、AppSecret
#define kGtAppId           @"B9CChnBOStAcSvwIltBXL8"
#define kGtAppKey          @"l42vfCr8Ia5c8eIDgs0FH"
#define kGtAppSecret       @"TySnpAaJ8O73ha5Nsnoes5"
@interface AppDelegate ()<UIApplicationDelegate, GeTuiSdkDelegate,UNUserNotificationCenterDelegate>

@end

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
    
    // 启动图片延迟2s
    [NSThread sleepForTimeInterval: 2];
    // 通过个推平台分配的appId、 appKey 、appSecret 启动SDK，注：该方法需要在主线程中调用
    [GeTuiSdk startSdkWithAppId:kGtAppId appKey:kGtAppKey appSecret:kGtAppSecret delegate:self];
    // 注册 APNs
    [WXSDKEngine initSDKEnvironment];
    [WXSDKEngine registerModule:@"yyy" withClass:[WXCustomEventModul class]];
    return result;
}
/** 远程通知注册成功委托 */
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    // [3]:向个推服务器注册deviceToken 为了方便开发者，建议使用新方法
    [GeTuiSdk registerDeviceToken:[[NSString alloc] initWithData:deviceToken encoding:NSUTF8StringEncoding]];
}
@end
