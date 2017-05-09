import Expo from 'expo';
import React from 'react';
import store from './App/store';
import {Provider} from 'react-redux';
import {AppRegistry,Text,View,Navigator} from 'react-native';
import { StyleSheet } from 'react-native';

import Home from './App/components/home';




class App extends React.Component {
  
  renderScene(route, navigator){
    switch(route.id){
      case 'home':
        return(<Home navigator={navigator} title="home"/>)
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
