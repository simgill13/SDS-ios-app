import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Navigator } from "react-native";
import { List, ListItem, SearchBar, Button } from "react-native-elements";

import UserFriends from './userFriends';
import User from './user';
import SearchUsers from '../search';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.search=this.search.bind(this)
  }
  search(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:'searchUsers',
    })
  }

  render() {
    return(
      <View>
        <User/>
        <Button
          onPress={() => {this.search()}}
         />
        <UserFriends />
      </View>
    )
  }
}
export default UserProfile;
