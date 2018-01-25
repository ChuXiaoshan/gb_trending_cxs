/**
 * Created by CxS on 2018/1/18 15:14
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class MyPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
            <NavigationBar
                title='我的'
                statusBar={{backgroundColor: '#6495ED'}}
                style={{backgroundColor: '#6495ED'}}/>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: CustomKeyPage,
                          params: {
                              ...this.props, flag: FLAG_LANGUAGE.flag_key,
                              isRemoveKey: false
                          }
                      })
                  }}>自定义标签</Text>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: CustomKeyPage,
                          params: {
                              ...this.props, flag: FLAG_LANGUAGE.flag_language,
                              isRemoveKey: false
                          }
                      })
                  }}>自定义语言</Text>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: SortKeyPage,
                          params: {
                              ...this.props,
                              flag: FLAG_LANGUAGE.flag_language
                          }
                      })
                  }}>标签排序</Text>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: SortKeyPage,
                          params: {
                              ...this.props,
                              flag: FLAG_LANGUAGE.flag_language
                          }
                      })
                  }}>语言排序</Text>
            <Text style={styles.tips}
                  onPress={() => {
                      this.props.navigator.push({
                          component: CustomKeyPage,
                          params: {
                              ...this.props,
                              isRemoveKey: true,
                          }
                      })
                  }}>标签移除</Text>
        </View>);
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
        backgroundColor: 'pink'
    }
});