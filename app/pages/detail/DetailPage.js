import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    Button,
    TouchableOpacity,
    Image
} from 'react-native'
import NavigationItem from '../../widgets/NavigationItem'
import api from '../../api'
import color from '../../widgets/Colors'
import screen from '../../common/Screen'
import { recommendUrlWithId } from '../../api'
import RefreshListView from '../../widgets/RefreshListView'
import Space from '../../widgets/Space'
import Separator from '../../widgets/Separator'
import RefreshState from '../../widgets/RefreshState'
import HomeCell from '../../widgets/HomeCell'

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

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        this.ListView.startHeaderRefreshing();
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref={(e) => this.ListView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    renderRow={(rowData) =>
                        <HomeCell info={rowData}
                            onPress={() => { }} />
                    }

                    onHeaderRefresh={() => this.requestRecommend()}
                />
            </View>
        );
    }

    async requestRecommend() {
        try {
            let info = this.props.navigation.state.params.info;
            let response = await fetch(recommendUrlWithId(info.id));
            let json = await response.json();

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imgurl: info.imgurl,
                    mname: info.mname,
                    title: `[${info.range}]${info.title}`,
                    price: info.price,
                }
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataList)
            })
            setTimeout(() => { this.ListView.endRefreshing(RefreshState.noMoreData) }, 500);
        } catch (error) {
            this.ListView.endRefreshing(RefreshState.Failure)
        }

    }

    renderHeader() {
        let info = this.props.navigation.state.params.info
        return (
            <View>
                <View>
                    <Image style={styles.banner} source={{ uri: info.imgurl.replace('w.h', '480.0') }}></Image>
                    <View style={styles.topcontainer}>
                        <Text style={{ color: color.theme, fontSize: 15, fontWeight: 'bold' }}>￥</Text>
                        <Text style={{ fontSize: 40, color: color.theme, marginBottom: -8 }}>{info.price}</Text>
                        <Text style={{ fontSize: 13, color: '#777777', marginLeft: 10, fontWeight: 'bold' }}>门市价:￥{(info.price * 1.1).toFixed(0)}</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={{ color: 'white', fontSize: 15 }}>立即抢购</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Separator />
                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../images/home/icon_deal_anytime_refund.png')}></Image>
                        <Text style={{ color: '#89b24f', fontSize: 13, marginLeft: 5 }}>随时退</Text>
                        <View style={{ flex: 1 }}></View>
                        <Text style={{ fontSize: 13, color: '#777777' }}>已售{1234}</Text>
                    </View>
                </View>
                <Space />
                <View style={styles.tipHeader}>
                    <Text style={{ fontSize: 14, color: '#222222' }}>看了本团购的用户还看了</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.65,
    },
    topcontainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: color.theme,
        width: 94,
        height: 36,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white',
    }
});