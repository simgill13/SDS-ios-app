import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry,Text,View,TouchableHighlight,StyleSheet,Image,Button} from 'react-native';
import { Components } from 'expo';
import { Ionicons } from '@expo/vector-icons';



class Head extends Component{
	constructor(props) {
    super(props);

  }

	back(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:this.props.backID,
    })
  }


  render(){
	    return(
				<View style={styles.header}>
	          <TouchableHighlight
							style={styles.headerLeft}
	            onPress={() => {this.back()}}
	            underlayColor="transparent"
	            activeOpacity={0.7}>
	            <View style={styles.row}>
	              <Ionicons name="md-arrow-dropleft"
									style={{
									color: this.props.color,
									fontSize:24 }} />
	              <Text style={{
									color: this.props.color,
									marginLeft:5,
									fontSize:14,
									marginBottom:2.125
									 }}> BACK </Text>
	            </View>
	          </TouchableHighlight>
	          <View style={styles.headerCenter}>
	            <Text
								style={{
									color: this.props.color,
									fontSize: 30,
							    fontWeight:'200',
									alignItems: 'center',
									justifyContent: 'center',
								}}> { this.props.title } </Text>
	          </View>
	          <View style={styles.headerRight}></View>
	      </View>
	    )
    }
}


const styles = StyleSheet.create({

  header: {
		marginVertical:15,
    flexDirection: 'row',
		paddingLeft: 15,
		paddingRight:15,
    alignItems: 'flex-end',
    height: 50
    },
  headerLeft: {
    flex:1,
		alignItems: 'flex-start',
    },
  headerRight: {
    alignItems: 'center',
    flex:1
  },
  headerCenter: {
    flex:2,
		alignItems: 'center',
		justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
		alignItems: 'center',
  },
});


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Head);
