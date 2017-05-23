import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Navigator
 } from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Rooms from './rooms';
import UserRooms from './users-rooms'
import Head from './head';
import Styles from './styles';
import OurChat from './ourchat';
import OurGroup from './ourgroup';
import SearchUsers from './search';
import UserProfile from './userProfile/userProfile';
import UserFriends from './userProfile/userFriends';
import CreateRoomForm from './create-room/createRoomForm';
import SelectFriends from './create-room/selectFriends';

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
      { key: '1', title: 'Chat Rooms', icon: 'md-chatboxes' },
      { key: '2', title: '', icon: 'ios-reverse-camera' },
      { key: '3', title: 'My Profile', icon: 'ios-person' },
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
      return(
        <View>
        <Head
          navigator={this.props.navigator}
          title=""
          backID='home'
          color='#93ABC8' />
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <UserRooms
            state={this.state}
            navigator={this.props.navigator}
          />
        );
      case '2':
        return (
          <SearchUsers
          state={this.state}
          />
        );
      case '3':
        return (
          <UserProfile
          state={this.state}
          navigator={this.props.navigator}
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
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'column',
    height: 200,
		backgroundColor: '#171B28'
    },
  headlineWrap:{
		alignItems: 'center',
		flexDirection: 'column',
		padding: 10
	},
  headline:{
    color: "#ffffff",
    fontSize:44,
    fontWeight:'100',
  },
  tabbar: {
    backgroundColor: '#171B28',
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
    backgroundColor: '#232c3b',
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

row: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
buttonWrap:{
  marginVertical: 10,
  height:54,
  paddingHorizontal: 100
},
button:{
  backgroundColor: "#D3574A",
  flex:1,
  borderColor: '#ffffff',
  margin: 5,
  borderRadius: 22,
  borderColor: "rgba(255,255,255,.8)",
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10
},
buttonText:{
  fontSize:18,
  fontWeight: "300",
  color: "#ffffff"
}

});
