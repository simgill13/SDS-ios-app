import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
 } from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Rooms from './rooms';
import ChatRoom from './chatroom';
import OurGroup from './ourgroup';
import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
  key: string,
  title: string,
  icon: string,
};

type State = NavigationState<Route>;


export default class Tab extends Component {


  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"home",
    })
  }

  state: State = {
    index: 0,
    routes: [
      { key: '1', title: 'Our Chat Rooms', icon: 'md-chatboxes' },
      { key: '2', title: 'Our Group', icon: 'ios-people' },
      // { key: '3', title: 'Third', icon: 'ios-basketball' },
    ],
  };



  _handleChangeTab = index => {
    this.setState({
      index,
    });
  };

  _renderIndicator = props => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[styles.container, { width, transform: [{ translateX }] }]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} style={styles.icon} />;
  };

  _renderBadge = ({ route }) => {
    if (route.key === '1') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>2</Text>
        </View>
      );
    }
    return null;
  };

  _renderFooter = props => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };

  _renderHeader = props => {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => {this.back()}}
          underlayColor="transparent"
          activeOpacity={0.7}>
          <View style={styles.row}>
            <Ionicons name="md-arrow-dropleft" size={32} color="white" />
            <Text style={styles.back}> BACK </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <Rooms
            state={this.state}
            navigator={this.props.navigator}
          />
        );
      case '2':
        return (
          <OurGroup
          state={this.state}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (

      <TabViewAnimated
        style={[styles.container, this.props.style]}
        renderHeader={this._renderHeader}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',

  },
  tab: {
    padding: 1,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 4,
    borderRadius: 2,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },

});
