import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import donationsData from '../../helpers/data/donationsData';
import Donations from '../Donations/Donations';

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

  componentDidMount() {
    this.getMyDonation();
  }

  render() {
    const { myDonations } = this.state;
    console.error(myDonations);
    const makeMyDonationsCard = myDonations.map(eachDonation => (
      <Donations donation={eachDonation} key={eachDonation.id}/>
    ));
    return (
      <div className="MyDonations">
        <h1>My Donations</h1>
        {makeMyDonationsCard}
      </div>
    );
  }
}

export default MyDonations;
