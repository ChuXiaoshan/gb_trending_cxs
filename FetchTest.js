import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';
import HttpUtil from './HttpUtil'

export default class FetchTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        }
    }

    onLoad(url) {
        HttpUtil.get(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    onSubmit(url, params) {
        HttpUtil.post(url, params)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    render() {
        return (<View style={styles.container}>
            <NavigationBar title='FetchTest'/>
            <Text style={styles.text}
                  onPress={() => this.onLoad('http://rap.taobao.org/mockjsdata/30652/test')}>
                获取数据</Text>
            <Text style={styles.text}
                  onPress={() => this.onSubmit('http://rap.taobao.org/mockjsdata/30652/submit',
                      {username: 'cxs', pwd: '123456'})}>
                提交数据</Text>
            <Text>返回结果：{this.state.result}</Text>
        </View>);
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
    navigationBar: {
        backgroundColor: 'pink'
    }
});