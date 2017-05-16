import React from 'react';

import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({

  header: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
    height: 240,
		backgroundColor: '#232c3b',
    },
		headlineWrap:{
			alignItems: 'center',
			flexDirection: 'column',
			marginVertical: 60,
			backgroundColor: 'transparent',
		},
  headerCenter: {
    flex:1,
		alignItems: 'center',
		justifyContent: 'center',
  },
	title:{
		color: '#ffffff',
		fontSize: 50,
    fontWeight:'100',
		alignItems: 'center',
		justifyContent: 'center',
  },
  back: {
    color: '#63768d',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
		alignItems: 'center',
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

export default Styles;
