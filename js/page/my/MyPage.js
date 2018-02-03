/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import ViewUtil from '../../util/ViewUtils';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import {MORE_MENU} from '../../common/MoreMenu';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import AboutPage from '../about/AboutPage';

export default class MyPage extends Component {
    constructor(props) {
        super(props);
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.custom_language:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.custom_key:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.remove_key:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                params.isRemoveKey = true;
                break;
            case MORE_MENU.sort_key:
                TargetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.sort_language:
                TargetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.custom_theme:
                break;
            case MORE_MENU.about_author:
                break;
            case MORE_MENU.about:
                TargetComponent = AboutPage;
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params
            })
        }
    }

    getItem(tag, icon, text) {
        return ViewUtil.getSettingItem(() => this.onClick(tag), icon, text, {tintColor: '#6495ED'}, null)
    }

    render() {
        let navigationBar = <NavigationBar
            title='我的'
            statusBar={{backgroundColor: '#6495ED'}}
            style={{backgroundColor: '#6495ED'}}/>;
        return (<View style={GlobalStyles.root_container}>
            {navigationBar}
            <ScrollView>
                <TouchableHighlight
                    onPress={() => this.onClick(MORE_MENU.about)}>
                    <View style={[styles.item, {height: 90}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../../res/images/ic_trending.png')}
                                   style={[{width: 40, height: 40, marginRight: 10}, {tintColor: '#6495ED'}]}/>
                            <Text>GitHub Popular</Text>
                        </View>
                        <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                               style={[{marginRight: 10, height: 22, width: 22}, {tintColor: '#6495ED'}]}/>
                    </View>
                </TouchableHighlight>
                <View style={GlobalStyles.line}/>
                {/*趋势管理*/}
                <Text style={styles.groupTitle}>趋势管理</Text>
                <View style={GlobalStyles.line}/>
                {/*关于*/}
                {this.getItem(MORE_MENU.custom_language, require('./img/ic_custom_language.png'), '自定义语言')}
                <View style={GlobalStyles.line}/>
                {/*语言排序*/}
                {this.getItem(MORE_MENU.sort_language, require('./img/ic_swap_vert.png'), '语言排序')}
                <View style={GlobalStyles.line}/>
                {/*标签管理*/}
                <Text style={styles.groupTitle}>标签管理</Text>
                <View style={GlobalStyles.line}/>
                {/*自定义语言*/}
                {this.getItem(MORE_MENU.custom_key, require('./img/ic_custom_language.png'), '自定义标签')}
                <View style={GlobalStyles.line}/>
                {/*语言排序*/}
                {this.getItem(MORE_MENU.sort_key, require('./img/ic_swap_vert.png'), '标签排序')}
                <View style={GlobalStyles.line}/>
                {/*标签移除*/}
                {this.getItem(MORE_MENU.remove_key, require('./img/ic_remove.png'), '标签移除')}
                <View style={GlobalStyles.line}/>
                {/*设置*/}
                <Text style={styles.groupTitle}>设置</Text>
                <View style={GlobalStyles.line}/>
                {/*自定义主题*/}
                {this.getItem(MORE_MENU.custom_theme, require('./img/ic_view_quilt.png'), '自定义主题')}
                <View style={GlobalStyles.line}/>
                {/*关于作者*/}
                {this.getItem(MORE_MENU.about_author, require('./img/ic_insert_emoticon.png'), '关于作者')}
                <View style={GlobalStyles.line}/>
            </ScrollView>
        </View>);
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
            height: 60
        },
        groupTitle: {
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 5,
            fontSize: 12,
            color: 'gray'
        }
    });