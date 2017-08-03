import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
  StatusBar,
  Text,
  FlatList
} from 'react-native';
import color from '../../widgets/Colors'
import screen from '../../common/Screen'
import NavigationItem from '../../widgets/NavigationItem'

import api from '../../api'
import HomeMenu from './HomeMenu'
import HomeGridView from './HomeGridView'
import Space from '../../widgets/Space'
import Cell from '../../widgets/HomeCell'

export default class HomePage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchBar}>
        <Image source={require('../../images/home/search_icon.png')} style={styles.searchIcon}></Image>
        <Text style={{ alignItems: 'center', fontSize: 15, height: 25, margin: 2.5 }}>一点点</Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <NavigationItem title='上海'
        titleStyle={{ color: 'white' }}
        onPress={() => { }}
      />
    ),
    headerRight: (
      <NavigationItem
        iconStyle={{ margin: 8 }}
        icon={require('../../images/home/icon_navigationItem_message_white.png')}
        onPress={() => { }}
      />
    ),
    headerStyle: { backgroundColor: color.theme },
  })

  constructor(props) {
    super(props);
    this.state = {
      discount: [],
      datalist: [],
      refreshing: false,
    }
    this.requestData = this.requestData.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.onCellSelected = this.onCellSelected.bind(this);
  }

  componentDidMount() {
    this.requestData();
  }

  requestData() {
    this.setState(
      {
        refreshing: true,
      }
    )
    this.requestDiscount();
    this.rquestRecommend();
  }

  async requestDiscount() {
    try {
      let respons = await fetch(api.discount);
      let json = await respons.json();
      this.setState({
        discount: json.data
      })
    } catch (error) {
      alert(error)
    }
  }

  async rquestRecommend() {
    try {
      let respons = await fetch(api.recommend);
      let json = await respons.json();
      let datalist = json.data.map(
        (info) => {
          return {
            id: info.id,
            imgurl: info.imgurl,
            mname: info.mname,
            title: `[${info.range}]${info.title}`,
            price: info.price,
          }
        }
      )

      this.setState({
        datalist: datalist,
        refreshing: false,
      })

    } catch (error) {
      this.setState(
        {
          refreshing: false,
        }
      )
         alert(error)
    }
  }

  keyExtractor(item, index) {
    return item.id;
  }

  renderCell(info) {
    return (
      <Cell info={info.item} onPress={this.onCellSelected} />
    );
  }

  onCellSelected(info) {
     this.props.navigation.navigate("Detail", info)
  }

  renderHeader() {
    return (
      <View>
        <HomeMenu menuInfos={api.menuInfo} onMenuSelected={() => { }} />
        <Space />
        <HomeGridView infos={this.state.discount} onGridSelected={() => { }} />
        <Space />
        <View style={styles.selectionHeader}>
          <Text style={{ color: '#222222', fontSize: 13 }}>猜你喜欢</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.datalist}
          keyExtractor={this.keyExtractor}
          refreshing ={this.state.refreshing}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderCell}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  searchBar: {
    width: screen.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
  selectionHeader: {
    height: 40,
    paddingLeft: 10,
    justifyContent: 'center',
    borderColor: color.border,
    borderBottomWidth: screen.onePixel,
    backgroundColor: 'white',
  }
});