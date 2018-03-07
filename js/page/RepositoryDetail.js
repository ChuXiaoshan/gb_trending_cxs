import React, {Component} from 'react';
import {
    View,
    Image,
    WebView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao';
import ViewUtils from '../util/ViewUtils';
import BaseComponent from "./BaseComponent";

const TRENDING_URL = 'https://github.com/';

export default class RepositoryDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.url = this.props.projectModel.item.html_url ? this.props.projectModel.item.html_url : TRENDING_URL + this.props.projectModel.item.fullName;
        let title = this.props.projectModel.item.full_name ? this.props.projectModel.item.full_name : this.props.projectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            url: this.url,
            title: title,
            canGoBack: false,
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        }
    }

    go() {
        this.setState({
            url: this.text
        })
    }

    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
        })
    }

    /**
     * favoriteIcon 的单击回调函数
     */
    onRightButtonClick() {
        let projectModel = this.props.projectModel;
        projectModel.isFavorite = !projectModel.isFavorite;
        this.setFavoriteState(projectModel.isFavorite);
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key)
        }
    }

    renderRightButton() {
        return <TouchableOpacity
            onPress={() => this.onRightButtonClick()}>
            <Image style={{width: 20, height: 20, marginRight: 10}}
                   source={this.state.favoriteIcon}/>
        </TouchableOpacity>
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.themeColor
        };
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={statusBar}
                    rightButton={this.renderRightButton()}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    style={this.props.theme.styles.navBar}/>
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        margin: 2
    }
});
