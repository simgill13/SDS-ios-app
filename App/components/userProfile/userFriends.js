
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';


class UserFriends extends Component {
  onPressList(friend) {
    console.log(friend);
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.props.friendsList.map((friend, i) => (
            <ListItem
              key={i}
              roundAvatar
              title={friend.name}
              subtitle={friend.email}
              onPress={() => {this.onPressList(friend)}}
              hideChevron
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}


const mapStateToProps = (state) => ({
  friendsList: state.friendsList,
  userId: state.userId,
});
export default connect(mapStateToProps)(UserFriends);
