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
    // console.log(user);
    // console.log(this.props.userId)
    this.props.dispatch(addFriend(this.props.userId, user._id));
  }

  renderSearchList() {
    return (
      <ScrollView>
        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.searchedUsers.map((user, i) => (
              <ListItem
                key={i}
                title={user.name}
                onPress={() => {this.onPressList(user)}}
                hideChevron={false}
              />
            ))
          }
        </List>
      </ScrollView>
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
          {this.renderSearchList()}
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
  searchedUsers: state.searchedUsers
});

export default connect(mapStateToProps)(SearchUsers);