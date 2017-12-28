import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components'
import Boy from './Boy';
import ListViewText from './ListViewTest';
import FetchTest from './FetchTest';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<TabNavigator>
                <TabNavigator.Item
                title="最热"
                selectedTitleStyle={{color: 'red'}}
                selected={this.state.selectedTab === 'tb_popular'}
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_polular.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_popular'})}>
                <View style={styles.page1}></View>
                </TabNavigator.Item>
                <TabNavigator.Item
                title="趋势"
                selectedTitleStyle={{color: 'red'}}
                selected={this.state.selectedTab === 'tb_trending'}
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_trending.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                <View style={styles.page2}></View>
                </TabNavigator.Item>
                <TabNavigator.Item
                title="收藏"
                selectedTitleStyle={{color: 'red'}}
                selected={this.state.selectedTab === 'tb_favorite'}
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_favorite.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_favorite.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                <View style={styles.page1}></View>
                </TabNavigator.Item>
                <TabNavigator.Item
                title="我的"
                selectedTitleStyle={{color: 'red'}}
                selected={this.state.selectedTab === 'tb_my'}
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_my.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]} source={require('./res/images/ic_my.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_my'})}>
                <View style={styles.page2}></View>
                </TabNavigator.Item>
                 </TabNavigator>
                <Navigator
                    initialRoute={{
                        component: Boy
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component navigator={navigator} {...route.params}/>
                    }}/>
                <ListViewText/>*/}
                <FetchTest/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    image: {
        height: 22,
        width: 22,
    }
});
