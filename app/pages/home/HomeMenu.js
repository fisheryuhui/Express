import React, { Component } from 'react';
import screen from '../../common/Screen'
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import HomeMenuItem from './HomeMenuItem'
import color from '../../widgets/Colors'

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    }
  }
  render() {
    let { menuInfos, onMenuSelected } = this.props;
    let menuItems = menuInfos.map(
      (info, i) => (
        <HomeMenuItem
          key={info.title}
          title={info.title}
          icon={info.icon}
          onPress={() => {
            onMenuSelected(i)
          }} />
      )
    )

    let menuViews = [];
    let pageCount = Math.ceil(menuItems.length / 10);

    for (let i = 0; i < pageCount; i++) {
      let length = menuItems.length < (i * 10) ? menuItems.length - (i * 10) : 10;
      let items = menuItems.slice(i * 10, i * 10 + length);
      let menuView = (
        <View style={styles.itesView} key={i} >{items}</View>
      )
      menuViews.push(menuView)
    }

    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled onScroll={(e) => this.onScroll(e)}>
          <View style={styles.menuContainer}>{menuViews}</View>
        </ScrollView>
      </View>
    );
  }

  onScroll(e) {

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itesView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screen.width,
  },
  menuContainer: {
    flexDirection: 'row',
  }
});