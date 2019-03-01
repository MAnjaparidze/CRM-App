import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'firebase/auth';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: "100%",
  },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB57cbRPpFt2fHI74Ub9H2gnTjAPaBAiyY",
      authDomain: "crmlinkedin-4a43e.firebaseapp.com",
      databaseURL: "https://crmlinkedin-4a43e.firebaseio.com",
      projectId: "crmlinkedin-4a43e",
      storageBucket: "crmlinkedin-4a43e.appspot.com",
      messagingSenderId: "439195664995"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />
      case false:
        return <Login />;
      default:
        return <Loader size="large" />;
    }
  }
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            {this.renderInitialView()}
          </View>
       </Provider>
   
    );
  }
}
