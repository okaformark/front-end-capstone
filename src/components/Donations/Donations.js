import React from 'react';
import PropTypes from 'prop-types';
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
import donationsShape from '../../helpers/propz/donationsShape';
// import MyDonations from '../MyDonations/MyDonations';


class Donations extends React.Component {
  static propTypes = {
    donation: PropTypes.arrayOf(donationsShape.donationsShape),
  }

  render() {
    const { donation } = this.props;
    const editLink = `/edit/${donation.id}`;
    const selectedLink = `/donation/${donation.id}`;
    // eslint-disable-next-line
    const image = require(`${donation.foodImageUrl}`);
    return (
      <div className="Donation">
        <div>{donation.eventType}</div>
        <Card>
          <CardBody>
            <CardTitle>{donation.eventType}</CardTitle>
            <CardSubtitle>{donation.pickUpLocation}</CardSubtitle>
          </CardBody>
          <img width="100%" height="auto" src={image} alt="" />
          <CardBody>
            <CardText>{donation.foodDescription}</CardText>
            <Link className="btn btn-info" to={editLink} >Edit</Link>
            <Link className="btn btn-info" to={selectedLink} >View</Link>
          </CardBody>
        </Card>
        {/* <Link className="btn btn-info" to={editLink}>edit</Link>
        <Link className="btn btn-info" to={selectedLink}>view</Link> */}
      </div>
    );
  }
}

export default Donations;
