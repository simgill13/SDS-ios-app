import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  FlatList,
 } from 'react-native';
import { Components } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ChatRoom from './chatroom';


class UserRooms extends Component{
  constructor(props) {
    super(props);
    this.chatroom=this.chatroom.bind(this)
  }

  convertChatId(chatId){
    let total = 0;
    console.log(chatId);
    console.log(chatId.split(''));
    chatId.split('').forEach((element, i) => {
      if (parseInt(element) !== NaN) {
        let elementNum = chatId.charCodeAt(i);
        console.log(elementNum);
        total += elementNum;
      } else {
        console.log(parseInt(element));
        total += parseInt(element);
      }
    });
    console.log(total);
    return total;
  }

	chatroom(chatId){
		console.log(this.props.navigator)
    console.log(chatId);
    let numChatId = this.convertChatId(chatId)
    console.log(numChatId);
		this.props.navigator.push({
			id:"chatroom",
      data: numChatId
		})
	}

  // myList(){
  //   console.log('hello');
  //   if (this.props.rooms !== []) {
  //     return (
  //       <View style={styles.container}>
  //         <View style={styles.room}>
  //           <TouchableHighlight>
  //             <Text>Create A Room</Text>
  //             {console.log('hello2')}
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     )
  //   } else {
  //     return (
  //       this.props.rooms.map((room, i) => {
  //         <View style={styles.container}>
  //           <View style={styles.room}>
  //             <TouchableHighlight
  //             onPress={() => {this.chatroom(room.id)}}>
  //               <Text>{room.name}</Text>
  //             </TouchableHighlight>
  //           </View>
  //         </View>
  //       })
  //     )
  //   }
  // }

  myRenderItem(item){
    console.log(item);
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item._id}</Text>
        <Text>Go In Room</Text>
        <TouchableHighlight onPress={() => this.chatroom(item._id) }>
        <Text>Click Here</Text>
        </TouchableHighlight>
      </View>
    );
  };

  _onPressItem(chatId){
    console.log(chatId);
  }


  render(){
    console.log(this.props.rooms);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.rooms}
          renderItem={({item}) => this.myRenderItem(item)}
          onPressItem={({item}) => this._onPressItem(item.id)}
        />
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
  rooms: state.rooms,
  userId: state.userId,
});
export default connect(mapStateToProps)(UserRooms);
