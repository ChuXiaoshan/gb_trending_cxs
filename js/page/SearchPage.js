/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    View,
    ListView,
    Platform,
    TextInput,
    StatusBar,
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
import ViewUtils from "../util/ViewUtils";

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBackPress() {
    }

    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(() => this.onBackPress());
        let inputView = <TextInput
            style={styles.textInput}>
        </TextInput>
        return <View>
            {backButton}
            {inputView}
        </View>
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') statusBar = <View style={[styles.statusBar, {backgroundColor: '#6495ED'}]}/>
        return <View>
            {statusBar}
            {this.renderNavBar()}
        </View>
    }
}

const NAVBAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const styles = StyleSheet.create({
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
        fontSize: 20,
        color: 'white'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    textInput: {}
});

