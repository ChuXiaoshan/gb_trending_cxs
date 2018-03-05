/**
 * Created by CxS on 2017/12/28 14:29
 */
import React, {Component} from 'react';
import ThemeDao from '../expand/dao/ThemeDao';
import HomePage from './HomePage';

export default class WelcomePage extends Component {
    componentDidMount() {
        new ThemeDao().getTheme().then((data) => {
            this.theme = data;
        });
        this.timer = setTimeout(() => {
            this.props.navigator.resetTo({
                component: HomePage,
                params: {
                    theme: this.theme,
                }
            });
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return null;
    }
}
