/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    View,
    ListView,
    StyleSheet,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import RepositoryDetail from './RepositoryDetail'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
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

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor="#6495ED"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar/>}>

                {this.state.languages.map((r, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='最热'
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    style={{backgroundColor: '#6495ED'}}/>
                {content}
            </View>
        )
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        this.setState({
            isLoading: true
        });
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
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
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                });
                DeviceEventEmitter.emit("showToast", "显示网络数据");
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    getUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(data) {
        return <RepositoryCell
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
                        onRefresh={() => this.onLoad()}
                        colors={["#2196F3", 'red', 'green']}
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={"#2196F3"}
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
    }
});
