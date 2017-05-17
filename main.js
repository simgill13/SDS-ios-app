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
import dummyData from './App/components/dummyData';



class App extends React.Component {

  renderScene(route, navigator){
    switch(route.id){
      case 'home':
        return(<Home navigator={navigator} title="home"/>)
      case 'signup':
        return(<SignUp navigator={navigator} title="signup"/>)
      case 'login':
        return(<Login navigator={navigator} title="login"/>)
      case 'homeloggedin':
        return(<HomeLoggedIn navigator={navigator} title="homeloggedin"/>)
      case 'tab':
          return(<Tab navigator={navigator} title="tab"/>)
      case 'ourgroup':
          return(<OurGroup navigator={navigator} title="ourgroup"/>)
      case 'rooms':
          return(<Rooms navigator={navigator} title="rooms"/>)
      case 'chatroom':
          return(<OurChat navigator={navigator} title="chatroom"/>)
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
