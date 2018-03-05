/**
 * Created by CxS on 2017/12/28 18:01
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        }
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.isFavorite)
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
    }

    render() {
        let item = this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel;
        let favoriteButton = this.props.projectModel.item ? <TouchableOpacity
            onPress={() => this.onPressFavorite()}>
            <Image style={[{width: 22, height: 22},this.props.theme.styles.tabBarSelectedIcon]}
                source={this.state.favoriteIcon}/>
                </TouchableOpacity> : null;
                return <TouchableOpacity
                onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.row}>
                <View style={styles.row}>
                <Text>Author:</Text>
                <Image
                style={{height: 22, width: 22}}
                source={{uri: item.owner.avatar_url}}/>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text>Star:</Text>
                <Text>{item.stargazers_count}</Text>
                </View>
                {favoriteButton}
                </View>
                </View>
                </TouchableOpacity>
            }
            }
            const styles=StyleSheet.create({
            row: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
            title: {
            fontSize: 16,
            marginBottom: 2,
            color: '#212121'
        },
            description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        },
            cell_container: {
            backgroundColor: 'white',
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            shadowColor: "gray",
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2,
        }
        });