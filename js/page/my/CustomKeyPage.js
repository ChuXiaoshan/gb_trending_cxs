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
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            dataArray: []
        };
    }

    componentDidMount() {
        this.loadData()
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
        this.props.navigator.pop();
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
                        {this.renderCheckBox(this.state.dataArray[i])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) :
                        this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}/>
            </View>
        );
        return views;
    }

    onClick() {

    }

    renderCheckBox(data) {
        let leftText = data.name;
        return (
            <CheckBox style={{flex: 1, padding: 10}}
                      onClick={() => this.onClick(data)}
                      leftText={leftText}
                      checkedImage={<Image
                          style={{tintColor: '#6495ED'}}
                          source={require('./img/ic_check_box.png')}/>}
                      unCheckedImage={<Image
                          style={{tintColor: '#6495ED'}}
                          source={require('./img/ic_check_box_outline_blank.png')}/>}
            />)
    }

    render() {
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{margin: 10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        return (<View style={styles.container}>
            <NavigationBar
                title='自定义标签'
                statusBar={{
                    backgroundColor: '#6495ED'
                }}
                style={{backgroundColor: '#6495ED'}}
                leftButton={ViewUtils.getLeftButton(() => this.onSave)}
                rightButton={rightButton}/>
            <ScrollView>
                {this.renderView()}
            </ScrollView>
            <Text style={styles.tips}>自定义标签</Text>
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