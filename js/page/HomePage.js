/**
 * Created by CxS on 2017/12/28 14:29
 */
import React, {Component} from 'react';
import {DeviceEventEmitter, Image, StyleSheet, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import FavPage from './FavPage'
import MyPage from './my/MyPage';
import Toast, {DURATION} from 'react-native-easy-toast';
import TrendingPage from './TrendingPage';
import BaseComponent from "./BaseComponent";

export const ACTION_HOME = {A_SHOW_TOAST: 'showToast', A_RESTART: 'restart', A_THEME: 'theme'};

export default class App extends BaseComponent {
    constructor(props) {
        super(props);
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : 'tb_popular';
        this.state = {
            selectedTab: selectedTab,
            theme: this.props.theme,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.listener = DeviceEventEmitter.addListener("ACTION_HOME", (action, params) => this.onAction(action, params))
    }

    /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onAction(action, params) {
        if (ACTION_HOME.A_RESTART === action) {
            this.onRestart(params);
        } else if (ACTION_HOME.A_SHOW_TOAST === action) {
            this.toast.show(params.text, DURATION.LENGTH_SHORT);
        }
    }

    /**
     * 重启首页
     * @param jumpToTab 默认显示的页面
     */
    onRestart(jumpToTab) {
        this.props.navigator.resetTo({
            component: App,
            params: {
                ...this.props,
                selectedTab: jumpToTab
            }
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove();
    }

    _renderTab(Component, selectTab, title, renderIcon) {
        return <TabNavigator.Item
            title={title}
            selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
            selected={this.state.selectedTab === selectTab}
            renderIcon={() => <Image style={styles.image} source={renderIcon}/>}
            renderSelectedIcon={() => <Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]} source={renderIcon}/>}
            onPress={() => this.setState({selectedTab: selectTab})}>
            <Component {...this.props} theme={this.state.theme}/>
        </TabNavigator.Item>
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(PopularPage, 'tb_popular', '最热', require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, 'tb_trending', '趋势', require('../../res/images/ic_trending.png'))}
                    {this._renderTab(FavPage, 'tb_favorite', '收藏', require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MyPage, 'tb_my', '我的', require('../../res/images/ic_my.png'))}
                </TabNavigator>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    image: {
        height: 22,
        width: 22,
    }
});
