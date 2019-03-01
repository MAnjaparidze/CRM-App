/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { MKTextField, MKColor, MKButton, MKTouchable } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';

const LoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();



const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
});


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };


    onAuthSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });
    }

    onAuthFailed() {
        this.setState({
            error: 'Authentication Failed',
            loading: false,
        });
    }

    renderLoader() {
        if (this.state.loading) {
            return <Loader size="large" />;
        } else {
            return <LoginButton onPress={this.onButtonPress.bind(this)} />
        }
    }

    registerUser(email, password) {
        Alert.alert(
            'Attention',
            'Account with this email is not detected, do you want to create new?',
            [
                {
                    text: 'OK', onPress: () => {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(this.onAuthSuccess.bind(this))
                            .catch(this.onAuthFailed.bind(this));
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        this.setState({
                            loading: false,
                        })
                    },
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onAuthSuccess.bind(this))
            .catch((error) => {
                var errorCode = error.code;
                // var errorMessage = error.errorMessage;
                if (errorCode === 'auth/invalid-email') {
                    var errorMessage = 'Invalid email';
                    alert(errorMessage);
                    this.setState({
                        loading: false,
                    })
                }
                if (errorCode === 'auth/user-not-found'){
                    this.registerUser(email, password);
                }
                if (errorCode === 'auth/wrong-password') {
                    var errorMessage = 'Wrong password';
                    alert(errorMessage);
                    this.setState({
                        loading: false,
                    })
                }
            });
    }

    render() {
        const { form, fieldStyles, loginButtonArea, errorMessage, welcome, container } = styles;
        return (
            <View style={form}>
                <Text>Login or create an account</Text>
                <MKTextField
                    text={this.state.email}
                    onTextChange={email => this.setState({ email })}
                    textInputStyle={fieldStyles}
                    placeholder={'Email...'}
                    tintColor={MKColor.Teal}
                />
                <MKTextField
                    text={this.state.password}
                    onTextChange={password => this.setState({ password })}
                    textInputStyle={fieldStyles}
                    placeholder={'Password...'}
                    tintColor={MKColor.Teal}
                    password={true}
                />
                <Text style={errorMessage}>
                    {this.state.error}
                </Text>
                <View style={loginButtonArea}>
                    {this.renderLoader()}
                </View>
            </View>
        );
    }
}
