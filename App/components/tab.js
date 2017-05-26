import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  Button,
} from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Constants, Svg } from 'expo';
import UserRooms from './users-rooms';
import Head from './head';
import ChatRooms from './icons/chatrooms';
import CreateRoom from './icons/createRoom';
import ProfileIcon from './icons/profileIcon.js';
import UserProfile from './userProfile/userProfile';
import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
  key: string,
  title: string,
  icon: string,
};

type State = NavigationState<Route>;

export default class Tab extends Component {

  back(){
    this.props.navigator.push({
      id:"home",
    })
  }

  state: State = {
    index: 0,
    routes: [
      { key: '1', title: '' },
      { key: '2', title: ''  },
      { key: '3', title: '' },
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
    switch (route.key) {
      case '1':
        return (
          <ChatRooms style={styles.icon} />
        );
      case '2':
        return (
          <CreateRoom style={styles.icon} />
        );
      case '3':
        return (
          <ProfileIcon style={styles.icon}/>
        );
      default:
        return null;
    }
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

//removed head component here
  _renderHeader = props => {
    return(
      <View>

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
          <CreateRoom
            state={this.state}
            navigator={this.props.navigator}
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
    backgroundColor: '#0072e4',
  },
  header: {
    flexDirection: 'column',
    height: 200,
  },
  headlineWrap: {
		alignItems: 'center',
		flexDirection: 'column',
		padding: 10,
	},
  headline: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight:'100',
  },
  tabbar: {
    backgroundColor: '#0479e2',
    borderTopColor:'#ffffff'
  },
  tab: {
    padding: 10,
  },
  icon: {
    width: 44,
    height: 44,
  },
  indicator: {
    flex: 1,
    backgroundColor: 'rgba(26,83,178,.35)',
    margin: 0,
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
  buttonWrap: {
    marginVertical: 10,
    height: 54,
    paddingHorizontal: 100,
  },
  button: {
    backgroundColor: "#D3574A",
    flex: 1,
    borderColor: '#ffffff',
    margin: 5,
    borderRadius: 22,
    borderColor: "rgba(255,255,255,.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#ffffff",
  },
});
