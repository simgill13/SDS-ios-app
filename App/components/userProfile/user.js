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
          title={this.props.name}
          featured
          email={this.props.email}
        >
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
