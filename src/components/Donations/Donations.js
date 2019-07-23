import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
}
  from 'reactstrap';
import donationsShape from '../../helpers/propz/donationsShape';


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
        <Card>
          <CardBody>
            <CardTitle>{donation.eventType}</CardTitle>
            <CardSubtitle>{donation.pickUpLocation}</CardSubtitle>
          </CardBody>
          <img className="foodImage"width="100%" src={image} alt="" />
          <CardBody>
            <CardText>{donation.foodDescription}</CardText>
            <Link className="btn btn-info" to={editLink} >Edit</Link>
            <Link className="btn btn-info" to={selectedLink} >View</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Donations;
