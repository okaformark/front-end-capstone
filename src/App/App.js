import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Home from '../components/Home/Home';
import Donate from '../components/Donate/Donate';
import MyDonations from '../components/MyDonations/MyDonations';
import MyProfile from '../components/MyProfile/MyProfile';
import EditDonation from '../components/EditDonation/EditDonation';
import SelectedDonation from '../components/SelectedDonation/SelectedDonation';
import './App.scss';
import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)

  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)

  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            {/* <div className="container"> */}
            <TransitionGroup>
              <CSSTransition
                timeout={300}
                classNames="fade"
              >
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/donate' component={Donate} authed={authed} />
                  <PrivateRoute path='/my-donations' component={MyDonations} authed={authed} />
                  <PrivateRoute path='/my-profile/:id' component={MyProfile} authed={authed} />
                  <PrivateRoute path='/edit/:id' component={EditDonation} authed={authed} />
                  <PrivateRoute path='/donation/:id' component={SelectedDonation} authed={authed} />
                  <Redirect from= "*" to="/auth" />
                </Switch>
              </CSSTransition>
              </TransitionGroup>
              {/* </div> */}
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
