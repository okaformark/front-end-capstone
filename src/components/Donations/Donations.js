import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, withRouter } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
}
  from 'reactstrap';
// import BodyImages from 'react-body-images';
import donationsShape from '../../helpers/propz/donationsShape';
import './Donations.scss';
import donationsData from '../../helpers/data/donationsData';


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

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  addClaim = (e) => {
    e.preventDefault();
    const { donation } = this.props;
    const claimsId = donation.id;
    donation.isClaimed = true;
    donationsData.updateClaims(donation, claimsId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('could not be claimed', err));
    this.toggle();
  }

  claimButton = () => {
    const { donation } = this.props;
    const { uid } = firebase.auth().currentUser;
    if (donation.isClaimed) {
      return <button className="btn btn-sm btn-danger" disabled>Claimed</button>;
    }
    if (donation.uid === uid) {
      return null;
    }
    return <button className="btn btn-info button claimBtn" onClick={this.toggle}><span>Claim</span></button>;
  };

  deleteButton = () => {
    const { donation } = this.props;
    const { uid } = firebase.auth().currentUser;
    if (donation.uid !== uid) {
      return null;
    }
    return <button className="btn btn-danger deleteBtn" onClick={this.deleteMe}>X</button>;
  }

  editButton = () => {
    const { donation } = this.props;
    const { uid } = firebase.auth().currentUser;
    if (donation.uid !== uid) {
      return null;
    }
    if (donation.uid === uid && donation.isClaimed === true) {
      return null;
    }
    return <button className="btn btn-info button"><span>Edit</span></button>;
  }

  viewButton = () => {
    const { donation } = this.props;
    const { uid } = firebase.auth().currentUser;
    if (donation.isClaimed && donation.uid !== uid) {
      return null;
    }
    return <button className="btn btn-info button"><span>View</span></button>;
  }


  render() {
    const { donation } = this.props;
    const editLink = `/edit/${donation.id}`;
    const selectedLink = `/donation/${donation.id}`;
    return (
      <div className="Donation col-3">
        {/* <div className="card"> */}
        <Card>
          <CardBody>
            <CardTitle>{donation.eventType}</CardTitle>
            <CardSubtitle>{donation.pickUpLocation}</CardSubtitle>
          </CardBody>
          <img className="foodImage" src={donation.foodImageUrl} alt="" />
          <CardBody>
            <CardText>{donation.foodDescription}</CardText>
            {this.deleteButton()}
            <Link to={editLink} >{this.editButton()}</Link>
            <Link to={selectedLink} >{this.viewButton()}</Link>
            {this.claimButton()}
          </CardBody>
        </Card>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <p>Enjoy your food!!!</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addClaim}>Claim</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
    // </div>
    );
  }
}
export default withRouter(Donations);
