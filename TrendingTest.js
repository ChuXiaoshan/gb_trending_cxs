import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import NavigationBar from './NavigationBar';
import GitHubTrending from 'GitHubTrending';

const URL = 'https://github.com/trending/';

export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        this.trending = new GitHubTrending();
        this.state = {}
    }

    onLoad() {
        let url = URL + this.text;
        this.trending.fetchTrending(url)
            .then(result => {
                this.setState({result: JSON.stringify(result)})
            })
            .catch(error => {
                this.setState({result: JSON.stringify(error)})
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'TrendingTest'}
                    statusBar={{
                        backgroundColor: '#000000'
                    }}
                    style={styles.navigationBar}/>
                <TextInput style={{height: 40, borderWidth: 1}}
                           onChangeText={(text) => {
                               this.text = text;
                           }}/>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text} onPress={() => this.onLoad()}>加载数据</Text>

                    <Text style={{flex: 1}}>{this.state.result}</Text>
                </View>
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
    navigationBar: {
        backgroundColor: '#000000'
    }
});
