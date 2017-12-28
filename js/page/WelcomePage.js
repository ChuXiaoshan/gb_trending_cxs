/**
 * Created by CxS on 2017/12/28 14:29
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
} from 'react-native';
import NavigationBar from "../common/NavigationBar"
import HomePage from './HomePage'

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigator.resetTo({
                component: HomePage
            })
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return <View>
            <NavigationBar
                title={"欢迎"}
                statusBar={{
                    backgroundColor: '#6495ED'
                }}
                style={{backgroundColor: '#6495ED'}}/>
            <Text>欢迎</Text>
        </View>
    }
}
