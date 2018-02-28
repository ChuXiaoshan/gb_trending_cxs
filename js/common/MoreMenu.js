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

const {Popover} = renderers;

export const MORE_MENU = {
    custom_language: 'Custom Language',
    sort_language: 'Sort Language',
    custom_key: 'Custom Key',
    sort_key: 'Sort Key',
    remove_key: 'Remove Key',
    about_author: 'About Author',
    custom_theme: 'Custom Theme',
    about: 'About',
    website: 'website',
    feedback: 'feedback',
};

export default class MoreMenu extends Component {
    renderMoreView() {
        return <Menu
            onSelect={(value) => {
                this.setState({
                    timeName: value.showText,
                    timeSpan: value.searchText
                })
            }}
            renderer={Popover}
            rendererProps={{preferredPlacement: 'bottom'}}>
            <MenuTrigger>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}}>趋势 {this.state.timeName}</Text>
                    <Image style={{width: 12, height: 12, marginLeft: 5}} source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption style={styles.menuOption} value={1} text={"1"}/>
                <MenuOption style={styles.menuOption} value={2} text={"2"}/>
                <MenuOption style={styles.menuOption} value={3} text={"3"}/>
                <MenuOption style={styles.menuOption} value={4} text={"4"}/>
                <MenuOption style={styles.menuOption} value={5} text={"5"}/>
            </MenuOptions>
        </Menu>
    }

    render() {
        return this.renderMoreView();
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

