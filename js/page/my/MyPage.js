/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage'

export default class MyPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
            <NavigationBar
                title='我的'
                statusBar={{backgroundColor: 'pink'}}
                style={styles.navigationBar}/>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: CustomKeyPage,
                          params: {...this.props}
                      })
                  }}>自定义标签</Text>
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