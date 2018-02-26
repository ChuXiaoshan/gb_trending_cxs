/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import ViewUtils from "../../util/ViewUtils";
import {MORE_MENU} from "../../common/MoreMenu";
import GlobalStyles from "../../../res/styles/GlobalStyles";
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import WebViewPage from '../WebViewPage';
import config from '../../../res/data/config.json';
import AboutMePage from "./AboutMePage";

export default class AboutPage extends Component {

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updateState(dic), FLAG_ABOUT.flag_about, config);
        this.state = {
            projectModels: [],
            author: config.author,
        }
    }

    componentDidMount() {
        this.aboutCommon.componentDidMount()
    }

    updateState(dic) {
        this.setState(dic)
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.website:
                TargetComponent = WebViewPage;
                params.url = 'https://github.com/ChuXiaoshan/gb_trending_cxs';
                params.title = 'gb_trending_cxs';
                break;
            case MORE_MENU.about_author:
                TargetComponent = AboutMePage;
                break;
            case MORE_MENU.feedback:
                let url = 'mailto://xiaoshan1215@gmail.com';
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params
            })
        }
    }

    render() {
        let content = <View>
            {this.aboutCommon.renderRepository(this.state.projectModels)}
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.website), require('../../../res/images/ic_computer.png'), "网站", {tintColor: '#6495ED'})}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.about_author), require('../my/img/ic_insert_emoticon.png'), '关于作者', {tintColor: '#6495ED'})}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.feedback), require('../../../res/images/ic_feedback.png'), '反馈', {tintColor: '#6495ED'})}
            <View style={GlobalStyles.line}/>
        </View>;
        return this.aboutCommon.render(content, {
            'name': 'GitHub Popular',
            'description': '这是一个用来查看GitHub最受欢迎与最热项目的App，它基于React Native，支持Android和IOS双平台。',
            'avatar': this.state.author.avatar,
            'backgroundImg': this.state.author.backgroundImg1
        })
    }
}