
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class UserFriends extends Component {
  onPressList(friend) {
    console.log(friend);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List style={styles.listContainer}>
          {this.props.friendsList.map((friend, i) => (
            <ListItem
              containerStyle={styles.listItem}
              key={i}
              roundAvatar
              titleStyle={{color:"#FFF"}}
              title={friend.name}
              subtitle={friend.email}
              subtitleStyle={{color:"#FFF"}}
              onPress={() => {this.onPressList(friend)}}
              hideChevron
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  friendsList: state.friendsList,
  userId: state.userId,
});

export default connect(mapStateToProps)(UserFriends);

const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  back: {
    color: '#fff',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
	headlineWrap: {
		alignItems: 'center',
		flexDirection: 'column',
		marginVertical: 20,
		backgroundColor: 'transparent',
	},
	small: {
		color: "#FFF",
		fontSize: 25,
		fontWeight:'300',
		marginVertical: 1,
	},
  subhead: {
    color: "#FFF",
    fontSize: 42,
    fontWeight:'200',
  },
  headline: {
		marginVertical: -5,
    color: "#FFF",
    fontSize: 64,
    fontWeight:'100',
  },
  listContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,.5)',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    marginVertical: 0,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.3)',
  },
});
