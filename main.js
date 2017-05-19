import Expo from 'expo';
import React from 'react';
import store from './App/store';
import {Provider} from 'react-redux';
import {AppRegistry,Text,View,Navigator} from 'react-native';
import { StyleSheet } from 'react-native';

import styles from './App/components/styles';
import Head from './App/components/head';
import Home from './App/components/home';
import SignUp from './App/components/signup';
import Login from './App/components/login';
import OurChat from './App/components/ourchat';
import Tab from './App/components/tab';
import OurGroup from './App/components/ourgroup';
import Rooms from './App/components/rooms';
import Row from './App/components/row';

import FriendsList from './App/components/friends-list';
import UserRooms from './App/components/users-rooms';
import Chat from './App/components/chat';


class App extends React.Component {

  renderScene(route, navigator){
    switch(route.id){
      case 'home':
        return(<Home navigator={navigator} title="home"/>)
      case 'signup':
        return(<SignUp navigator={navigator} title="signup"/>)
      case 'login':
        return(<Login navigator={navigator} title="login"/>)
      case 'tab':
          return(<Tab navigator={navigator} title="tab"/>)
      case 'ourgroup':
          return(<OurGroup navigator={navigator} title="ourgroup"/>)
      case 'rooms':
          return(<Rooms navigator={navigator} title="rooms"/>)
      // case 'chatroom':
      //     return(<OurChat navigator={navigator} title="chatroom"/>)
      case 'chatroom':
          return(<Chat navigator={navigator} data={route.data} title="chatroom"/>)
      case 'friendslist':
          return(<FriendsList navigator={navigator} title="friendslist"/>)
      case 'userrooms':
          return(<UserRooms navigator={navigator} title="userrooms"/>)
    }
  }
  render(){
    return(
      <Provider store={store}>
        <Navigator
          initialRoute={{id: 'home'}}
          renderScene= {this.renderScene}
        />
      </Provider>
    )
  }

}



Expo.registerRootComponent(App);
