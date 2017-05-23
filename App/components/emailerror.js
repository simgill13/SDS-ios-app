import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Text, View, TouchableHighlight, StyleSheet, Image, Button } from 'react-native';

class EmailError extends Component{
	constructor(props) {
    super(props);
  }

	render(){
		return(
  		<View>
  			<Text style={styles.test}>An account with this email already exist.</Text>
  		</View>
		)
	}
}

const styles = StyleSheet.create({
  test:{
    marginLeft:100
  }
});

export default connect()(EmailError);
