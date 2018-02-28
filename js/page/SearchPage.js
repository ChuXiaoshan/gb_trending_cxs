/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    Platform,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';
import {FLAG_STORAGE} from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import ProjectsModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';
import ActionUtils from "../util/ActionUtils";
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtils from "../util/ViewUtils";
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast';
import Utils from "../util/Utils";
import MakeCancelable from '../util/Cancleable';
import {ACTION_HOME} from "./HomePage";
import makeCancelable from "../util/Cancleable";

const QUERY_STR = '&sort=stars';
const URL = 'https://api.github.com/search/repositories?q=';


export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.favoriteKeys = [];
        this.keys = [];
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.isKeyChange = false;
        this.state = {
            isLoading: false,
            rightButtonText: '搜索',
            showBottomButton: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,})
        }
    }

    loadData() {
        this.updateState({
            isLoading: true,
        });
        this.cancelable = makeCancelable(fetch(this.getUrl(this.inputKey)));
        this.cancelable.promise
            .then(response => response.json())
            .then(responseData => {
                if (!this || !responseData || !responseData.items || responseData.items.length === 0) {
                    this.toast.show(this.inputKey + "什么都没找到", DURATION.LENGTH_SHORT);
                    this.updateState({isLoading: false, rightButtonText: '搜索'});
                    return;
                }
                this.items = responseData.items;
                this.getFavoriteKeys();
                if (!this.checkKeyIsExist(this.keys, this.inputKey)) {
                    this.updateState({showBottomButton: true})
                } else {
                    this.updateState({showBottomButton: false})
                }
            }).catch(e => {
            this.updateState({
                isLoading: false,
                rightButtonText: "搜索"
            })
        })
    }

    /**
     * 更新Project item Favorite状态。
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectsModel(items[i], Utils.checkFavorite(items[i], this.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels),
            rightButtonText: '搜索'
        })
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    getFavoriteKeys() {
        this.favoriteDao.getFavoriteKeys().then(keys => {
            this.favoriteKeys = keys ? keys : [];
            this.flushFavoriteState();
        }).catch(e => {
            this.flushFavoriteState()
        })
    }

    getUrl(key) {
        return URL + key + QUERY_STR;
    }

    componentDidMount() {
        this.initKeys()
    }

    componentWillUnmount() {
        if (this.isKeyChange) {
            DeviceEventEmitter.emit('ACTION_HOME', ACTION_HOME.A_RESTART)
        }
    }

    /**
     * 添加标签
     */
    saveKey() {
        let key = this.inputKey;
        if (this.checkKeyIsExist(this.keys, key)) {
            this.toast.show("已经存在", DURATION.LENGTH_SHORT)
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            this.keys.unshift(key);
            this.languageDao.save(this.keys);
            this.toast.show(key.name + " 保存成功", DURATION.LENGTH_SHORT);
            this.isKeyChange = true;
        }
    }

    async initKeys() {
        this.keys = await this.languageDao.fetch();
    }

    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
        }
        return false;
    }

    updateState(dic) {
        this.setState(dic)
    }

    onBackPress() {
        this.refs.input.blur();
        this.props.navigator.pop();
    }

    onRightButtonClick() {
        if (this.state.rightButtonText === '搜索') {
            this.updateState({rightButtonText: '取消'});
            this.loadData()
        } else {
            this.updateState({rightButtonText: '搜索', isLoading: false});
            this.cancelable.cancel()
        }
    }

    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(() => this.onBackPress());
        let inputView = <TextInput
            ref="input"
            onChangeText={text => this.inputKey = text}
            style={styles.textInput}>
        </TextInput>;
        let rightButton = <TouchableOpacity
            onPress={() => {
                this.refs.input.blur();
                this.onRightButtonClick();
            }}>
            <View style={{marginRight: 10}}>
                <Text style={styles.title}>{this.state.rightButtonText}</Text>
            </View>
        </TouchableOpacity>;
        return <View style={{
            backgroundColor: '#6495ED',
            flexDirection: 'row',
            alignItems: 'center',
            height: Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
            {inputView}
            {rightButton}
        </View>
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
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(this.favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}/>
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') statusBar = <View style={[styles.statusBar, {backgroundColor: '#6495ED'}]}/>;
        let listView = !this.state.isLoading ? <ListView
            dataSource={this.state.dataSource}
            renderRow={(e) => this.renderRow(e)}/> : null;
        let indicatorView = this.state.isLoading ? <ActivityIndicator
            style={styles.centering}
            size='large'
            animating={this.state.isLoading}/> : null;
        let resultView = <View style={{flex: 1}}>
            {indicatorView}
            {listView}</View>;
        let bottomButton = this.state.showBottomButton ? <TouchableOpacity
            onPress={() => this.saveKey()}
            style={[styles.bottomButton, {backgroundColor: "#6495ED"}]}>
            <View style={{justifyContent: 'center'}}>
                <Text style={styles.title}>添加标签</Text>
            </View>
        </TouchableOpacity> : null;
        return <View style={GlobalStyles.root_container}>
            {statusBar}
            {this.renderNavBar()}
            {resultView}
            {bottomButton}
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }
}

const
    NAVBAR_HEIGHT_ANDROID = 50;
const
    NAV_BAR_HEIGHT_IOS = 44;
const
    STATUS_BAR_HEIGHT = 20;
const
    styles = StyleSheet.create({
        container: {
            backgroundColor: 'gray'
        },
        navBar: {
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
            flexDirection: 'row'
        },
        titleViewContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 40,
            right: 40,
            top: 0,
            bottom: 0
        },
        title: {
            fontSize: 18,
            color: 'white',
            fontWeight: '500'
        },
        statusBar: {
            height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
        },
        textInput: {
            flex: 1,
            height: Platform.OS === 'ios' ? 30 : 40,
            borderWidth: Platform.OS === 'ios' ? 1 : 0,
            borderColor: 'white',
            alignSelf: 'center',
            paddingLeft: 5,
            marginRight: 10,
            marginLeft: 5,
            borderRadius: 4,
            opacity: 0.7,
            color: 'white',
        },
        centering: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        bottomButton: {
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
            height: 40,
            position: 'absolute',
            left: 10,
            top: GlobalStyles.window_height - 70,
            right: 10,
            borderRadius: 4,
        }
    });

