import React, {Component} from 'react';
import {connect} from 'react-redux';
import {config} from '../../config';
import {StyleSheet, Image, Linking, Text, TouchableHighlight, TouchableOpacity, View, Navigator, AsyncStorage,
        ActivityIndicator, Button, Clipboard, Share, StatusBar
      } from 'react-native';
import { Components,Constants,ImagePicker } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import Head from './head';
import styles from './styles.js';
var CryptoJS = require('crypto-js');
import {postingCameraPic} from '../actions/action';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'
const USER_ID = '@userId';
import update from 'immutability-helper';

class OurChat extends Component{

  constructor(props){
    super(props)
      this.state = {
        messages: [],
        userId: null,
        chatId: this.props.data,
        image:null,
        uploading:false,
        counter:0,
        userNumber: 1,
        animating:false,
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this.upload = this.upload.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    const chatId = this.state.chatId;
    this.socket = SocketIOClient('https://sdsserver.herokuapp.com/');
    this.socket.on('message', this.onReceivedMessage,chatId );
    this.determineUser();
    this._randomString = this._randomString.bind(this);
  }

  upload(pickeruri){

    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = config.api_key
    let api_secret = config.api_secret
    let cloud = 'sds-images'
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    let newPhoto;
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      let data = JSON.parse(xhr.responseText);
      newPhoto = data.secure_url;

      let currentTime = Date.now();
      console.log("this.state.messages ======", this.state.messages);
      let imageMsg = {
        _id:this._randomString(20),
        user:{ _id: this.state.userId || -1 },
        createdAt: currentTime,
        chatId: this.state.chatId,
        image: newPhoto
      };
      const updatedMsgs = update(this.state.messages, {
        $splice: [[0, 0, imageMsg]]
      });
      this.setState({messages: updatedMsgs});
      this.socket.emit('message', imageMsg, this.state.chatId);
    };
    let formdata = new FormData();
    formdata.append('file', {uri: pickeruri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }

  _randomString = length => {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });
    if (!pickerResult.cancelled){
      this.upload(pickerResult.uri);
    }
  }



  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
       // If there isn't a stored userId, then fetch one from the server.
        const chatId = this.state.chatId;
        if (!userId) {
         this.socket.emit('userJoined', null, chatId);
         this.socket.on('userJoined', (userId, chatId) => {
           AsyncStorage.setItem(USER_ID, userId);
           this.setState({ userId });
         });
       } else {
         this.socket.emit('userJoined', userId, chatId);
         this.setState({ userId });
       }
    })
    .catch((e) => alert(e));
  }

  onReceivedMessage(messages) {
   this._storeMessages(messages);
  }
  onSend(messages=[]) {
    this.socket.emit('message', messages[0], this.state.chatId);
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
     <View >
        <Button
          onPress={this._takePhoto}
          title="Take a photo"
        />
        <StatusBar barStyle="default" />
      </View>
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
