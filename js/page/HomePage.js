/**
 * Created by CxS on 2017/12/28 14:29
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import FavPage from './FavPage'
import MyPage from './my/MyPage';
import Toast, {DURATION} from 'react-native-easy-toast';
import TrendingPage from './TrendingPage';
import PopupTest from '../../PopupTest';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener("showToast", (text) => {
            this.toast.show(text, DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    _renderTab(Component, selectTab, title, renderIcon) {
        return <TabNavigator.Item
            title={title}
            selectedTitleStyle={{color: 'red'}}
            selected={this.state.selectedTab === selectTab}
            renderIcon={() => <Image style={styles.image} source={renderIcon}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={renderIcon}/>}
            onPress={() => this.setState({selectedTab: selectTab})}>
            <Component {...this.props}/>
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
