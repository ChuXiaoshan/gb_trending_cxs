/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    ListView,
    StyleSheet,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ProjectsModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Utils from '../util/Utils';
import ActionUtils from "../util/ActionUtils";
import SearchPage from "./SearchPage";

const QUERY_STR = '&sort=stars';
const URL = 'https://api.github.com/search/repositories?q=';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

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

    renderRightButton() {
        return <View>
            <TouchableOpacity

                onPress={() => {
                    this.props.navigator.push({
                        component: SearchPage,
                        params: {
                            ...this.props
                        }
                    })
                }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../res/images/ic_search_white_48pt.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        let navigation = <NavigationBar
            title='最热'
            statusBar={{backgroundColor: '#6495ED'}}
            leftButton={this.renderRightButton()}
            rightButton={this.renderRightButton()}
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
                    return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;


        return <View style={styles.container}>
            {navigation}
            {content}
        </View>
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.isFavoriteChanged = false;
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            favoriteKeys: []
        }
    }

    componentDidMount() {
        this.onLoad();
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
            this.isFavoriteChanged = true;
        })
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }

    componentWillReceiveProps() {
        if (this.isFavoriteChanged) {
            this.isFavoriteChanged = false;
            this.getFavoriteKeys();
        }
    }

    /**
     * 更新Project item Favorite状态。
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectsModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels)
        })
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic)
    }

    onLoad() {
        this.updateState({
            isLoading: true
        });
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                if (result && result.update_date && !Utils.checkDate(result.update_data)) return this.dataRepository.fetchNetRepository(url);
            })
            .then(items => {
                if (!items || items.length === 0) return;
                this.items = items;
                this.getFavoriteKeys();
            })
            .catch(error => {
                console.log(error);
                this.updateState({
                    isLoading: false,
                    result: JSON.stringify(error)
                })
            })
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys()
            .then(keys => {
                if (keys) {
                    this.updateState({favoriteKeys: keys})
                }
                this.flushFavoriteState()
            })
            .catch(e => {
                this.flushFavoriteState()
            })
    }

    getUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(projectModel) {
        return <RepositoryCell
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_popular,
                ...this.props
            })}
            key={projectModel.item.id}
            projectModel={projectModel}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}/>
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
