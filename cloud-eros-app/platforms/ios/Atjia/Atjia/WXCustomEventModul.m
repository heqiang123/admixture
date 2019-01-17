//
//  WXCustomEventModule.m
//  Atjia
//
//  Created by hefoni on 2018/11/26.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "WXCustomEventModul.h"
#import <GTSDK/GeTuiSdk.h>
@implementation WXCustomEventModul
WX_EXPORT_METHOD(@selector(printLog:))
WX_EXPORT_METHOD(@selector(bindTag:))
- (void)printLog:(NSString *)image {
    NSLog(@"%@",image);
    [GeTuiSdk bindAlias:image andSequenceNum:image];
}
- (void)bindTag:(NSArray *)ary {
    [GeTuiSdk setTags:ary];
}

@end
