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
  TouchableWithoutFeedback,
  Image
 } from 'react-native';
 import { Components } from 'expo';
 const { LinearGradient } = Components;
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

  createRoom(){
    this.props.navigator.push({
      id:"newRoom",
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
    <TouchableWithoutFeedback onPress={() => this.chatroom(item._id)}>
      <View style={styles.roomContainer}>
        <View  style={styles.roomText}>
          <Text style={styles.roomName}>
           <Ionicons  name="ios-chatbubbles-outline" size={22} paddingRight={20} color="#6F501F" /> {item.roomName}</Text>
        </View>
      </View>

      </TouchableWithoutFeedback>

    );
  };

  _onPressItem(chatId){
    console.log(chatId);
  }


  render(){
    console.log(this.props.rooms);
    return (
      <LinearGradient
        style={styles.container}
        colors={['#37dbcd', '#0072e4']}>
        <View style={styles.header}>
        <Ionicons style={styles.icon} name="ios-trophy-outline" size={102} padding={0} color="#FEAE44" />
          <Text style={styles.text} > Welcome </Text>
          <Text onPress={() => this.createRoom()} style={styles.text2}> Create or Select a Room to begin </Text>
        </View>
        <View style={styles.FlatList}>
          <FlatList
            data={this.props.rooms}
            renderItem={({item}) => this.myRenderItem(item)}
            onPressItem={({item}) => this._onPressItem(item.id)}
          />
        </View>
      </LinearGradient>

    );
  }
}
// this was taken out
//   <Text onPress={() => this.createRoom()}>Create Room</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roomText: {
    flex: 1,
    padding: 40,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,.6)',
    marginVertical: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#AFAFAF',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
   roomName: {

   textAlign:"center",
    fontSize: 22,
    fontWeight:"100",
  },
  icon: {
    textAlign:"center",
    marginTop: 60,
    padding:0
  },
  text: {
    color:"white",
    marginTop:-10,
    fontSize: 40,
    fontWeight:"200",
    textAlign:"center",
  },
   text2: {
    color:"white",
    fontSize: 16,
    fontWeight:"300",
    textAlign:"center",
  },
  FlatList: {
    flex:1
  },
  roomContainer:{
    flex:1,
  },
  roompic:{
    flex:1,
    height:40,
    width:300,

  }

});
const mapStateToProps = (state) => ({
  rooms: state.rooms,
  userId: state.userId,
});
export default connect(mapStateToProps)(UserRooms);
