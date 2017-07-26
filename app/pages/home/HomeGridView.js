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
import HomeGridItem from './HomeGridItem'
export default class HomeGridView extends Component {
    static defaultProps = {
        infos: []
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.infos.map((info, i) => (
                        <HomeGridItem info={info}
                            key={i}
                            onPress={() => this.props.onGridSelected(i)} />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderTopWidth: screen.onePixel,
        borderLeftWidth: screen.onePixel,
        borderColor: color.border
    }
});