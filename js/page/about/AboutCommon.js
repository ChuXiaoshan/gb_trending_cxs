/**
 * Created by CxS on 2018/1/18 15:14
 */

import React from 'react';
import {Dimensions, Image, Platform, StyleSheet, Text, View,} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {FLAG_STORAGE} from "../../expand/dao/DataRepository";
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectsModel from "../../model/ProjectModel";
import ViewUtils from "../../util/ViewUtils";
import Utils from "../../util/Utils";

export let FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};

export default class AboutCommon {

    constructor(props, updateState, flag_about) {
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.updateState = updateState;
        this.flag_about = flag_about;
        this.favoriteKeys = null;
        this.repositories = [];
        this.props = props;
    }

    /**
     * 通知数据发生改变
     * @param items 改变的数据
     */
    onNotifyDataChanged(items) {
        this.updateFavorite(items);
    }

    /**
     * 更新项目的用户收藏状态
     * @param repositories
     */
    async updateFavorite(repositories) {
        if (repositories) this.repositories = repositories;
        if (this.repositories) return;
        if (!this.favoriteKeys) {
            this.favoriteKeys = await this.favoriteDao.getFavoriteKeys();
        }
        let projectModels = [];
        for (let i = 0, len = this.repositories.length; i < len; i++) {
            projectModels.push(
                new ProjectsModel(this.repositories[i],
                    Utils.checkFavorite(this.repositories[i], this.favoriteKeys ? this.favoriteKeys : null)));
        }
    }

    getParallaxRenderConfig(params) {
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>);
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: params.avatar,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>);
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>);
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.getLeftButton(() => this.props.navigator.pop())}
            </View>);
        return config;
    }

    render(contentView, params) {
        let renderConfig = this.getParallaxRenderConfig(params);
        return (<ParallaxScrollView
                headerBackgroundColor="#333"
                backgroundColor="#6495ED"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 80;
const ROW_HEIGHT = 20;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 52;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'space-between'
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});