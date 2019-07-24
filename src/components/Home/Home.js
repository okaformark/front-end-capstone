import React from 'react';
import { Link } from 'react-router-dom';
// import firebase from 'firebase/app';
import 'firebase/auth';
import donationsData from '../../helpers/data/donationsData';
import Donations from '../Donations/Donations';
// import MyDonations from '../MyDonations/MyDonations';
// import MyDonations from '../MyDonations/MyDonations';

class Home extends React.Component {
  state = {
    donations: [],
  }

  getDonations = () => {
    // const { uid } = firebase.auth().currentUser;
    donationsData.getAllDonations()
      .then(donations => this.setState({ donations }))
      .catch(err => console.error('could not get donations', err));
  }

  componentDidMount() {
    this.getDonations();
  }

  render() {
    const { donations } = this.state;
    const makeDonationsCard = donations.map(donation => (
      <Donations donation={donation} key={donation.id}/>
    ));
    const profileLink = '/my-profile/789';
    return (
      <div className="Home col">
        <h1>HOME</h1>
        <h1>All Donations</h1>
        <div className="row">
          {makeDonationsCard}
        </div>
        <Link className="btn btn-info" to={profileLink}>Profile</Link>
      </div>
    );
  }
}
export default Home;
