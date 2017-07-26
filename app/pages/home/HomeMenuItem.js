import React, { Component } from 'react';
import screen from '../../common/Screen'
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class HomeMenuItem extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Image style={styles.icon} source={this.props.icon} resizeMode='contain' />
                <Text style={styles.text}> {this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.height / 6,
    },
    icon: {
        width: screen.width / 9,
        height: screen.height / 9,
        margin: 5,
    },
    text: {
        color: '#222222',
        fontSize: 14,
    }
});