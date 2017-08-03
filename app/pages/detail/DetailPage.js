import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native'
import NavigationItem from '../../widgets/NavigationItem'
import api from '../../api'
import color from '../../widgets/Colors'
import groupPurchaseDetailWithId from '../../api'

export default class DetailPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '团购详情',
        headerStyle: { backgroundColor: color.theme },
        headerRight: (
            <NavigationItem
                iconStyle={{ margin: 8 }}
                icon={require('../../images/public/icon_navigationItem_share.png')}
                onPress={() => { }}
            />
        ),
    });

    render() {
        return (
            <View></View>
        );
    }
}