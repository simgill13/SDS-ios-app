import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Linking,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
const { LinearGradient } = Components;
import { Components } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { createUser, registerForPushNotificationsAsync, spinnerOn, spinnerOff, EmailInDbOff } from '../actions/action';

 class SignUp extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      incompleteInputError: '',
      invalidEmailError: '',
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.loginhome = this.loginhome.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentWillUnmount(){
    this.props.dispatch(EmailInDbOff());
  }

  back(){
    this.props.navigator.push({
      id:"home",
    })
  }

  loginhome(){
    this.props.navigator.push({
      id:"homeloggedin",
    })
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  formSubmit(e){
    let name = this.state.name.trim();
    let email = this.state.email.trim().toLowerCase();
    let password = this.state.password.trim();
    if (name === '' || email === '' || password === ''){
      this.setState({invalidEmailError:''});
      this.setState({incompleteInputError:'Please fill out each field'});
    } else if (this.validateEmail(email) === false){
      this.setState({incompleteInputError:''});
      this.setState({invalidEmailError:'Please enter a valid email address'});
    } else {
      this.setState({incompleteInputError:''});
      this.setState({invalidEmailError:''});
      this.props.dispatch(spinnerOn())
      this.props.dispatch(registerForPushNotificationsAsync())
      .then(token => {
        this.props.dispatch(createUser(name,email,password,token,this.props.navigator));
      })
      setTimeout(() => {
        this.props.dispatch(EmailInDbOff());
      }, 3000)
    }
  }

  render(){
    let emailExistsError = this.props.emailInDb === true ? 'An account with this email already exists.' : '';
    return (
      <LinearGradient colors={['#cc3366','#8227b3', '#3a49db']}
                      style={styles.linearGradient}>

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
            Sign Up
          </Text>
        </View>

        <View style={styles.row} />

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}
            style={styles.textInput}>
          </TextInput>
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Email Address"
            keyboardType='email-address'
            onChangeText={(email) => this.setState({email})}
            style={styles.textInput}>
          </TextInput>
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            style={styles.textInput}>
          </TextInput>
        </View>

        <View>
          <Text style={styles.errorText}>
            {emailExistsError}
            {this.state.incompleteInputError}
            {this.state.invalidEmailError}
          </Text>
        </View>

        <View style={styles.inputWrap}>
          <TouchableHighlight
              style={styles.button}
              onPress={(c) => {this.formSubmit(c)}}
              underlayColor="transparent"
              activeOpacity={0.7}>
            <View >
              <Text style={styles.buttonText}> Sign Me Up! </Text>
            </View>
          </TouchableHighlight>
        </View>

        <ActivityIndicator
          animating={this.props.spinner}
          style={[styles.centering, {height: 80}]}
          size="small"
        />

        <View style={styles.container} />

      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  emailInDb: state.emailInDb,
  newUserCreated: state.newUserCreated,
  spinner: state.spinner,
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
    height: 50,
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
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
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
    color: '#60b7e2',
  },
  button:{
    backgroundColor: "rgba(255,255,255,.3)",
    flex: 1,
    borderColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonText:{
    fontSize:20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  errorText:{
    textAlign: 'center'
  },
});

export default connect(mapStateToProps)(SignUp);
