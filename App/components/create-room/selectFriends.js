
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem, CheckBox, Icon } from 'react-native-elements';
import { friendsData } from './friendsData';

class SelectFriends extends Component {
  render() {
    return (
      <ScrollView>
        <List>
          {friendsData.map((user) => (
            <ListItem
              key={user.login.username}
              roundAvatar
              avatar={{ uri: user.picture.thumbnail }}
              title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
              subtitle={user.email}
              hideChevron
              icon={{ name: 'home' }}
              />
          ))}
        </List>
      </ScrollView>
    );
  }
}


export default SelectFriends;
