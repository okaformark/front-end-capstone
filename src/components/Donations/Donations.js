import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
}
  from 'reactstrap';
// import donationsData from '../../helpers/data/donationsData';
import donationsShape from '../../helpers/propz/donationsShape';
import './Donations.scss';


class Donations extends React.Component {
  static propTypes = {
    donation: donationsShape.donationsShape,
    deleteDonations: PropTypes.func.isRequired,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { donation, deleteDonations } = this.props;
    deleteDonations(donation.id);
  }

  claimButton = () => {
    const { donation } = this.props;
    if (donation.isClaimed) {
      return null;
    }
    return <button className="btn btn-info button claimBtn"><span>Claim</span></button>;
  };

  deleteButton = () => {
    const { donation } = this.props;
    const { uid } = firebase.auth().currentUser;
    if (donation.uid !== uid) {
      return null;
    }
    return <button className="btn btn-danger deleteBtn" onClick={this.deleteMe}>X</button>;
  }

  render() {
    const { donation } = this.props;
    const editLink = `/edit/${donation.id}`;
    const selectedLink = `/donation/${donation.id}`;
    return (
      <div className="Donation col-3">
        <div className="card">
        <Card>
          <CardBody>
            <CardTitle>{donation.eventType}</CardTitle>
            <CardSubtitle>{donation.pickUpLocation}</CardSubtitle>
          </CardBody>
          <img className="foodImage" src={donation.foodImageUrl} alt="" />
          <CardBody>
            <CardText>{donation.foodDescription}</CardText>
            {this.deleteButton()}
            <Link to={editLink} ><button className="btn btn-info button"><span>Edit</span></button></Link>
            <Link to={selectedLink} ><button className="btn btn-info button"><span>View</span></button></Link>
            {this.claimButton()}
          </CardBody>
        </Card>
        </div>
      </div>
    );
  }
}

export default Donations;
