import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import screen from '../common/Screen'
import color from '../widgets/Colors'

export default class HomeCell extends Component {

    render() {
        let { info } = this.props;
        let imgurl = info.imgurl.replace('w.h', '120.0');
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress(info)}>
                <Image style={styles.icon} source={{ uri: imgurl }}></Image>
                <View style={styles.rightContainer}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#222222' }} >{info.mname}</Text>
                    <View></View>
                    <Text numberOfLines={0} style={{ marginTop: 8, fontSize: 13, color: '#777777' }}>{info.title}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={[styles.price, { fontSize: 15, fontWeight: 'bold'}]}>{info.price}元</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,

    },
    price: {
        color: color.theme,
    }
});