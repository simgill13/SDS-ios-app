import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
 } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Components } from 'expo';

import ChatRoom from './chatroom';


class SearchUsers extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }


	// chatroom(){
	// 	console.log(this.props.navigator)
	// 	this.props.navigator.push({
	// 		id:"chatroom",
	// 	})
	// }

  onPressSearch(query) {
    console.log(query);
  }

  renderSearchList() {
    console.log('hello');
  }

  render(){
    return (
      <View>
        <View>
          <Text>Search</Text>
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Name"
            onChangeText={(query) => this.setState({query})}
            style={styles.textInput}>
          </TextInput>
        </View>

        <View>
          {this.renderSearchList()}
        </View>

      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(SearchUsers);
