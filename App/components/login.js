import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocialLogin from 'react-social-login';
import {StyleSheet,Linking} from 'react-native';
import {Container,Header,Content, Left, Right,Button,Icon,Body,Title,View,ListItem,Text,
        CheckBox,Footer,FooterTab,CardItem,Card,Form,Item,Label,Input
 } from 'native-base';

import {loginUser} from '../actions/action';
import EmailError from './emailerror';


class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      Email: '',
      password: '',
    }
  }

  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"home",
    })
  }

  loginhome(){
    this.props.navigator.push({
      id:"homeloggedin",
    });
  }

  formSubmit(e){
    let email = this.state.email;
    let password = this.state.password;
    console.log(email, password);
    this.props.dispatch(loginUser(email, password, this.props.navigator));
  }



  render(){
    // let errorMessage;
    //   if (this.props.incorrectEmailOrPassword === true)
    //     errorMessage=<EmailError/>;
    //   }

      // if (this.props.authenticated === true) {
      //   this.loginhome()
      // }

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => {this.back()}} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Log In</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>

        <Container>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})} />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({password})}/>
              </Item>
            </Form>
            <Button onPress={(e) => {this.formSubmit(e)}} block info>
              <Text>Log In </Text>
            </Button>
          </Content>
        </Container>
    </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  incorrectEmailOrPassword: state.incorrectEmailOrPassword,
});

export default connect(mapStateToProps)(Login);
