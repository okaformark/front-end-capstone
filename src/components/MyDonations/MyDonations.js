import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import donationsData from '../../helpers/data/donationsData';
import Donations from '../Donations/Donations';
import './MyDonations.scss';

class MyDonations extends React.Component {
  state = {
    myDonations: [],
  }

  getMyDonation = () => {
    const { uid } = firebase.auth().currentUser;
    donationsData.getMyDonations(uid)
      .then(myDonationsPromise => this.setState({ myDonations: myDonationsPromise }))
      .catch(err => console.error('could not get my donations', err));
  }

  deleteDonations = (donationsId) => {
    donationsData.deleteDonations(donationsId)
      .then(() => this.getMyDonation())
      .catch(err => console.error('could not delete donations', err));
  }

  componentDidMount() {
    this.getMyDonation();
  }

  render() {
    const { myDonations } = this.state;
    const makeMyDonationsCard = myDonations.map(eachDonation => (
      <Donations
        donation={eachDonation}
        key={eachDonation.id}
        deleteDonations={this.deleteDonations}
        />
    ));
    return (
      <div className="MyDonations col">
        <h1 className="quote text-white animated bounceInRight delay-0.5s"><span>Thank you for helping curb food wastage in America!</span></h1>
        <div className="container">
          <div className="row">
              {makeMyDonationsCard}
          </div>
        </div>
      </div>
    );
  }
}

export default MyDonations;
