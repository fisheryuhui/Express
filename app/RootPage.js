import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import color from './widgets/Colors'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import TabBarItem from './widgets/TabBarItem'
import HomePage from './pages/home/HomePage';
import MainPage from './pages/main/MainPage';
import OrderPage from './pages/order/OrderPage'
import Detail from './pages/detail/DetailPage'
 
const Tab = TabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({ focused, tintColr }) => (
                    <TabBarItem
                        tintColr={tintColr}
                        focused={focused}
                        normalImage={require('./images/tabbar/pfb_tabbar_homepage.png')}
                        selectedImage={require('./images/tabbar/pfb_tabbar_homepage_selected.png')} />
                )
            }),
        },
         OrderPage: {
            screen: OrderPage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({ focused, tintColr }) => (
                    <TabBarItem
                        tintColr={tintColr}
                        focused={focused}
                        normalImage={require('./images/tabbar/pfb_tabbar_order.png')}
                        selectedImage={require('./images/tabbar/pfb_tabbar_order_selected.png')} />
                )
            }),
        },
          MainPage: {
            screen: MainPage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColr }) => (
                    <TabBarItem
                        tintColr={tintColr}
                        focused={focused}
                        normalImage={require('./images/tabbar/pfb_tabbar_mine.png')}
                        selectedImage={require('./images/tabbar/pfb_tabbar_mine_selected.png')} />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        backBehavior:'none', 
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }
);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab },
        Detail:{screen: Detail}

    },
    {
        navigationOptions: {
            headerStyle: { backgroundColor: color.theme },
            headerTintColor: '#333333',
            showIcon: true,
            headerTitleStyle:{color:'white'},
            headerTintColor:'white',
        },
    }
);

class RootPage extends Component {
    constructor() {
        super()
        StatusBar.setBarStyle('light-content');
    }

    render() {
        return (
            <Navigator />
        );


    }
}
export default RootPage;