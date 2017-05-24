import React, {Component} from 'react';
import {connect} from 'react-redux';
import {friendsInvited} from '../../actions/action';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
 } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { Components } from 'expo';

import InviteFriends from './inviteFriends';
import RoomForm from './newRoom-form';
import X from './x';

class CreateRoom extends Component{
  constructor(props) {
         super(props);
         this.onPress = this.onPress.bind(this)
     }
  onPress(e) {
         e.preventDefault();
         this.props.dispatch(actions.friendsInvited());
   }
  render(){
    return(
      <View>
        <View style={styles.headlineWrap}>
          <Text style={styles.subhead}>Stop, Drop</Text>
          <Text style={styles.small}> & </Text>
          <Text style={styles.headline}>Selfie</Text>
        </View>
        { this.props.friendsInvited ? <X /> : <InviteFriends /> }

        <Button
          title="Next"
          onPress={(e) => {this.onPress(e)}}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  friendsInvited: state.friendsInvited,
  userId: state.userId,
});
export default connect(mapStateToProps)(CreateRoom);

const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
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
		marginVertical: 60,
		backgroundColor: 'transparent',
		padding: 30
	},
	small:{
		color: "#999999",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead:{
    color: "#999999",
    fontSize: 42,
    fontWeight:'200',
  },
  headline:{
		marginVertical: -5,
    color: "#999999",
    fontSize:84,
    fontWeight:'100',
  },
 	inputWrap:{
    flexDirection: 'row',
    marginVertical: 10,
    height:60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
});
