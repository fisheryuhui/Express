import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';
import screen from '../../common/Screen'
import color from '../../widgets/Colors'
import Space from '../../widgets/Space'
import api from '../../api'
import NavigationItem from '../../widgets/NavigationItem'
import MainCell from '../../widgets/MainCell'

export default class MainPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <NavigationItem iconStyle={{ margin: 5 }} icon={require('../../images/main/icon_navigationItem_set_white.png')}
          onPress={() => { }}
        />
        <NavigationItem iconStyle={{ margin: 5 }} icon={require('../../images/home/icon_navigationItem_message_white.png')}
          onPress={() => { }}
        />
      </View>
    ),
    headerStyle: { backgroundColor: color.theme },
  })

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false
    }
  }

  onHeaderRefresh() {
    this.setState({
      isRefreshing: true
    })

    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 2000);
  }

  renderCell() {
    let cells = [];
    let datalist = api.mainInfo;
    for (var i = 0; i < datalist.length; i++) {
      let elements = datalist[i];
      for (var j = 0; j < elements.length; j++) {
        let data = elements[j];
        let cell = <MainCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
        cells.push(cell);
      }
      cells.push(<Space key={i} />);
    }
    return (
      <View style={{ flex: 1 }}>{cells}</View>
    )
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <Image style={styles.avator} source={require('../../images/main/icon_userreview_defaultavatar.png')} />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Fisher</Text>
              <Image style={{ width: 20, height: 20, margin: 4 }} source={require('../../images/main/beauty_technician_v15.png')} />
            </View>
            <Text style={{ color: 'white', marginTop: 4, fontSize: 13 }}>个人信息></Text>
          </View>
        </View>
      </View>
    );
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.background }}>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor='gray'
            />}>
          {this.renderHeader()}
          <Space />
          {this.renderCell()}
        </ScrollView>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.theme,
    paddingBottom: 20,
  },
  icon: {
    width: 27,
    height: 27,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  avator: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6'
  }
});