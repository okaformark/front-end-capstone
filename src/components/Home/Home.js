import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import 'firebase/auth';
// import Geocode from 'react-geocode';
import donationsData from '../../helpers/data/donationsData';
import Donations from '../Donations/Donations';
import Search from '../Search/Search';
import './Home.scss';

// Geocode.setApiKey('AIzaSyCoCxKZDcxk-hjjmsqya-A5A5JwGfJPXk8');

class Home extends React.Component {
  state = {
    donations: [],
    donationFilter: 'all',
    searchDonations: [],
    userLocation: { lat: 13, long: 12 },
  }

  getDonations = () => {
    donationsData.getAllDonations()
      .then((donations) => {
        this.setState({ donations });
      })
      .catch(err => console.error('could not get donations', err));
  }

  // getUserPosition = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lat = position.coords.latitude;
  //     const long = position.coords.longitude;
  //     this.setState({
  //       userLocation: { lat, long },
  //     });
  //     console.error(this.state.userLocation);
  //   });
  // }

  searchDonationsFunc = (query) => {
    const { donations } = this.state;
    const searchDonations = this.state.donations;
    if (query !== '') {
      const searchedDonations = searchDonations.filter(donation => donation.foodDescription.toUpperCase().includes(query.toUpperCase()));
      return this.setState({ donations: searchedDonations });
    }
    return donations;
  };

  deleteDonations = (donationsId) => {
    donationsData.deleteDonations(donationsId)
      .then(() => this.getDonations())
      .catch(err => console.error('could not delete donations', err));
  }

  componentDidMount() {
    this.getDonations();
    // this.getUserPosition();
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

  // getGeocode = () => {
  //   const { donations } = this.state;
  //   Geocode.fromAddress('Eiffel Tower')
  //     .then((response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.error(response, lat, lng);
  //     });
  // };

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
    return (
      <div className="home-image">
        {/* {this.getGeocode()} */}
      <div className="Home">
        <h1 className="quote animated rubberBand"><span>40% of food in America is wasted annually.Donate today</span></h1>
        <Search searchDonationsFunc={this.searchDonationsFunc.bind(this)} />
        <ButtonGroup className="filterButton animated bounce delay-0.5s">
        <Button id="all" onClick={this.filterDonations}>All</Button>
        <Button id="claimed" onClick={this.filterDonations}>Claimed</Button>
        <Button id="unclaimed" onClick={this.filterDonations}>Unclaimed</Button>
      </ButtonGroup>
      <div className="container">
        <div className="row">
          {makeDonationsCard}
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default Home;
