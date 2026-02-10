import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternetUi from './NoInternetUi';

const withInternetConnection = WrappedComponent => {
    return class extends Component {
        state = {
            isConnected: true,
            isInternetReachable: true,
        };

        componentDidMount() {
            NetInfo.addEventListener(({ isConnected, isInternetReachable }) => {
                this.handleConnectivityChange(isConnected, isInternetReachable)
            });
        }

        componentWillUnmount() {
            // NetInfo?.removeEventListener(this.handleConnectivityChange);
        }

        handleConnectivityChange = (isConnected, isInternetReachable) => {
            this.setState({ isConnected, isInternetReachable });
        };

        render() {
            if (!this.state.isConnected && !this.state.isInternetReachable) {
                return <NoInternetUi />
            }
            return <WrappedComponent isConnected={this.state.isConnected && this.state.isInternetReachable} {...this.props} />;
        }
    };
};

export default withInternetConnection;
