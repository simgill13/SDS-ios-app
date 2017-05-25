import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';
const {
  Circle,
  G,
  LinearGradient,
  Line,
  Path,
  Rect,
  Defs,
  Stop } = Svg;

export default class ChatsGraphic extends Component {
  render() {
    return (
      <View style={{ width: 120, height: 120, alignItems: 'center',
    justifyContent: 'center'}}>
        <Svg  width="120" height="120" >
          <Defs>
            <LinearGradient id="chats120-a" x1="50%" x2="50%" y1="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFF" stopOpacity=".185"/>
              <Stop offset="100%" stopColor="#FFF"/>
            </LinearGradient>
            <LinearGradient id="chats120-b" x1="50%" x2="50%" y1=".865%" y2="100%">
              <Stop offset="0%" stopColor="#FFF"/>
              <Stop offset="100%" stopColor="#FFF" stopOpacity=".076"/>
            </LinearGradient>
          </Defs>
          <G fill="none" fill-rule="evenodd" transform="translate(-1 10.706)">
            <path fill="url(#chats120-a)" d="M35.6295,0.2938 C28.4025,0.2938 22.5445,6.1528 22.5445,13.3798 L22.5445,25.1138 L62.1165,25.1138 C69.3365,25.1138 75.1885,30.9728 75.1885,38.1988 L75.1885,71.1168 L76.6075,71.1168 L82.2625,77.6878 L100.5385,98.8178 L100.5385,71.1308 L107.5735,71.1308 C114.7855,71.1468 120.6435,65.3128 120.6585,58.1008 L120.6585,13.3798 C120.6655,6.1598 114.8195,0.3018 107.6005,0.2938 L35.6295,0.2938 Z" opacity=".6"/>
            <path fill="url(#chats120-b)" d="M56.8847,29.8827 L12.7557,29.8827 L12.7287,29.8827 C5.6917,29.8897 -0.0073,35.6067 -0.0003,42.6507 L-0.0003,86.2847 C0.0147,93.3217 5.7257,99.0147 12.7557,98.9997 L56.8847,98.9867 L56.9517,98.9867 C63.9597,98.9867 69.6407,93.2997 69.6407,86.2847 L69.6407,42.6507 C69.6407,35.5987 63.9297,29.8827 56.8847,29.8827" opacity=".4"/>
            <path fill="#FFF" d="M69.2636,89.3084 C64.0646,79.4524 54.3626,69.8964 37.5826,67.1784 L37.5886,67.1634 C12.7636,63.1434 9.3846,48.8624 9.2676,48.3274 C8.7446,45.5394 6.0646,43.7054 3.2646,44.2254 C1.8866,44.4844 0.7426,45.2744 -0.0004,46.3424 L-0.0004,53.0004 C1.9546,58.1914 8.1096,69.3024 26.0636,74.9834 L26.0636,98.9964 L54.8176,98.9874 L54.8176,86.6274 C58.3316,90.2474 60.5266,94.3374 61.8996,97.9844 C65.5456,96.4374 68.3056,93.2274 69.2636,89.3084"/>
            <path fill="#FFF" d="M28.2031,52.0125 C28.2031,58.7835 33.6921,64.2725 40.4631,64.2725 C47.2331,64.2725 52.7231,58.7835 52.7231,52.0125 C52.7231,45.2415 47.2331,39.7525 40.4631,39.7525 C33.6921,39.7525 28.2031,45.2415 28.2031,52.0125"/>
          </G>
        </Svg>
      </View>
    );
  }
}