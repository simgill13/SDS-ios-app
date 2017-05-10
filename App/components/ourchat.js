import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet,Navigator} from 'react-native';
import {Container,Header,Content, Left, Right,Button,Icon,Body,Title,View,ListItem,Text, CheckBox,Footer,FooterTab,
        CardItem,Card,Form,Item,Label,Input} from 'native-base';






 class OurChat extends Component{

  constructor(props){
    super(props)
   
   
  }

 
  
  
   
    

  render(){
    return (


               <Container>
              

                   <Header>
                    <Left>
                        <Button onPress={() => {this.back()}} transparent>
                            
                        </Button>
                    </Left>
                    <Body>
                        <Title>Our Chat</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            
                        </Button>
                    </Right>
                </Header>

<Text> CHAT GOES IN HERE </Text>


                </Container>

    );
  }
}


const mapStateToProps = (state) => ({

});



export default connect(mapStateToProps)(OurChat);