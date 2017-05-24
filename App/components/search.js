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
import Head from './head';


class SearchUsers extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      filteredList: this.props.friendsList,
    }
  }

  onPressSearch(query) {
    this.props.dispatch(searchUsers(query))
  }

  onPressList(user){
    this.props.dispatch(addFriend(this.props.userId, user._id));
    this.checkSwitch(user);
    this.setState({filteredList: this.state.filteredList.concat(user)})
    // this.forceUpdate();
  }

  checkFriendsList(user) {
    let total = 0;
    this.state.filteredList.forEach((friend, i) => {
      if (user.email === friend.email) {
        total ++;
        return true;
      } else {
        return false;
      }
    })
    return total > 0;
  }

  checkSwitch(user) {
    let filteredList = this.state.filteredList.map((friend) => {
      return friend._id;
    })
    if (filteredList.includes(user._id)) {
      return true;
    } else {
      return false;
    }
  }

  renderSearchList() {
    return (
      <List containerStyle={{marginBottom: 20}}>
        {
          this.props.searchedUsers.map((user, i) => {
            if (user === undefined) {
              return;
            } 
            if (user._id === this.props.userId) {
              return;
            }
            if (this.checkFriendsList(user)) {
              return (
                <ListItem
                  key={i}
                  title={user.name}
                  hideChevron={true}
                  switchButton={true}
                  switched={this.checkSwitch(user)}
                  switchDisabled={true}
                />
              )
            } else {
              return (
                <ListItem
                  key={i}
                  title={user.name}
                  hideChevron={true}
                  switchButton={true}
                  switched={this.checkSwitch(user)}
                  onSwitch={() => this.onPressList(user)}
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
          <Head
            navigator={this.props.navigator}
            title="Add Friends"
            backID='tab'
            color='#444444' />
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

        
        <ScrollView>
          {this.renderSearchList()}
        </ScrollView>
        
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
