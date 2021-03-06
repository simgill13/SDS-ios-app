import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry,
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	Image,
	Button, } from 'react-native';
import { Components } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { sendNotification } from '../actions/action';

class Head extends Component {
	constructor(props) {
    super(props);
		this.sendGroupNotification = this.sendGroupNotification.bind(this);
  }

	back() {
    this.props.navigator.push({
      id:this.props.backID,
    })
  }

	sendGroupNotification() {
		this.props.userPushTokens.forEach(user => {
			this.props.dispatch(sendNotification(user, `Time to Stop, Drop, & Selfie!`));
		})
	}

	_renderNotificationSender() {
		if (this.props.inChat){
			return (
				<TouchableHighlight
					style={styles.headerRight}
					onPress={() => {this.sendGroupNotification()}}
					underlayColor="transparent"
					activeOpacity={0.7}>
					<Entypo name="paper-plane" size={30} color={'#b0b0b0'} />
				</TouchableHighlight>
			)
		} else {
			return (<View style={styles.headerRight} />);
		}
	}

  render() {
    return (
			<View style={styles.header}>
	      <TouchableHighlight
					style={styles.headerLeft}
	        onPress={() => {this.back()}}
	        underlayColor="transparent"
	        activeOpacity={0.7}>
					<View style={styles.row}>
	          <Ionicons
							name="md-arrow-dropleft"
							style={{
								color: this.props.color,
								fontSize: 24,
							}} />
	          <Text
							style={{
								color: this.props.color,
								marginLeft: 5,
								fontSize: 14,
								marginBottom: 2.125,
							}}> BACK </Text>
	        </View>
	      </TouchableHighlight>
        <View style={styles.headerCenter}>
          <Text
						style={{
							color: this.props.color,
							fontSize: 30,
					    fontWeight:'200',
							alignItems: 'center',
							justifyContent: 'center',
						}}> {this.props.title} </Text>
        </View>
				{this._renderNotificationSender()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
		marginVertical: 0,
    flexDirection: 'row',
		paddingLeft: 15,
		paddingRight: 15,
    alignItems: 'flex-end',
    height: 50,
	},
  headerLeft: {
    flex: 1,
		alignItems: 'flex-start',
  },
  headerRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  headerCenter: {
    flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
		alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Head);
