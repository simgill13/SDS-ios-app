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
import { List, ListItem, Button } from 'react-native-elements';
import { Components } from 'expo';
const { LinearGradient } = Components;

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
      let friendIndex = this.state.addedFriends.indexOf(friend);
      let editFriends = this.state.addedFriends.splice(friendIndex, 1);
    } else {
      this.setState({addedFriends: [...this.state.addedFriends, friend]});
    }
    this.switchedCheck(friend);
    this.forceUpdate();
  }

  nextButton() {
    console.log(this.state.addedFriends);
    this.props.navigator.push({
      id:"newRoomForm",
      data: this.state.addedFriends
    })
  }

  switchedCheck(friend) {
    console.log(this.state.addedFriends.includes(friend));
    if (this.state.addedFriends.includes(friend)) {
      return true;
    } else {
      return false;
    }
  }
// <LinearGradient colors={['#FB2B69', '#FF5B37']}
  render(){
    console.log('currentList', this.state.addedFriends)
    if (this.props.friendsList !== []) {
      return (
      <LinearGradient
        style={{flex:1}}
        colors={['#37dbcd', '#0072e4']}>
        <View>
          <View style={styles.headlineWrap}>
            <Text style={styles.subhead}>Stop, Drop</Text>
            <Text style={styles.small}> & </Text>
            <Text style={styles.headline}>Selfie</Text>
          </View>


        <List containerStyle={{marginBottom: 20, backgroundColor:'transparent', padding: 20}}>
          {
            this.props.friendsList.map((friend, i) => (
              <ListItem
                key={i}
                title={friend.name}
                onPress={() => {this.onPressList(friend)}}
                hideChevron={true}
                switchButton={true}
                switched={this.switchedCheck(friend)}
                onSwitch={() => this.onPressList(friend)}
              />
            ))
          }
        </List>

        <Button
          title="Next"
          onPress={() => {this.nextButton()}}
        />
      </View>
    </LinearGradient>
    );
    } else {
      return (
        <LinearGradient style={{flex:1}} colors={['#37dbcd', '#189fda']}>

          <Text>Add Some Friends</Text>
        </LinearGradient>
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
		color: "#FFF",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead:{
    color: "#FFF",
    fontSize: 42,
    fontWeight:'200',
  },
  headline:{
		marginVertical: -5,
    color: "#FFF",
    fontSize:64,
    fontWeight:'100',
  },
});
