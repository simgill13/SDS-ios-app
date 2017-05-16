import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  Linking,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';

import Head from './head';



// socket stuff
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'

const USER_ID = '@userId';


///  STYLE  ///////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  header: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      height: 50
    },
  back: {
    color: '#444444',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  title:{
    color: "#444444",
    fontSize: 20,
    fontWeight:'200',
  },
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
  label: {
    margin: 10,
    flex: 1,
    color: '#60b7e2'
  },
  button:{
    backgroundColor: "rgba(255,255,255,.3)",
    flex:1,
    borderColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  buttonText:{
    fontSize:20,
    fontWeight: "bold",
    color: "#ffffff"
  }
});
///  END STYLE  ///////////////

class OurChat extends Component{
 constructor(props){
   super(props)
   this.state = {
     messages: [],
     userId: null
   };

   this.determineUser = this.determineUser.bind(this);
   this.onReceivedMessage = this.onReceivedMessage.bind(this);
   this.onSend = this.onSend.bind(this);
   this._storeMessages = this._storeMessages.bind(this);

   this.socket = SocketIOClient('https://sdsserver.herokuapp.com/');
   this.socket.on('message', this.onReceivedMessage);
   this.determineUser();

 }
 determineUser() {
   AsyncStorage.getItem(USER_ID)
     .then((userId) => {
       // If there isn't a stored userId, then fetch one from the server.
       if (!userId) {
         this.socket.emit('userJoined', null);
         this.socket.on('userJoined', (userId) => {
           AsyncStorage.setItem(USER_ID, userId);
           this.setState({ userId });
         });
       } else {
         this.socket.emit('userJoined', userId);
         this.setState({ userId });
       }
     })
     .catch((e) => alert(e));
 }
 onReceivedMessage(messages) {
   this._storeMessages(messages);
 }
 onSend(messages=[]) {
   this.socket.emit('message', messages[0]);
   this._storeMessages(messages);
 }


 render(){
   var user = { _id: this.state.userId || -1 };
   return (

   <View style={styles.container}>
   <Head
     navigator={this.props.navigator}
     title="Our Chat"
     backID='tab' />
   <GiftedChat
     messages={this.state.messages}
     onSend={this.onSend}
     user={user}
     />
   </View>
   );
 }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(OurChat);
