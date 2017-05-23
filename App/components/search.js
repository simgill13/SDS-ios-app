import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TextInput,
  ScrollView
 } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Components } from 'expo';
import {searchUsers, addFriend} from '../actions/action';
import ChatRoom from './chatroom';


class SearchUsers extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  onPressSearch(query) {
    this.props.dispatch(searchUsers(query))
  }

  onPressList(user){
    this.props.dispatch(addFriend(this.props.userId, user._id));
  }

  checkFriendsList(user) {
    let total = 0;
    console.log(user);
    this.props.friendsList.forEach((friend, i) => {
      if (user.email === friend.email) {
        console.log('friend exists', true);
        total ++;
        return true;
      } else {
        console.log('friend not found', false);
        return false;
      }
    })
    return total > 0;
  }

  renderSearchList() {
    return (
      <List containerStyle={{marginBottom: 20}}>
        {
          // if searchedUser exists in friendsList return true
          //   render ListItem as disabled and with no onPress function and switchButton disabled

          this.props.searchedUsers.map((user, i) => {
            console.log(user);
            if (user === undefined) {
              return;
            }
            console.log('Inside searchedUsers map', this.checkFriendsList(user));
            if (this.checkFriendsList(user)) {
              return (
                <ListItem
                  key={i}
                  title={user.name}
                  hideChevron={true}
                  switchButton={true}
                  switched={true}
                  switchDisabled={true}
                />
              )
            } else {
              return (
                <ListItem
                  key={i}
                  title={user.name}
                  onPress={() => {this.onPressList(user)}}
                  hideChevron={true}
                  switchButton={true}
                />
              )
            }
          })
        }
      </List>
    );
  }

  render(){
    return (
      <View>
        <View>
          <Text>Search</Text>
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Name"
            onChangeText={(query) => this.setState({query})}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View>
          <Text
            onPress={() => this.onPressSearch(this.state.query)}
            >Search</Text>
        </View>

        <View>
          <ScrollView>
            {this.renderSearchList()}
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = {
  inputWrap:{
    flexDirection: 'row',
    marginVertical: 10,
    height:60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  },
  textInput: {
    flex:1,
    alignItems: 'center',
    textAlign: 'left',
    color: '#222222',
    padding: 10,
    margin: 5,
    borderColor: "rgba(255,255,255,.8)",
    borderWidth: 1,
    borderRadius: 3,
  },
  button: {
    backgroundColor: "rgba(255,255,255,.3)",
    flex:1,
    borderColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 50,
    width: 50,
  }
}


const mapStateToProps = (state) => ({
  userId: state.userId,
  searchedUsers: state.searchedUsers,
  friendsList: state.friendsList
});

export default connect(mapStateToProps)(SearchUsers);
