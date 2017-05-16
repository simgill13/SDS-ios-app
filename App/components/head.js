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
	              <Ionicons name="md-arrow-dropleft" size={32} color="#444444" />
	              <Text style={styles.back}> BACK </Text>
	            </View>
	          </TouchableHighlight>
	          <View style={styles.headerCenter}>
	            <Text style={styles.title} color="#444444"> { this.props.title } </Text>
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
	title:{
		color: '#444444',
		fontSize: 30,
    fontWeight:'200',
		alignItems: 'center',
		justifyContent: 'center',

  },
  back: {
    color: '#444444',
    marginLeft: 5,
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
