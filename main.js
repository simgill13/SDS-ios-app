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
import Row from './App/components/row';
import FriendsList from './App/components/friends-list';
import UserRooms from './App/components/users-rooms';
import Chat from './App/components/chat';
import CreateRoom from './App/components/create-room/newRoom';
import RoomForm from './App/components/create-room/newRoom-form';
import SearchUsers from './App/components/search';

import UserProfile from './App/components/userProfile/userProfile';


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
      case 'newRoom':
          return(<CreateRoom navigator={navigator} title="rooms"/>)
      case 'chatroom':
          return(<OurChat navigator={navigator} data={route.data} title="chatroom"/>)
      case 'friendslist':
          return(<FriendsList navigator={navigator} title="friendslist"/>)
      case 'userrooms':
          return(<UserRooms navigator={navigator} title="userrooms"/>)
      case 'userProfile':
          return(<UserProfile navigator={navigator} title="userProfile"/>)

      
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
