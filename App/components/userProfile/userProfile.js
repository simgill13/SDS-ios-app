import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Navigator, StyleSheet } from "react-native";
import { List, ListItem, SearchBar, Button } from "react-native-elements";
import UserFriends from './userFriends';
import User from './user';
import SearchUsers from '../search';
import Btn from '../btn';
import { Components } from 'expo';
const { LinearGradient } = Components;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.search=this.search.bind(this);
  }

  search(){
    this.props.navigator.push({
      id:'search',
    })
  }

  render() {
    return (
      <LinearGradient colors={['#37dbcd', '#0072e4']} style={styles.linearGradient}>
        <User/>
        <View style={{ backgroundColor: 'rgba(26,83,178,.35)', alignItems:'flex-start'}}>
        <Button
          icon={{name: 'plus-circle', type: 'font-awesome'}}
          small
          title="ADD FRIENDS"
          backgroundColor='transparent'
          containerViewStyle={{margin:0, padding: 10}}
          onPress={() => {this.search()}} />
        </View>
        <UserFriends />
      </LinearGradient>
    )
  }
}

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
  },
});
