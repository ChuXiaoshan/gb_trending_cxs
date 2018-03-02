/**
 * Created by CxS on 2018/3/2 14:55
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import GlobalStyles from '../../../res/styles/GlobalStyles';

export default class CustomTheme extends Component {

    renderContentView() {

    }

    render() {
        return <View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tips: {
        fontSize: 20
    },
    trigger: {
        fontSize: 18,
        color: 'white',
        fontWeight: '400'
    },
    menuOption: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
    }
});