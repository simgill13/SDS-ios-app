import React, { Component } from "react";
import { ScrollView, View, Text } from 'react-native';
import {connect} from 'react-redux';

import { Tile, List, ListItem, Button } from 'react-native-elements';


class User extends Component {

  render() {
    return (
        <Tile
          imageSrc={{ uri: "https://www.maxim.com/.image/c_limit%2Ccs_srgb%2Cq_80%2Cw_640/MTQ0MzkzMDc1NDEyNzA2OTcw/magnum-pijpg.jpg"}}
          overlayContainerStyle={{ paddingBottom:0, justifyContent:'flex-end'}}
          title="The Guth"
           featured
           caption="james@gmail.com"
           titleStyle={{}}
        >
    // <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end', justifyContent: 'space-between', marginTop:0}}>
    //   <Text style={{ fontSize:20 }}>The Guth</Text>
    //   <Text style={{ fontSize:14, color: '#cccccc' }}>james@gmail.com</Text>
    // </View>
  </Tile>
    );
  }
}


const mapStateToProps = (state) => ({
  name: state.name,
  email:state.email,
  userId: state.userId,
});
export default connect(mapStateToProps)(User);
