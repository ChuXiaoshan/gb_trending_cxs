import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const KEY = "text";

export default class AsyncStorageTest extends Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        AsyncStorage.setItem(KEY, this.text, (e) => {
            if (!e) {
                this.toast.show("保存成功", DURATION.LENGTH_SHORT);
            } else {
                this.toast.show("保存失败", DURATION.LENGTH_SHORT);
            }
        })
    }

    onRemove() {
        AsyncStorage.removeItem(KEY, (e) => {
            if (!e) {
                this.toast.show("移除成功", DURATION.LENGTH_SHORT);
            } else {
                this.toast.show("移除失败", DURATION.LENGTH_SHORT);
            }
        })
    }

    onFetch() {
        AsyncStorage.getItem(KEY, (e, r) => {
            if (!e) {
                if (r !== "" && r !== null) {
                    this.toast.show("取出的内容为：" + r);
                } else {
                    this.toast.show("取出的内容不存在");
                }
            } else {
                this.toast.show("取出失败");
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='趋势'
                    statusBar={{
                        backgroundColor: '#6495ED'
                    }}
                    style={{backgroundColor: '#6495ED'}}/>

                <TextInput style={{borderWidth: 1, height: 40}}
                           onChangeText={text => this.text = text}/>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tips}
                          onPress={() => this.onSave()}>保存</Text>
                    <Text style={styles.tips}
                          onPress={() => this.onRemove()}>移除</Text>
                    <Text style={styles.tips}
                          onPress={() => this.onFetch()}>取出</Text>
                </View>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29,
        margin: 5
    }
});
