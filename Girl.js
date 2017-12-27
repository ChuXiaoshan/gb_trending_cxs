import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class Girl extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderButton(image) {
        return <TouchableOpacity
            onPress={() => {
                this.props.navigator.pop();
            }}>
            <Image style={{width: 28, height: 28, margin: 5}} source={image}/>
        </TouchableOpacity>
    }

    render() {
        return (<View style={styles.container}>
            <NavigationBar
                title={'Girl'}
                statusBar={{
                    backgroundColor: 'pink'
                }}
                style={styles.navigationBar}
                leftButton={
                    this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
                }
                rightButton={
                    this.renderButton(require('./res/images/ic_star.png'))
                }
            />
            <Text style={styles.text}>I am Girl.</Text>
            <Text style={styles.text}>我收到了男孩送的: {this.props.word}</Text>
            <Text style={styles.text} onPress={() => {
                this.props.onCallBack('一盒巧克力');
                this.props.navigator.pop()
            }}>回赠巧克力</Text>
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