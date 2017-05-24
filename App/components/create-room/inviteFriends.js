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

import ChatRoom from '../chatroom';


class InviteFriends extends Component{
  constructor(props) {
    super(props);
    this.chatroom = this.chatroom.bind(this)

    this.state = {
      addedFriends: [],
    };
  }

  componentWillMount(){
    this.setState({addedFriends: []})
  }

	chatroom(){
		console.log(this.props.navigator)
		this.props.navigator.push({
			id:"chatroom",
		})
	}

  onPressList(friend) {
    if (this.state.addedFriends.includes(friend)) {
      console.log('error');
    } else {
      this.setState({addedFriends: [...this.state.addedFriends, friend]});
    }
  }

  nextButton() {
    console.log(this.state.addedFriends);
    this.props.navigator.push({
      id:"newRoomForm",
      data: this.state.addedFriends
    })
  }



  render(){
    console.log(this.state.addedFriends)
    if (this.props.friendsList !== []) {
      return (
      <View>
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

      </View>
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
export default connect(mapStateToProps)(InviteFriends);
