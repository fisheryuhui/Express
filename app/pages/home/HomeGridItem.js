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
import color from '../../widgets/Colors'
export default class HomeGridItem extends Component {
    render() {
        let info = this.props.info;
        let title = info.maintitle;
        let color = info.typeface_color;
        let subtitle = info.deputytitle;
        let imageurl = info.imageurl.replace('w.h', '120.0');

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Text style={{ color: color, marginBottom: 10 }}>{title}</Text>
                    <Text style={{ fontSize: 14, color: '#222222' }}>{subtitle}</Text>
                </View>

                <Image style={styles.icon} source={{ uri: imageurl }} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 2 - screen.onePixel,
        height: screen.height / 6,
        backgroundColor: 'white',
        borderBottomWidth: screen.onePixel,
        borderRightWidth: screen.onePixel,
        borderColor: color.border
    },
    icon: {
        width: screen.width / 5,
        height: screen.width / 5,
    }
});