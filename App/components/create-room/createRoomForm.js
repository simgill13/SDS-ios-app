import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocialLogin from 'react-social-login';

import {
  StyleSheet,
  Linking,
  Navigator,
  Text,
  TextInput,
  Keyboard,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';
import { createRoom } from '../../actions/action';

// import {loginUser} from '../../actions/action';
// import EmailError from './emailerror';
import Btn from '../btn';


class CreateRoomForm extends Component{



  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"home",
    })
  }

  formSubmit(){
    this.onSubmit();
  }

	// onSubmit(){
  //   console.log(this.props.navigator)
  //   this.props.dispatch(createRoom(this.state.roomName, this.props.data, this.props.userId));
  //   this.props.navigator.push({
  //     id:'userrooms',
  //   })
  // }

  render(){

    return (
      <ScrollView>
        <Text>
          Create Room
        </Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.userId
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    },
  header: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
  back: {
    color: '#fff',
    marginLeft: 10,
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

export default connect(mapStateToProps)(CreateRoomForm);
