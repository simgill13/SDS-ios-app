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
import $ from 'jquery';
import * as firebase from 'firebase';

import {postingCameraPic} from '../actions/action';


// socket stuff
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'
var CryptoJS = require('crypto-js');
var FileUpload = require('NativeModules').FileUpload;

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
        userId: null,
        image:null,
        uploading:false,
        text:""
      };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.socket = SocketIOClient('https://sdsserver.herokuapp.com/');
    this.socket.on('message', this.onReceivedMessage);
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
    postpic(pickerResult, 'sim')
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


  // handleImageUpload(file) {
  //   console.log('handelimage')
  //   let upload = request.post(CLOUDINARY_UPLOAD_URL)
  //                       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  //                       .field('file', file);

  //   upload.end((err, res) => {
  //     if (err) console.error(err);
  //   });

  // }
}




 

// async function uploadImageAsync(uri) {
//   let apiUrl = 'https://file-upload-example-backend-xqwlckckqc.now.sh/upload';

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }

//   let uriParts = uri.split('.');
//   let fileType = uri[uri.length - 1];

//   let formData = new FormData();
//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   return fetch(apiUrl, options);
// }


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(OurChat);
