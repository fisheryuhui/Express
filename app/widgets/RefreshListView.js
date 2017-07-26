import React, { Component } from 'react'
import {
    View,
    Text,
    RefreshControl,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import RefreshState from './RefreshState'

export default class RefreshListView extends Component {
    static propTypes = {
        onHeaderRefresh: React.PropTypes.func,
        onFoooterRefresh: React.PropTypes.func,
    }

    static defaultProps = {
        footerRefreshingText: '数据加载中',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据'
    }

    constructor(props) {
        super(props);
        this.state = {
            headerState: RefreshState.Idle,
            footerState: RefreshState.Idle,
        }
    }

    startHeaderRefreshing() {
        this.setState({ headerState: RefreshState.Refreshing });
        this.props.onHeaderRefresh && this.props.onHeaderRefresh();
    }

    startFooterRefreshing() {
        this.setState({ footerState: RefreshState.Refreshing });
        this.props.onFoooterRefresh && this.props.onFoooterRefresh();
    }

    shouldStartHeaderRefreshing() {
        if (this.state.headerState == RefreshState.Refreshing || this.state.footerState == RefreshState.Refreshing) {
            return false;
        }
        return true;
    }

    shouldStartFooterRefreshing() {
        if (this.state.headerState == RefreshState.Refreshing || this.state.footerState == RefreshState.Refreshing) {
            return false;
        }

        if (this.state.footerState == RefreshState.Failure || this.state.footerState == RefreshState.noMoreData) {
            return false;
        }

        if (this.props.dataSource.getRowCount() == 0) {
            return false;
        }

        return true;
    }

    endRefreshing(refreshState) {
        if (refreshState == RefreshState.Refreshing) {
            return;
        }
        let footerState = refreshState;

        if (this.props.dataSource.getRowCount() == 0) {
            footerState = RefreshState.Idle;
        }
        this.setState({
            headerState: RefreshState.Idle,
            footerState: footerState
        })
    }

    headerState() {
        return this.state.headerState;
    }

    footerState() {
        return this.state.footerState;
    }

    onHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing()) {
            this.startHeaderRefreshing();
        }
    }

    onFoooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    }

    render() {
        return (
            <ListView
                {...this.props}
                enableEmptySections
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.headerState == RefreshState.Refreshing}
                        onRefresh={() => this.onHeaderRefresh()}
                        titleColor='gray'
                    />
                }
                renderFooter={() => this.renderFooter()}
                onEndReachedThreshold={10}
                onEndReached={() => this.onFoooterRefresh()}
            />
        );
    }

    renderFooter() {
        let footer = null;
        switch (this.state.footerState) {
            case RefreshState.Idle:
                break;

            case RefreshState.Failure: {
                footer =
                    <TouchableOpacity style={styles.footerContainer} onPress={() => this.startFooterRefreshing()}>
                        <Text style={styles.footerText}>
                            {this.props.footerFailureText}
                        </Text>
                    </TouchableOpacity>
            }
            case RefreshState.Refreshing: {
                footer =
                    <View style={styles.footerContainer}>
                        <ActivityIndicator size="small" color="#888888">
                            <Text style={styles.footerText}>{this.props.footerRefreshingText}</Text>
                        </ActivityIndicator>
                    </View>
            }
            case RefreshState.noMoreData: {
                footer =
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            {this.props.footerNoMoreDataText}
                        </Text>
                    </View>
            }
        }
        return footer;
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#555555',
    }
});