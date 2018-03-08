/**
 * Created by CxS on 2018/3/8 14:22
 */

import React from 'react';
import {BackAndroid} from 'react-native';

export default class BackPressComponent {
    constructor(props) {
        this.props = props;
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
    }

    componentDidMount() {
        if (this.props.backPress) BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress)
    }

    componentWillUnmount() {
        if (this.props.backPress) BackAndroid.removeEventListener('hardwareBackPress')
    }

    onHardwareBackPress(e) {
        return this.props.backPress(e)
    }
}