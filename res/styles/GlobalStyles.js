/**
 * Created by CxS on 2018/2/3 14:17
 *
 * 全局样式
 */
import {Dimensions} from 'react-native'

const {height, width} = Dimensions.get('window');

module.exports = {
    line: {
        height: 0.4,
        opacity: 0.5,
        backgroundColor: 'darkgray'
    },
    root_container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    nav_bar_height_ios: 44,
    nav_bar_height_android: 50,
    primaryColor: '#6495ED',
    window_height: height,
};

