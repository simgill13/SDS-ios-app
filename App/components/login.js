import React, {Component} from 'react';
import SocialLogin from 'react-social-login';
import {StyleSheet,Linking} from 'react-native';
import {Container,Header,Content, Left, Right,Button,Icon,Body,Title,View,ListItem,Text, 
        CheckBox,Footer,FooterTab,CardItem,Card,Form,Item,Label,Input    
 } from 'native-base';


export default class Login extends Component{

  constructor(props){
    super(props)
  }

  back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"home",
    })
  }
  
    

  render(){
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
                <Label>Username</Label>
                <Input />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
            <Button block info>
              <Text>Log In </Text>
            </Button>
          </Content>
        </Container>
    </Container>
    );
  }
}