#!/bin/bash

echo "~~~~~~~~~~~~~~~~开始执行脚本~~~~~~~~~~~~~~~~"


# 开始时间
beginTime=`date +%s`
DATE=`date '+%Y-%m-%d-%T'`
#目前目录
BASE_DIR=~/Jenkins/workspace/开发环境/星杰客户APP/cloud-eros-app/platforms/android/WeexFrameworkWrapper

#需要编译的 targetName
TARGET_NAME="WeexEros"
#编译模式 工程默认有 Debug Release
CONFIGURATION_TARGET=Release
#编译路径
BUILDPATH="${BASE_DIR}"/app/build/outputs


# 是否上传蒲公英
UPLOADPGYER=false
DESCRIPTION="上传备注"


echo "~~~~~~~~~~~~~~~~选择打包方式~~~~~~~~~~~~~~~~"
echo "      1 dev (默认)"
echo "      2 release 仅生成APK"
echo "      3 release 生成APK并上传"

# 读取用户输入并存到变量里
read parameter
sleep 0.5
method="$parameter"

# 判读用户是否有输入
if [ -n "$method" ]
then
    if [ "$method" = "1" ]
    then
    CONFIGURATION_TARGET=Debug
    elif [ "$method" = "2" ]
    then
    UPLOADPGYER=false
    CONFIGURATION_TARGET=Release
    elif [ "$method" = "3" ]
    then
    UPLOADPGYER=true
    CONFIGURATION_TARGET=Release
    else
    echo "参数无效...."
    exit 1
    fi
else
    CONFIGURATION_TARGET=Debug
fi


echo "~~~~~~~~~~~~~~~~开始编译~~~~~~~~~~~~~~~~~~~"
echo "~~~~~~~~~~~~~~~~开始清理~~~~~~~~~~~~~~~~~~~"
# 清理 避免出现一些莫名的错误

~/gradle-4.10/bin/gradle -p "${BASE_DIR}" clean

echo "~~~~~~~~~~~~~~~~开始构建~~~~~~~~~~~~~~~~~~~"
#开始构建

~/gradle-4.10/bin/gradle -p "${BASE_DIR}" build

~/gradle-4.10/bin/gradle -p "${BASE_DIR}" assembleRelease

APKPATH="${BUILDPATH}"/apk/samplechannel/release/app-samplechannel-release.apk

echo "~~~~~~~~~~~~~~~~检查是否构建成功~~~~~~~~~~~~~~~~~~~"
# xcarchive 实际是一个文件夹不是一个文件所以使用 -d 判断
if [ -d "$BUILDPATH" ]
then
echo "构建成功......"
else
echo "构建失败......"
rm -rf $BUILDPATH
exit 1
fi
endTime=`date +%s`
ArchiveTime="构建时间$[ endTime - beginTime ]秒"


# 上传蒲公英
if [ $UPLOADPGYER = true ]
then
    echo "~~~~~~~~~~~~~~~~上传apk到蒲公英~~~~~~~~~~~~~~~~~~~"
    curl -F "file=@$APKPATH" \
    -F "_api_key=5f1e94e69f7d4af00fbda43d889d48c8" \
    -F "buildUpdateDescription=${DESCRIPTION}" \
    -F "buildInstallType=1" \
    https://www.pgyer.com/apiv2/app/upload --verbose

    if [ $? = 0 ]
    then
    echo "~~~~~~~~~~~~~~~~上传蒲公英成功~~~~~~~~~~~~~~~~~~~"
    else
    echo "~~~~~~~~~~~~~~~~上传蒲公英失败~~~~~~~~~~~~~~~~~~~"
    fi
fi




echo "~~~~~~~~~~~~~~~~配置信息~~~~~~~~~~~~~~~~~~~"
echo "开始执行脚本时间: ${DATE}"
echo "编译模式: ${CONFIGURATION_TARGET}"
echo "打包文件路径: ${BUILDPATH}"
echo "导出aok路径: ${APKPATH}"

echo "$ArchiveTime"
echo "$ExportTime"
exit 0
