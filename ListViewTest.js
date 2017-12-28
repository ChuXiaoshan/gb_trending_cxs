/**
 * Created by CxS on 2017/12/27 16:57
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

var data = {
    "result": [
        {
            "email": "xxxxxx.gmail.com",
            "fullName": "CxS"
        },
        {
            "email": "xxxxfdsfdsfxx.gmail.com",
            "fullName": "CxS"
        },
        {
            "email": "xxxvxcvcxcxvxxx.gmail.com",
            "fullName": "CxS"
        }
    ],
};

export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading: true,
        };
        this.onLoad();
    }

    renderRow(item) {
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={() => {
                    this.toast.show('你单击了：' + item.fullName, DURATION.LENGTH_SHORT)
                }}>
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}/>
    }

    renderFooter() {
        return <Image style={{width: 400, height: 100}} source={{uri: 'https://avatars0.githubusercontent.com/u/11240549?s=460&v=4'}}/>
    }

    onLoad() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000);
    }

    render() {
        return (<View style={styles.container}>
            <NavigationBar title={'ListView'}/>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(item) => this.renderRow(item)}
                renderFooter={() => this.renderFooter()}
                refreshControl={<RefreshControl refreshing={this.state.isLoading}
                                                onRefresh={() => this.onLoad()}/>}
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}/>
            <Toast ref={toast => {
                this.toast = toast
            }}/>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tips: {
        fontSize: 20
    },
    row: {
        height: 70
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    }
});