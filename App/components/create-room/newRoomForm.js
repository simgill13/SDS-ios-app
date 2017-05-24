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
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';
import { createRoom } from '../../actions/action';

// import {loginUser} from '../../actions/action';
// import EmailError from './emailerror';
import Btn from '../btn';


class NewRoomForm extends Component{

  constructor(props){
    super(props)
    this.state = {
      roomName: '',
    }
    this.onSubmit=this.onSubmit.bind(this)
  }

  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"newRoom",
    })
  }

  formSubmit(){
    this.onSubmit();
  }

	onSubmit(){
    this.props.dispatch(createRoom(this.state.roomName, this.props.data, this.props.userId));
    this.props.navigator.push({
      id:'userrooms',
    })
  }

  render(){
    console.log('this.props.data', this.props.data);
      console.log('this.props.navigator)', this.props.navigator)
    console.log(this.state.roomName);
    return (
      <LinearGradient colors={['#37dbcd', '#0072e4']} style={styles.linearGradient}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() => {this.back()}}
              underlayColor="transparent"
              activeOpacity={0.7}>
              <View style={styles.row}>
                <Ionicons name="md-arrow-dropleft" size={32} color="white" />
                <Text style={styles.back}> BACK </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.container}>
            <Text style={styles.headline}>
              Room Creation
            </Text>
          </View>

          <View>
            <List containerStyle={{marginBottom: 20}}>
              {
                this.props.data.map((friend, i) => (
                  <ListItem
                    key={i}
                    title={friend.name}
                    onPress={() => {this.onPressList(friend)}}
                    hideChevron={true}
                  />
                ))
              }
            </List>
          </View>

          <View style={styles.row} />

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Room Name"
              onChangeText={(roomName) => this.setState({roomName})}
              style={styles.textInput}>
            </TextInput>
          </View>

          <View style={styles.inputWrap}>
            <TouchableHighlight
              style={styles.button}
              onPress={(c) => {this.formSubmit(c)}}
              underlayColor="transparent"
              activeOpacity={0.7}>
                <View >
                  <Text style={styles.buttonText}>Create Room</Text>
                </View>
            </TouchableHighlight>
          </View>

          <View style={styles.container} />
      </LinearGradient>
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

export default connect(mapStateToProps)(NewRoomForm);
