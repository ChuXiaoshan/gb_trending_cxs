/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from '../../util/ViewUtils';
import BackPressComponent from "../../common/BackPressComponent";

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: [],
            theme: this.props.theme
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.languageDao = new LanguageDao(this.props.flag);
        this.loadData();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    loadData() {
        this.languageDao.fetch()
            .then(r => {
                this.getCheckedItems(r);
            })
            .catch(e => {

            })
    }

    getCheckedItems(r) {
        this.dataArray = r;
        let checkedArray = [];
        for (let i = 0, len = r.length; i < len; i++) {
            let data = r[i];
            if (data.checked) checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray,
        });
        this.originalCheckedArray = ArrayUtils.clone(checkedArray)
    }

    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }

    onBack() {
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改',
            [
                {
                    text: '是', onPress: () => {
                        this.onSave(true);
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

    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, l = this.originalCheckedArray.length; i < l; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
        }
    }

    render() {
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{margin: 10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        let title = this.props.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
        let statusBar = {backgroundColor: this.props.theme.themeColor};
        return (<View style={styles.container}>
            <NavigationBar
                title={title}
                leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                rightButton={rightButton}
                statusBar={statusBar}
                style={this.props.theme.styles.navBar}/>
            <SortableListView
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row} {...this.props}/>}
            />
        </View>);
    }
}

class SortCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}>
                <View style={styles.row}>
                    <Image
                        style={[styles.image, {tintColor: this.props.theme.themeColor}]}
                        source={require('./img/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        padding: 25,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 16,
        width: 16,
        marginRight: 10
    },
    title:
        {
            fontSize: 20,
            color: 'white'
        },
});