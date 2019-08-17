import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Donations from '../Donations/Donations';
import donationsData from '../../helpers/data/donationsData';
import './SelectedDonation.scss';

class SelectedDonation extends React.Component {
  state = {
    donations: null,
  }

  getSelectedDonation = () => {
    const donationsId = this.props.match.params.id;
    donationsData.getSelectedDonation(donationsId)
      .then(donationsPromise => this.setState({ donations: donationsPromise.data }))
      .catch(err => console.error('could not get selected donation', err));
  }

  componentDidMount() {
    this.getSelectedDonation();
  }

  deleteDonation = () => {
    const myUid = firebase.auth().currentUser.uid;
    const donationsId = this.props.match.params.id;
    donationsData.deleteDonation(donationsId, myUid)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('could not delete', err));
  }

  render() {
    const { donations } = this.state;
    if (donations === null) {
      return null;
    }
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
       <div className="SelectedDonation col">
        <div className="container col-6">
        <Donations
          className=""
          donation={donations}
          key={donations.id}
          deleteDonations={this.deleteDonation}
          to={editLink}
          />
        </div>
        </div>
    );
  }
}

export default SelectedDonation;
