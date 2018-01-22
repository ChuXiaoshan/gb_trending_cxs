import React, {Component} from 'react';
import {
    Text,
    View,
    WebView,
    TextInput,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from './NavigationBar';

const URL = "http://www.imooc.com";

export default class WebViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '',
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
            title: e.title
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView使用'}
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    style={{backgroundColor: '#6495ED'}}/>
                <View style={styles.row}>
                    <Text onPress={() => {
                        this.goBack();
                    }}
                          style={styles.text}>返回</Text>
                    <TextInput style={styles.input}
                               defaultValue={URL}
                               onChangeText={text => this.text = text}/>
                    <Text
                        onPress={() => {
                            this.go();
                        }}
                        style={styles.text}>前往</Text>
                </View>
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
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
