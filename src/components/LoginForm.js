import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from "firebase";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  emailChange = email => {
    this.setState({
      email
    });
  };

  passwordChange = password => {
    this.setState({
      password
    });
  };

  onButtonPress = event => {
    const { email, password } = this.state;

    this.setState({
      error: "",
      loading: true
    });

    const auth = firebase.auth();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  };

  onLoginSuccess = () => {
    this.setState({
      email: "",
      password: "",
      error: "",
      loading: false
    });
  };

  onLoginFail = error => {
    console.log(JSON.stringify(error));

    this.setState({
      error: error.message,
      loading: false
    });
  };

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onClick={this.onButtonPress}>Log in</Button>;
  };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="your@email.com"
            value={this.state.email}
            onChangeText={this.emailChange}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            placeholder="your-secret-password"
            value={this.state.password}
            onChangeText={this.passwordChange}
            secureTextEntry={true}
          />
        </CardSection>

        <CardSection>{this.renderButton()}</CardSection>

        <Text style={styles.errorStyle}>{this.state.error}</Text>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

export default LoginForm;
