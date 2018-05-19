import firebase from "firebase";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Header,
  Button,
  Card,
  CardSection,
  Spinner
} from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

export default class App extends React.Component {
  state = {
    loggedIn: null
  };

  componentDidMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA34iXC2j8f4lsZiKWBA6Hl3VnoBAxK2KM",
      authDomain: "authentication-d111f.firebaseapp.com",
      databaseURL: "https://authentication-d111f.firebaseio.com",
      projectId: "authentication-d111f",
      storageBucket: "authentication-d111f.appspot.com",
      messagingSenderId: "437974671853"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      console.log("user", user);

      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  logOut = () => {
    firebase.auth().signOut();
  };

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onClick={this.logOut}>Log Out</Button>
            </CardSection>
          </Card>
        );

      case false:
        return <LoginForm />;

      default:
        return (
          <Card>
            <CardSection>
              <Spinner />
            </CardSection>
          </Card>
        );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  }
});
