import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry,Text,View,TouchableHighlight,StyleSheet,Image,Button} from 'react-native';



class EmailError extends Component{
	constructor(props) {
    super(props);
  }

 

  render(){
	    return(
      		<View>
      			<Text style={styles.test}> Sorry Someone has this email</Text>  
      		</View>
	    )
    }
}





const styles = StyleSheet.create({
  test:{
    marginLeft:100
  }

});


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(EmailError);