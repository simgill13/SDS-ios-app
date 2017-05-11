import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TextInput,
	Button,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { Components } from 'expo';
const { LinearGradient } = Components;
import { Ionicons } from '@expo/vector-icons';



class Home extends Component{
	constructor(props) {
    super(props);
    this.signup=this.signup.bind(this)
    this.login=this.login.bind(this)
  }

  signup(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"signup",
    })
  }

  login(){
    console.log(this.props.navigator)
    this.props.navigator.push({
      id:"login",

    })
  }

  render(){
	    return(
				<LinearGradient colors={['#FB2B69', '#FF5B37']}
					style={styles.linearGradient}>
					          <View style={styles.row} />
					<View style={styles.container}>

						<View style={styles.headlineWrap}>
							<Text style={styles.subhead}>
								Stop, Drop
							</Text>
							<Text style={styles.small}>
								&
							</Text>
							<Text style={styles.headline}>
								Selfie
							</Text>
						</View>
						<View style={styles.container} />
						<View style={styles.inputWrap}>
							<TouchableHighlight
								style={styles.button}
								title="Sign Up"
								onPress={() => {this.signup()}}
								underlayColor="transparent"
								activeOpacity={0.6}>
									<View >
										<Text style={styles.buttonText}> Sign Up </Text>
									</View>
							</TouchableHighlight>
						</View>
						<View style={styles.inputWrap}>
							<TouchableHighlight
								style={styles.button}
								title="Log In"
								onPress={() => {this.login()}}
								underlayColor="transparent"
								activeOpacity={0.6}>
									<View >
										<Text style={styles.buttonText}> Log In </Text>
									</View>
							</TouchableHighlight>
						</View>

					</View>
					<View style={styles.container} />
				</LinearGradient>
	    )
    }
}



const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    },
  header: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
  back: {
    color: '#fff',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
	headlineWrap:{
		alignItems: 'center',
		flexDirection: 'column',
		marginVertical: 10,
		backgroundColor: 'transparent',
		padding: 30
	},
	small:{
		color: "white",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead:{
    color: "white",
    fontSize: 42,
    fontWeight:'200',
  },
  headline:{
		marginVertical: -5,
    color: "white",
    fontSize:84,
    fontWeight:'100',
  },
 	inputWrap:{
    flexDirection: 'row',
    marginVertical: 10,
    height:60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  },
	button:{
		backgroundColor: "rgba(255,255,255,.3)",
		flex:1,
		borderColor: '#ffffff',
		margin: 5,
		borderRadius: 12,
		borderColor: "rgba(255,255,255,.8)",
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	buttonText:{
		fontSize:20,
		fontWeight: "bold",
		color: "#ffffff"
	}
});


const mapStateToProps = (state) => ({
  name:state.name,

});

export default connect(mapStateToProps)(Home);
