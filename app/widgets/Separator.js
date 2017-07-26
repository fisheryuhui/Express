import React,{Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import color from './Colors'
import screen from '../common/Screen'
export default class Separator extends Component {
render(){
    return(
        <View style={{width:screen.width,height:screen.onePixel,backgroundColor:color.border}}></View>
    )
}
}