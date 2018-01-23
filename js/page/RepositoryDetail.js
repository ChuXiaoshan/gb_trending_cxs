import React, {Component} from 'react';
import {
    Text,
    View,
    WebView,
    TextInput,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

const TRENDING_URL = 'https://github.com/';

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.data.html_url ? this.props.data.html_url : TRENDING_URL + this.props.data.fullName;
        let title = this.props.data.full_name ? this.props.data.full_name : this.props.data.fullName;
        this.state = {
            url: this.url,
            title: title,
            canGoBack: false
        }
    }

    go() {
        this.setState({
            url: this.text
        })
    }

    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit("showToast", "到顶了");
        }
    }

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url,
        })
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    style={{backgroundColor: '#6495ED'}}/>
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}/>
            </View>
        )
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        margin: 2
    }
});
