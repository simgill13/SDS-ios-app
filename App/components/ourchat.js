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
import request from 'superagent';
import Head from './head';
import styles from './styles.js';
import $ from 'jquery';
import * as firebase from 'firebase';


import {postingCameraPic} from '../actions/action';


// socket stuff
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'



const USER_ID = '@userId';
const CLOUDINARY_UPLOAD_PRESET = 'b5jhmyze';
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/sds-images/image/upload"
 var config = {
    apiKey: "AIzaSyCDdRetLuEPQ_KT9mHfU7Bj3qCRB2bW53I",
    authDomain: "sds-ios.firebaseapp.com",
    databaseURL: "https://sds-ios.firebaseio.com",
    projectId: "sds-ios",
    storageBucket: "sds-ios.appspot.com",
    messagingSenderId: "1031085208349"
  };



///  END STYLE  ///////////////

class OurChat extends Component{

  constructor(props){
    super(props)
      this.state = {
        messages: [],
        userId: null,
        chatId: 5,
        image:null,
        uploading:false,
        text:""
      };


    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    const chatId = this.state.chatId;
    this.socket = SocketIOClient('https://sdsserver.herokuapp.com/');
    this.socket.on('message', this.onReceivedMessage,chatId );
    this.determineUser();
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




  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });
    console.log('showjames the IMAGE', pickerResult.uri)
    firebase.initializeApp(config);
    postpic(pickerResult, 'james')
    function postpic(pic,userId) {
      firebase.database().ref('pic/' + userId).set({
        pic
      });
    }
  }



  // _handleImagePicked = async (pickerResult) => {
  //   console.log(pickerResult)
  

  // }


























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
