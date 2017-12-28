/**
 * Created by CxS on 2017/12/28 15:34
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='最热'
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    style={{backgroundColor: '#6495ED'}}/>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar/>}>
                    <PopularTab tabLabel='JAVA'/>
                    <PopularTab tabLabel='IOS'/>
                    <PopularTab tabLabel='ANDROID'/>
                    <PopularTab tabLabel='JAVASCRIPT'/>
                </ScrollableTabView>
            </View>
        )
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    getUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(data) {
        return <View style={{margin:10}}>
            <Text>{data.fullName}</Text>
            <Text>{data.description}</Text>
            <Text>{data.owner.avatar_url}</Text>
            <Text>{data.stargazer_count}</Text>
        </View>
    }

    render() {
        return <View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this.renderRow(data)}>

            </ListView>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tips: {
        fontSize: 20
    }
});
