/**
 * Created by CxS on 2018/2/3 14:10
 * 更多菜单
 */

import React, {Component} from 'react';
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger, renderers} from 'react-native-popup-menu';
import {DeviceEventEmitter, Image, ListView, RefreshControl, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import NavigationBar from "../common/NavigationBar";
import FavoriteDao from '../expand/dao/FavoriteDao';
import TrendingCell from '../common/TrendingCell';
import ProjectsModel from '../model/ProjectModel';
import TimeSpan from '../model/TimeSpan';
import Utils from "../util/Utils";
import ActionUtils from "../util/ActionUtils";
import ViewUtil from "../util/ViewUtils";
import CustomKeyPage from "../page/my/CustomKeyPage";
import AboutMePage from "../page/about/AboutMePage";
import SortKeyPage from "../page/my/SortKeyPage";
import AboutPage from "../page/about/AboutPage";

const {ContextMenu} = renderers;

export const MORE_MENU = {
    custom_language: '自定义语言',
    sort_language: '语言排序',
    custom_theme: '自定义主题',
    custom_key: '自定义标签',
    sort_key: '标签排序',
    remove_key: '移除标签',
    about_author: '关于作者',
    about: '关于',
    website: 'Website',
    feedback: '反馈',
    share: '分享'
};

export default class MoreMenu extends Menu {

    // onOptionClick(tab, params) {
    //     let TargetComponent;
    //     switch (tab) {
    //         case MORE_MENU.custom_language:
    //             TargetComponent = CustomKeyPage;
    //             params.flag = FLAG_LANGUAGE.flag_language;
    //             break;
    //         case MORE_MENU.custom_key:
    //             TargetComponent = CustomKeyPage;
    //             params.flag = FLAG_LANGUAGE.flag_key;
    //             break;
    //         case MORE_MENU.remove_key:
    //             TargetComponent = CustomKeyPage;
    //             params.flag = FLAG_LANGUAGE.flag_key;
    //             params.isRemoveKey = true;
    //             break;
    //         case MORE_MENU.sort_key:
    //             TargetComponent = SortKeyPage;
    //             params.flag = FLAG_LANGUAGE.flag_key;
    //             break;
    //         case MORE_MENU.sort_language:
    //             TargetComponent = SortKeyPage;
    //             params.flag = FLAG_LANGUAGE.flag_language;
    //             break;
    //         case MORE_MENU.custom_theme:
    //             break;
    //         case MORE_MENU.about_author:
    //             TargetComponent = AboutMePage;
    //             break;
    //         case MORE_MENU.about:
    //             TargetComponent = AboutPage;
    //             break;
    //     }
    //     if (TargetComponent) {
    //         params.navigator.push({
    //             component: TargetComponent,
    //             params: params
    //         })
    //     }
    // }

    render() {
        return <Menu
            // onSelect={(value) => this.onOptionClick(value, params)}
            renderer={ContextMenu}>
            <MenuTrigger>
                <View>
                    <Image style={{width: 24, height: 24, marginRight: 5}} source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                </View>
            </MenuTrigger>
            <MenuOptions>
                        return <MenuOption style={styles.menuOption} key={'1'} value={'1'} text={'1'}/>
                {/*<View>*/}
                    {/*{params.items.map((result, i, arr) => {*/}
                        {/*return <MenuOption style={styles.menuOption} key={i} value={arr[i]} text={arr[i]}/>*/}
                    {/*})}*/}
                {/*</View>*/}
            </MenuOptions>
        </Menu>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tips: {
        fontSize: 20
    },
    trigger: {
        fontSize: 18,
        color: 'white',
        fontWeight: '400'
    },
    menuOption: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
    }
});

