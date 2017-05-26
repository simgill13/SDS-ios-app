import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
 } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Components } from 'expo';

class FriendsList extends Component{
  constructor(props) {
    super(props);
    this.chatroom = this.chatroom.bind(this)
  }

	chatroom() {
		this.props.navigator.push({
			id:"chatroom",
		})
	}

  onPressList(friend) {
    console.log(friend);
  }

  render(){
    if (this.props.friendsList !== []) {
      return (
        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.friendsList.map((friend, i) => (
              <ListItem
                key={i}
                title={friend.name}
                onPress={() => {this.onPressList(friend)}}
                hideChevron={true}
              />
            ))
          }
        </List>
      );
    } else {
      return (
        <View>
          <Text>Add Some Friends</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  friendsList: state.friendsList,
  userId: state.userId,
});

export default connect(mapStateToProps)(FriendsList);
