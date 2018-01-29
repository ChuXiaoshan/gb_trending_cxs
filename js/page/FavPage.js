/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    View,
    ListView,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import TrendingCell from '../common/TrendingCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryDetail from './RepositoryDetail';
import ProjectsModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';

export default class FavPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let content = <ScrollableTabView
            tabBarBackgroundColor="#6495ED"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={() => <ScrollableTabBar/>}>
            <FavTab tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props}/>
            <FavTab tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props}/>
        </ScrollableTabView>;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='收藏'
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    style={{backgroundColor: '#6495ED'}}/>
                {content}
            </View>
        )
    }
}

class FavTab extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            favoriteKeys: []
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic)
    }

    onLoad() {
        this.updateState({
            isLoading: true
        });
        this.favoriteDao.getAllItems()
            .then(items => {
                let resultData = [];
                for (let i = 0, len = items.length; i < len; i++) {
                    resultData.push(new ProjectsModel(items[i], true));
                }
                this.updateState({
                    isLoading: false,
                    dataSource: this.getDataSource(resultData)
                })
            })
            .catch(e => {
                this.updateState({
                    isLoading: false
                })
            })

    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    /**
     * favoriteIcon 的单击回调函数
     * @param item
     * @param isFavorite
     */
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            this.favoriteDao.removeFavoriteItem(item.id.toString())
        }
    }

    renderRow(projectModel) {
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;
        let flag = this.props.flag === FLAG_STORAGE.flag_popular ? FLAG_STORAGE.flag_popular : FLAG_STORAGE.flag_trending;
        let id = this.props.flag === FLAG_STORAGE.flag_popular ? projectModel.item.id : projectModel.item.fullName;
        return <CellComponent
            onSelect={() => {
                this.props.navigator.push({
                    component: RepositoryDetail,
                    params: {projectModel: projectModel, ...this.props, flag: flag},
                })
            }}
            key={id}
            projectModel={projectModel}
            onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}/>
    }

    render() {
        return <View style={{flex: 1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this.renderRow(data)}
                enableEmptySections={true}
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
