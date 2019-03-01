import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/AntDesign';

signOutUser = () => {
    Alert.alert(
        'Attention',
        'Are you sure you want to log out?',
        [
            {
                text: 'OK', onPress: () => {
                    try {
                        firebase.auth().signOut();
                    } catch (error) {
                        alert("Something went wrong: " + error);
                    }
                }
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ],
        { cancelable: false },
    );
}

export default class Logout extends Component {
    static navigationOptions = {
        tabBarLabel: 'Logout',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'logout'}
                size={35}
                style={styles.button}
                onPress={signOutUser}
                color={tintColor}
            />
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 35,
        height: 35,
    }
})

