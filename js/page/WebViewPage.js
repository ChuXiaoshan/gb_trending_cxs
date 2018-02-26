import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtils from '../util/ViewUtils';

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title,
            canGoBack: false
        }
    }

    onBackPress() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url,
        })
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBackPress())}
                    style={{backgroundColor: '#6495ED'}}/>
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}/>
            </View>
        )
    }
}