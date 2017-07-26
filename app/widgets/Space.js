import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import color from './Colors'
export default class Space extends Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: color.background
    }
})