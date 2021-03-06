/**
 * Created by CxS on 2017/12/26 16:00
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const NAVBAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool
};

export default class NavigationBar extends Component {
    static propTypes = {
        hide: PropTypes.bool,
        title: PropTypes.string,
        style: View.propTypes.style,
        titleView: PropTypes.element,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape)
    };
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        }
    }

    getButtonElement(data) {
        return <View style={styles.navBarButton}>
            {data ? data : null}
        </View>
    }

    render() {
        let status = <View style={[styles.statusBar]}><StatusBar {...this.props.statusBar}/></View>;
        let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>
            {this.getButtonElement(this.props.leftButton)}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.getButtonElement(this.props.rightButton)}
        </View>;
        return <View style={[styles.container, this.props.style]}>
            {status}
            {content}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray'
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
        flexDirection: 'row'
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    navBarButton: {
        alignItems: 'center'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    }
});