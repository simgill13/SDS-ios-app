import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Navigator } from "react-native";
import { List, ListItem, SearchBar, Button } from "react-native-elements";
import UserFriends from './userFriends';
import User from './user';
import SearchUsers from '../search';
import Btn from '../btn';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.search=this.search.bind(this)
  }

  search(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:'search',
    })
  }

  render() {
    return(
      <View>
        <User/>
        <View style={{ backgroundColor: '#a4a4a4'}}>
        <Button
          icon={{name: 'plus-circle', type: 'font-awesome'}}
          small
          title="ADD FRIENDS"
          backgroundColor='#a4a4a4'
          containerViewStyle={{margin:0, padding: 0}}
          onPress={() => {this.search()}} />
        </View>
        <UserFriends />
      </View>
    )
  }
}
export default UserProfile;
