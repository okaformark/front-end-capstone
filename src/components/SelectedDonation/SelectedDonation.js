import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Donations from '../Donations/Donations';
import donationsData from '../../helpers/data/donationsData';

class SelectedDonation extends React.Component {
  state = {
    donations: {},
  }

  componentDidMount() {
    const donationsId = this.props.match.params.id;
    donationsData.getSelectedDonation(donationsId)
      .then(donationsPromise => this.setState({ donations: donationsPromise.data }))
      .catch(err => console.error('could not get selected donation', err));
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
    return (
      <div className="SelectedDonation">
        <h1>Selected Donation</h1>
        <Donations donations={donations} />
      </div>
    );
  }
}

export default SelectedDonation;
