import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet,Navigator} from 'react-native';
import {Container,Header,Content, Left, Right,Button,Icon,Body,Title,View,ListItem,Text, CheckBox,Footer,FooterTab,
        CardItem,Card,Form,Item,Label,Input} from 'native-base';

import {fetchUser} from '../actions/action';
import EmailError from './emailerror';




 class SignUp extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      email:'',
      password:'',

    };
    this.formSubmit=this.formSubmit.bind(this)
    this.loginhome=this.loginhome.bind(this)
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

  formSubmit(e){
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
   this.props.dispatch(fetchUser(name,email,password));
  }


  render(){

    let errorMessage;
      if (this.props.emailInDb === true) {
        errorMessage=<EmailError/>;
      }

      if (this.props.newUserCreated === true) {
        this.loginhome();
      }
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => {this.back()}} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Sign Up</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={(name) => this.setState({name})} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.setState({email})} />
            </Item>
            <Item  floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({password})} />
            </Item>
            <Button onPress={(e) => {this.formSubmit(e)}} >
              <Text>Sign me up </Text>
            </Button>
            {errorMessage}

          </Form>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  emailInDb:state.emailInDb,
  newUserCreated:state.newUserCreated

});



export default connect(mapStateToProps)(SignUp);
