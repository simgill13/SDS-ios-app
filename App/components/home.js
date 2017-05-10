import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry,Text,View,TouchableHighlight,StyleSheet,Image,Button} from 'react-native';



class Home extends Component{
	constructor(props) {
    super(props);
    this.signup=this.signup.bind(this)
    this.login=this.login.bind(this)
  }

  signup(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"signup",
    })
  }

  login(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"login",

    })
  }

  render(){
	    return(
      		<View>
      			<Text style={styles.test}> Stop Drop & SELFIE</Text>
            <Button onPress={() => {this.signup()}} title="Sign Up" />
            <Button onPress={() => {this.login()}} title="Log In"/>
      		</View>
	    )
    }
}





const styles = StyleSheet.create({
  test:{
    marginTop:300,
    marginLeft:100
  }

});


const mapStateToProps = (state) => ({
  name:state.name,

});

export default connect(mapStateToProps)(Home);