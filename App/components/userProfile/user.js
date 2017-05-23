import React, { Component } from "react";
import { ScrollView, View } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { userData } from './userData';

class User extends Component {

  render() {
    return (
        <Tile
          style={{marginTop:0}}
          imageSrc={{ uri: this.props.picture.large}}
          featured
          title={`${this.props.name.first} ${this.props.name.last}`}
          caption={this.props.email}
        />

    );
  }
}

User.defaultProps = { ...userData };

export default User;
