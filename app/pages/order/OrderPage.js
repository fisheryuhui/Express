import React, { Component } from 'react'
import {
    View,
    Text,
    RefreshControl,
    ListView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import screen from '../../common/Screen'
import api from '../../api'
import color from '../../widgets/Colors'
import RefreshListView from '../../widgets/RefreshListView'
import RefreshState from '../../widgets/RefreshState'
import HomeCell from '../../widgets/HomeCell'

export default class OrderPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '订单',
        headerStyle: { backgroundColor: 'white' },
    });

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing();
    }

    async requestData() {
        let response = await fetch(api.recommend);
        let json = await response.json();
        let datalist = json.data.map((info) => {
            return {
                id: info.id,
                imgurl: info.imgurl,
                mname: info.mname,
                title: `[${info.range}]${info.title}`,
                price: info.price,
            }
        })

        datalist.sort(() => { return 0.5 - Math.random() });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datalist),
        })
        setTimeout(() => { this.listView.endRefreshing(RefreshState.noMoreData) }, 500);
    }

    render() {
        return (
            <View style ={styles.container}>
                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => { }}
                    renderRow={(rowData) =>
                        <HomeCell
                            info={rowData}
                            onPress={() => { }}
                        />
                    }
                    onHeaderRefresh={() => this.requestData()}
                />

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    }
}
);