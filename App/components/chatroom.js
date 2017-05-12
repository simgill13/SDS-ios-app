import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocialLogin from 'react-social-login';

import {
  StyleSheet,
  Linking,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';

import {loginUser} from '../actions/action';
import EmailError from './emailerror';


class ChatRoom extends Component{

  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"tab",
    })
  }



  render(){
    return (
      <LinearGradient colors={['#F7F7F7', '#D7D7D7']}
        style={styles.linearGradient}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => {this.back()}}
            underlayColor="transparent"
            activeOpacity={0.7}>
            <View style={styles.row}>
              <Ionicons name="md-arrow-dropleft" size={32} color="#444444" />
              <Text style={styles.back}> BACK </Text>
            </View>
          </TouchableHighlight>
        </View>
      </LinearGradient>

    );
  }
}

const mapStateToProps = (state) => ({
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
    color: '#444444',
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

export default (ChatRoom);
