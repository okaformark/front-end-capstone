import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
// import firebase from 'firebase/app';
import 'firebase/auth';
import donationsData from '../../helpers/data/donationsData';
import Donations from '../Donations/Donations';
// import Claims from '../Claims/Claims';
import './Home.scss';

class Home extends React.Component {
  state = {
    donations: [],
    donationFilter: 'all',
  }

  getDonations = () => {
    // const { uid } = firebase.auth().currentUser;
    donationsData.getAllDonations()
      .then(donations => this.setState({ donations }))
      .catch(err => console.error('could not get donations', err));
  }

  deleteDonations = (donationsId) => {
    donationsData.deleteDonations(donationsId)
      .then(() => this.getDonations())
      .catch(err => console.error('could not delete donations', err));
  }

  componentDidMount() {
    this.getDonations();
  }

  filterDonations = (e) => {
    const donationFilter = e.target.id;
    this.setState({ donationFilter });
  }

  filteredDonations = () => {
    const { donations, donationFilter } = this.state;
    switch (donationFilter) {
      case 'claimed':
        return donations.filter(donation => donation.isClaimed === true);
      case 'unclaimed':
        return donations.filter(donation => donation.isClaimed === false);
      default:
        return donations;
    }
  }

  render() {
    const donations = this.filteredDonations();
    const makeDonationsCard = donations.map(donation => (
      <Donations
        donation={donation}
        key={donation.id}
        deleteDonations={this.deleteDonations}
        claimedDonations={this.filterDonations}
        unclaimedDonations={this.filterDonations}
        />
    ));
    // const profileLink = '/my-profile/789';
    return (
      <div className="Home col">
        <h1>HOME</h1>
        <ButtonGroup>
        <Button id="all" onClick={this.filterDonations}>All</Button>
        <Button id="claimed" onClick={this.filterDonations}>Claimed</Button>
        <Button id="unclaimed" onClick={this.filterDonations}>Unclaimed</Button>
      </ButtonGroup>
        <div className="row">
          {makeDonationsCard}
        </div>
        {/* <Link className="btn btn-info" to={profileLink}>Profile</Link> */}
      </div>
    );
  }
}
export default Home;
