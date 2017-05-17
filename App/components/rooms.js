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
import { Components } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ChatRoom from './chatroom';


class Rooms extends Component{
  constructor(props) {
    super(props);
    this.chatroom=this.chatroom.bind(this)
  }


	chatroom(){
		console.log(this.props.navigator)
		this.props.navigator.push({
			id:"friendslist",
		})
	}


  render(){
    return (
      <View style={styles.container}>
        <View style={styles.room}>
          <TouchableHighlight
          onPress={() => {this.chatroom()}}>
            <Text>Friends</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.room}>
          <TouchableHighlight>
            <Text>Family</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  room: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#cccccc',
    marginVertical: 10
  },

  header: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  headline:{
    color: "white",
    fontSize: 50,
    fontWeight:'100',
  },
});
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps)(Rooms);
