/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger, renderers} from 'react-native-popup-menu';
import {DeviceEventEmitter, Image, ListView, RefreshControl, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import NavigationBar from "../common/NavigationBar";
import RepositoryDetail from './RepositoryDetail';
import TrendingCell from '../common/TrendingCell';
import TimeSpan from '../model/TimeSpan';

const {Popover} = renderers;
const API_URL = 'https://github.com/trending/';
const timeSpans = [new TimeSpan('since=daily', '今 天'), new TimeSpan('since=weekly', '本 周'), new TimeSpan('since=monthly', '本 月')];

export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            timeSpan: 'since=today',
            timeName: '今天',
            languages: []
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.languageDao.fetch()
            .then(r => {
                this.setState({
                    languages: r
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    renderTitleView() {
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
                {timeSpans.map((r, i, arr) => {
                    return <MenuOption key={i} style={styles.menuOption} value={arr[i]} text={arr[i].showText}/>;
                })}
            </MenuOptions>
        </Menu>
    }

    render() {
        let navigationBar = <NavigationBar
            title='趋势'
            titleView={this.renderTitleView()}
            statusBar={{
                backgroundColor: '#6495ED'
            }}
            style={{backgroundColor: '#6495ED'}}/>;
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor="#6495ED"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar/>}>
                {this.state.languages.map((r, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <TrendingTab key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <MenuProvider style={styles.container}>
                {navigationBar}
                {content}
            </MenuProvider>
        )
    }
}

class TrendingTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
        }
    }

    componentDidMount() {
        this.onLoad(this.props.timeSpan, true)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.onLoad(nextProps.timeSpan)
        }
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic)
    }

    onRefresh() {
        this.onLoad(this.props.timeSpan)
    }

    getUrl(category, timeSpan) {
        return API_URL + category + '?' + timeSpan;
    }

    onLoad(timeSpan, isRefresh) {
        this.updateState({
            isLoading: true
        });
        let url = this.getUrl(this.props.tabLabel, timeSpan);
        console.log(url);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                this.updateState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false,
                });
                if (result && result.update_data && !this.dataRepository.checkData(result.update_data)) {
                    DeviceEventEmitter.emit("showToast", "数据过时");
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit("showToast", "显示缓存数据");
                }
            })
            .then(items => {
                if (!items || items.length === 0) return;
                this.updateState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                });
                DeviceEventEmitter.emit("showToast", "显示网络数据");
            })
            .catch(error => {
                this.updateState({
                    result: JSON.stringify(error)
                })
            })
    }

    renderRow(data) {
        return <TrendingCell
            onSelect={() => {
                this.props.navigator.push({
                    component: RepositoryDetail,
                    params: {data: data, ...this.props}
                })
            }}
            key={data.id}
            data={data}/>
    }

    render() {
        return <View style={{flex: 1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                        colors={["#6495ED", 'red', 'green']}
                        tintColor={'#6495ED'}
                        title={'Loading...'}
                        titleColor={"#6495ED"}
                    />}
            />
        </View>
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
