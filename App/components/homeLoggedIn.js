import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry,Text,View,TouchableHighlight,StyleSheet,Image} from 'react-native';
import { Button,Footer,FooterTab,Icon,Badge,Container,Content } from 'native-base';
import OurChat from './ourchat';



class HomeLoggedIn extends Component{
constructor(props) {
  super(props);
  this.state = {
    tab: 'home',
  }; 
  this.renderSelectedTab=this.renderSelectedTab.bind(this);
}

   
renderSelectedTab() {
  console.log('imhere')
   switch (this.state.tab) {
     case 'ourchat':
       return (<OurChat navigator={this.props.navigator}/>);
       break;
     default:
   }
  }
 

  render(){
        return(
   
<Container>
{this.renderSelectedTab()}
                <Content />
                <Footer >
                    <FooterTab>
                        <Button active={this.state.tab==='home'} onPress={() => this.setState({tab:'home'})}>
                            <Icon name="ios-search" /><Text>Home</Text>
                        </Button>
                         <Button active={this.state.tab==='ourchat'} onPress={() => this.setState({tab:'ourchat'})}>
                            <Icon name="ios-search" /><Text>ourchat</Text>
                        </Button> 
                    </FooterTab>
                </Footer>
            </Container>


       
  
                
      
    )
  }
}



const styles = StyleSheet.create({


});


const mapStateToProps = (state) => ({
MainContainer:{
flex:1
},


});



export default connect(mapStateToProps)(HomeLoggedIn);




