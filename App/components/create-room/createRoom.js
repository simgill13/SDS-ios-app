import React, {Component} from 'react';
import {connect} from 'react-redux';
import {friendsInvited} from '../../actions/action';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
 } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { Components } from 'expo';


import ChatRoom from '../chatroom';

class CreateRoom extends Component{
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
        <View>
          <View style={styles.headlineWrap}>
            <Text style={styles.subhead}>Stop, Drop</Text>
            <Text style={styles.small}> & </Text>
            <Text style={styles.headline}>Selfie</Text>
          </View>


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

        <Button
          title="Next"
          onPress={() => {this.nextButton()}}
        />
      </View>
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
export default connect(mapStateToProps)(CreateRoom);


const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  back: {
    color: '#fff',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
	headlineWrap:{
		alignItems: 'center',
		flexDirection: 'column',
		marginVertical: 20,
		backgroundColor: 'transparent',
	},
	small:{
		color: "#999999",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead:{
    color: "#999999",
    fontSize: 42,
    fontWeight:'200',
  },
  headline:{
		marginVertical: -5,
    color: "#999999",
    fontSize:64,
    fontWeight:'100',
  },
});
