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
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import TrendingCell from '../common/TrendingCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryDetail from './RepositoryDetail';
import ProjectsModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';
import ArrayUtils from '../util/ArrayUtils';
import ActionUtils from "../util/ActionUtils";
import BaseComponent from "./BaseComponent";

export default class FavPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        }
    }

    render() {
        let content = <ScrollableTabView
            tabBarBackgroundColor={this.state.theme.themeColor}
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={() => <ScrollableTabBar/>}>
            <FavTab tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props}/>
            <FavTab tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props}/>
        </ScrollableTabView>;

        let statusBar = {
            backgroundColor: this.state.theme.themeColor
        };
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='收藏'
                    statusBar={statusBar}
                    style={this.state.theme.styles.navBar}/>
                {content}
            </View>
        )
    }
}

class FavTab extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.unFavoriteItems = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        }
    }

    componentDidMount() {
        this.onLoad(true)
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic)
    }

    componentWillReceiveProps(nextProps) {
        this.onLoad(false);
    }

    onLoad(isShowLoading) {
        if (isShowLoading) {
            this.updateState({
                isLoading: true
            });
        }
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
        ArrayUtils.updateArray(this.unFavoriteItems, item);
        if (this.unFavoriteItems.length > 0) {
            if (this.props.flag === FLAG_STORAGE.flag_popular) {
                DeviceEventEmitter.emit("favoriteChanged_popular")
            } else {
                DeviceEventEmitter.emit("favoriteChanged_trending")
            }
        }
    }

    renderRow(projectModel) {
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;
        let flag = this.props.flag === FLAG_STORAGE.flag_popular ? FLAG_STORAGE.flag_popular : FLAG_STORAGE.flag_trending;
        let id = this.props.flag === FLAG_STORAGE.flag_popular ? projectModel.item.id : projectModel.item.fullName;
        return <CellComponent
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: this.props.flag,
                ...this.props
            })}
            key={id}
            theme={this.props.theme}
            projectModel={projectModel}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag)}/>
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
                        colors={[this.state.theme.themeColor, 'red', 'green']}
                        tintColor={this.state.theme.themeColor}
                        title={'Loading...'}
                        titleColor={this.state.theme.themeColor}
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
