import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry,Text,View,TouchableHighlight,StyleSheet,Image} from 'react-native';



class Home extends Component{
	constructor(props) {
    super(props);
    }

  render(){
	    return(
      		<View>
      			<Text style={styles.test}> Testing and {this.props.name} </Text>
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