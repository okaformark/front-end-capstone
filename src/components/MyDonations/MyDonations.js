import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  // CardImg,
  CardText,
  CardBody,
  // CardLink,
  CardTitle,
  CardSubtitle,
}
  from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import donationsData from '../../helpers/data/donationsData';
// import Donations from '../Donations/Donations';

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
    const selectedLink = `/my-donations/${myDonations.id}`;
    // eslint-disable-next-line
    // const image = require(`${myDonations.foodImageUrl}`);
    const makeMyDonationsCard = myDonations.map(eachDonation => (
      <Card>
          <CardBody>
            <CardTitle>{eachDonation.eventType}</CardTitle>
            <CardSubtitle>{eachDonation.pickUpLocation}</CardSubtitle>
          </CardBody>
          {/* <img width="100%" height="auto" src={image} alt="" /> */}
          <CardBody>
            <CardText>{eachDonation.foodDescription}</CardText>
            <button className="btn btn-outline-danger">X</button>
            <Link className="btn btn-info" to={selectedLink} >View</Link>
          </CardBody>
        </Card>
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
