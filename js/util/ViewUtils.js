/**
 * Created by CxS on 2018/1/18 16:18
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight, StyleSheet
} from 'react-native';

export default class ViewUtils {
    static getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={callBack}>
            <Image style={{width: 26, height: 26, tintColor: 'white'}}
                   source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>;
    }

    /**
     *获取设置页面的Item
     * @param callBack 单击Item的回调
     * @param icon 左侧图标
     * @param text 显示文本
     * @param tintStyle 图标着色
     * @param expandableIcon 右侧图标
     */
    static getSettingItem(callBack, icon, text, tintStyle, expandableIcon) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={styles.item}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={icon}
                               resizeMode='stretch'
                               style={[{width: 16, height: 16, marginRight: 10}, tintStyle]}/>
                        <Text>{text}</Text>
                    </View>
                    <Image source={expandableIcon ? expandableIcon : require('../../res/images/ic_tiaozhuan.png')}
                           style={[{marginRight: 10, height: 22, width: 22}, {tintColor: '#6495ED'}]}/>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        height: 60
    },
});
