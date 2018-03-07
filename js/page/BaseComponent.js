/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {ACTION_HOME} from "./HomePage";

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        }
    }

    componentDidMount() {
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE',
            (action, params) => this.onBaseAction(action, params))
    }

    onBaseAction(action, params) {
        if (ACTION_HOME.A_THEME === action) {
            this.onThemeChange(params)
        }
    }

    componentWillUnmount() {
        if (this.baseListener) {
            this.baseListener.remove();
        }
    }

    /**
     * 当主题改变后更新主题
     * @param theme
     */
    onThemeChange(theme) {
        if (!theme) return;
        this.setState({
            theme: theme
        })
    }
}
