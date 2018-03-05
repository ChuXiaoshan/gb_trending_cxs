/**
 * Created by CxS on 2018/3/2 14:55
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    ScrollView,
    Platform,
    TouchableHighlight,
    Text
} from 'react-native';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ThemeFactory, {ThemeFlags} from '../../../res/styles/ThemeFactory'
import ThemeDao from '../../expand/dao/ThemeDao'

export default class CustomTheme extends Component {

    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();
    }

    onSelectTheme(themeKey) {
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey])
    }

    /**
     * 创建主题
     * @param themeKey
     */
    getThemeItem(themeKey) {
        return <TouchableHighlight
            style={{flex: 1}}
            underlayColor='white'
            onPress={() => this.onSelectTheme(themeKey)}>
            <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItems]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>;
    }

    /**
     * 创建主题列表
     * @returns {Array}
     */
    renderThemeItems() {
        let views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            let key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }

    renderContentView() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onClose()
                }}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        let view = this.props.visible ? <View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3,
    },
    themeItems: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});