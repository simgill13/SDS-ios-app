import React, { Component } from 'react';
import { Text,View,TouchableHighlight, Navigator } from 'react-native';

export default class Btn extends Component{



  render(){
	    return(
        <View style={{
          marginVertical: 10,
          height:60,
          paddingHorizontal:this.props.paddingHorizontal
        }}>
          <TouchableHighlight
            style={{
							flex:1,
              backgroundColor: this.props.backgroundColor,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
              padding: 10,
            }}
            onSubmit={this.props.onSubmit}
            underlayColor="transparent"
            activeOpacity={0.7}>
            <View >
              <Text
                style={{
                  fontSize: this.props.fontSize,
                  color:this.props.color,
                  fontWeight:this.props.fontWeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}> { this.props.title }
              </Text>
            </View>
          </TouchableHighlight>
        </View>
	    )
    }
}

Btn.defaultProps = {
  backgroundColor: "rgba(255,255,255,.3)",
  paddingHorizontal:0,
  fontSize:20,
  color: "#ffffff",
	fontWeight:'400',
}
