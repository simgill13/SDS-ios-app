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
import styles from './styles.js';



// socket stuff
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'

const USER_ID = '@userId';


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
     backID='tab'
     color='#444444' />
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
