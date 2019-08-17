import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Auth.scss';

class Auth extends React.Component {
  loginEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth">
        <button className="centered btn btn-outline-success btn-lg animated jackInTheBox duration-2s" type="button" onClick={this.loginEvent}>Log in</button>
      </div>
    );
  }
}

export default Auth;
