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
import Btn from '../btn';

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
    this.props.navigator.push({
      id:"newRoomForm",
      data: this.state.addedFriends,
    })
  }

  switchedCheck(friend) {
    if (this.state.addedFriends.includes(friend)) {
      return true;
    } else {
      return false;
    }
  }
// <LinearGradient colors={['#FB2B69', '#FF5B37']}
  render(){
    if (this.props.friendsList !== []) {
      return (
      <LinearGradient
        style={styles.container}
        colors={['#37dbcd', '#0072e4']}>
        <View style={styles.container} >
          <View style={styles.headlineWrap}>
            <Text style={styles.subhead}>Stop, Drop</Text>
            <Text style={styles.small}> & </Text>
            <Text style={styles.headline}>Selfie</Text>
          </View>

        <View style={styles.container}>
          <List style={styles.listContainer}>
            {
              this.props.friendsList.map((friend, i) => (
                <ListItem
                  containerStyle={styles.listItem}
                  key={i}
                  title={friend.name}
                  titleStyle={{color:"#FFF"}}
                  onPress={() => {this.onPressList(friend)}}
                  hideChevron={true}
                  switchButton={true}
                  switched={this.switchedCheck(friend)}
                  onSwitch={() => this.onPressList(friend)}
                />
              ))
            }
          </List>
        </View>
        <Btn
          title="Next"
          onPress={() => {this.nextButton()}}/>
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
    padding: 10,
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
    height: 50,
  },
	headlineWrap: {
		alignItems: 'center',
		flexDirection: 'column',
		marginVertical: 20,
		backgroundColor: 'transparent',
	},
	small: {
		color: "#FFF",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead: {
    color: "#FFF",
    fontSize: 42,
    fontWeight:'200',
  },
  headline: {
		marginVertical: -5,
    color: "#FFF",
    fontSize: 64,
    fontWeight: '100',
  },
  listContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,.5)',
    backgroundColor: 'transparent',
    paddingHorizontal:20,
    marginVertical:20,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.3)',
  },
});
