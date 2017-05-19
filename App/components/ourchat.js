import React, {Component} from 'react';
import {connect} from 'react-redux';
import {config} from '../../secret';  
import {
  StyleSheet,
  Image,
  Linking,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator,
  AsyncStorage,
  ActivityIndicator,
  Button,
  Clipboard,
  Share,
  StatusBar
} from 'react-native';
import { Components,Constants,ImagePicker } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import Head from './head';
import styles from './styles.js';
var CryptoJS = require('crypto-js');




import {postingCameraPic} from '../actions/action';

// socket stuff

import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'
const USER_ID = '@userId';




class OurChat extends Component{

  constructor(props){
    super(props)
      this.state = {
        messages: [],
        userId: null,
        chatId: 5,
        image:null,
        uploading:false,
        counter:0,
        userNumber: 1
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
  }

  componentDidMount(){
    console.log("Hello from component did mont")
      
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}]}>
          <ActivityIndicator
            color="#fff"
            animating
            size="large"
          />
        </View>
      );
    }
  }


  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View >
        <View style={{borderTopRightRadius: 3, borderTopLeftRadius: 3, overflow: 'hidden'}}>
          <Image
            source={{uri: image}}
            style={{width: 250, height: 250}}
          />
        </View>

        <Text style={{paddingVertical: 10, paddingHorizontal: 10}}>
          {image}
        </Text>
      </View>
    );
  }

  upload(pickeruri){

    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = '396646677724831'
    let api_secret = '0O5anAZgvi0h2UDAqFHAVF9x4yg'
    let cloud = 'sds-images'
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      console.log(xhr);
    };
    let formdata = new FormData();
    formdata.append('file', {uri: pickeruri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }







  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this.upload(pickerResult.uri)
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
        { this._maybeRenderImage() }
        { this._maybeRenderUploadingOverlay() }
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
