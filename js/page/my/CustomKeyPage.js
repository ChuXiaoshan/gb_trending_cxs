/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtils from '../../util/ArrayUtils'
import BaseComponent from "../BaseComponent";
import BackPressComponent from "../../common/BackPressComponent";

export default class CustomKeyPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.isRemoveKey = !!this.props.isRemoveKey;
        this.changeValues = [];
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        this.state = {
            dataArray: []
        };
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.languageDao = new LanguageDao(this.props.flag);
        this.loadData()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        if (this.isRemoveKey) {
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changeValues[i]);
            }
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    onBack() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改',
            [
                {
                    text: '是', onPress: () => {
                        this.onSave();
                    }
                },
                {
                    text: '否', onPress: () => {
                        this.props.navigator.pop();
                    }
                }
            ],
            {cancelable: false}
        )
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        const len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}/>
            </View>
        );
        return views;
    }

    onClick(data) {
        if (!this.isRemoveKey) data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox style={{flex: 1, padding: 10}}
                      onClick={() => this.onClick(data)}
                      leftText={leftText}
                      isChecked={isChecked}
                      checkedImage={<Image
                          style={this.props.theme.styles.tabBarSelectedIcon}
                          source={require('./img/ic_check_box.png')}/>}
                      unCheckedImage={<Image
                          style={this.props.theme.styles.tabBarSelectedIcon}
                          source={require('./img/ic_check_box_outline_blank.png')}/>}
            />)
    }

    render() {
        let title = this.isRemoveKey ? "标签移除" : "自定义标签";
        title = this.props.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveKey ? "移除" : "保存";
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{margin: 10}}>
                <Text style={styles.title}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>;
        let statusBar = {backgroundColor: this.props.theme.themeColor};
        return (<View style={styles.container}>
            <NavigationBar
                title={title}
                statusBar={statusBar}
                style={this.props.theme.styles.navBar}
                leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                rightButton={rightButton}/>
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>);
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        title: {
            fontSize: 20,
            color: 'white'
        },
        text: {
            fontSize: 20,
        },
        line: {
            height: 0.3,
            backgroundColor: 'darkgray',

        },
        item: {
            flexDirection: 'row',
            alignItems: "center"
        }
    });