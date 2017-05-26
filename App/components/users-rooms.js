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
  Image,
} from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons, Entypo } from '@expo/vector-icons';

class UserRooms extends Component{
  constructor(props) {
    super(props);
    this.chatroom=this.chatroom.bind(this)
  }

  convertChatId(chatId){
    let total = 0;
    chatId.split('').forEach((element, i) => {
      if (parseInt(element) !== NaN) {
        let elementNum = chatId.charCodeAt(i);
        total += elementNum;
      } else {
        total += parseInt(element);
      }
    });
    return total;
  }

	chatroom(chatId){
    let numChatId = this.convertChatId(chatId)
		this.props.navigator.push({
			id:"chatroom",
      data: [numChatId, chatId],
		})
	}

  myRenderItem(item){
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
    // console.log(chatId);
  }

  render(){
    return (
      <LinearGradient
        style={styles.container}
        colors={['#37dbcd', '#0072e4']}>
        <View style={styles.header}>
          {/* <Ionicons style={styles.icon} name="ios-trophy-outline" size={102} padding={0} color="#FEAE44" /> */}
          <Entypo style={styles.icon} name="emoji-flirt" size={102} padding={0} color="#FEAE44" />
          <Text style={styles.text} > Welcome </Text>
          <Text style={styles.text2}> Create or Select a Room to begin </Text>
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
