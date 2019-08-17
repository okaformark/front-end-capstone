import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import moment from 'moment';
import FileUploader from 'react-firebase-file-uploader';
import {
  FormFeedback,
  FormText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
// import Geocode from 'react-geocode';
import fbConnection from '../../helpers/data/connection';
import donationsData from '../../helpers/data/donationsData';
import './Donate.scss';

fbConnection();


const defaultDonation = {
  foodDescription: '',
  pickUpLocation: '',
  eventType: '',
  date: '',
  time: '',
  foodImageUrl: '',
  image: 'image',
  progress: 0,
  isClaimed: false,
  lat: '',
  long: '',
  timePosted: moment().fromNow(),
};

class Donate extends React.Component {
  state = {
    newDonation: defaultDonation,
  }

  handleUpLoadStart = () => {
    this.setState({ progress: 0 });
  }

  handleUpLoadSuccess = (fileName) => {
    this.setState({
      image: fileName,
      progress: 100,
    });
    firebase.storage().ref('foodImages').child(fileName).getDownloadURL()
      .then((url) => {
        const tempDonation = { ...this.state.newDonation };
        tempDonation.foodImageUrl = url;
        this.setState({
          newDonation: tempDonation,
        });
      });
  }

  // getGeocode = () => {
  //   const { newDonation } = this.state;
  //   Geocode.fromAddress(newDonation.pickUpLocation)
  //     .then((response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.error('fffff', lat, lng);
  //     });
  // };


  formFieldStringState = (name, e) => {
    const tempDonation = { ...this.state.newDonation };
    tempDonation[name] = e.target.value;
    this.setState({ newDonation: tempDonation });
  }


  handleProgress = progress => this.setState({ progress })

  foodDescriptionChange = e => this.formFieldStringState('foodDescription', e);

  pickUpLocationChange = e => this.formFieldStringState('pickUpLocation', e);

  eventTypeChange = e => this.formFieldStringState('eventType', e);

  dateChange = e => this.formFieldStringState('date', e);

  timeChange = e => this.formFieldStringState('time', e);

  foodImageUrlChange = e => this.formFieldStringState('foodImageUrl', e);


  formSubmit = (e) => {
    // this.getGeocode();
    e.preventDefault();
    const saveDonation = { ...this.state.newDonation };
    saveDonation.uid = firebase.auth().currentUser.uid;
    donationsData.postDonation(saveDonation)
      .then(() => this.props.history.push('/my-donations'))
      .catch(err => console.error('could not create doanation', err));
  }

  render() {
    const { newDonation } = this.state;
    return (
      <div className="bg-image">
      <h1 className="quote text-white animated bounceInDown delay-0.1s"><span>No one has ever become poor by giving ~ Anne Frank</span></h1>
      <div className="card-donate animated bounceInUp delay-0.5s">
      <div className="Donate">
        <Form onSubmit={this.formSubmit} >
          <FormGroup>
            <Label for="foodDescription">Food Description</Label>
            <Input
              required type="textarea"
              name="foodDescription"
              id="foodDescription"
              aria-multiline='true'
              placeholder=" Grilled Chicken, Subs, Sammies, Mashed potatoes, etc"
              value={newDonation.foodDescription}
              onChange={this.foodDescriptionChange}
              />
          </FormGroup>
          <FormGroup>
          <Label for="exampleEmail">Enter pickUp Location</Label>
          <Input
            type="text"
            name="address"
            id="exampleAddress"
            placeholder="No   Street Name  City  State ZIP "
            value={newDonation.pickUpLocation}
            onChange={this.pickUpLocationChange}
           />
          <FormFeedback>You will not be able to see this</FormFeedback>
          <FormText>Your address is safe with us.</FormText>
        </FormGroup>
          <FormGroup>
            <Label for="eventType">Event Type</Label>
              <Input
                type="text"
                name="event"
                id="eventType"
                placeholder="Type of Event"
                value={newDonation.eventType}
                onChange={this.eventTypeChange}
                />
        </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="01/01/2000"
              value={newDonation.date}
              onChange={this.dateChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleTime">Time</Label>
            <Input
              type="time"
              name="ExampleTime"
              id="exampleTime"
              placeholder="time placeholder"
              value={newDonation.time}
              onChange={this.timeChange}
              />
          </FormGroup>
          <FormGroup>
            <label className="">Progress:</label>
            <p>{this.state.progress}</p>
            <label className="">Image: </label>
            {this.state.image && <img className="foodImage" src={newDonation.foodImageUrl} alt="" />}
            <FileUploader
              accept="image/*"
              name='image'
              storageRef={firebase.storage().ref('foodImages')}
              onUploadStart={this.handleUpLoadStart}
              onUploadSuccess={this.handleUpLoadSuccess}
              onUploadError={err => console.error('failed', err)}
              onProgress={this.handleProgress}
            />
          </FormGroup>
          <Button className="btn btn-outline-info">Donate</Button>
        </Form>
      </div>
      </div>
      </div>
    );
  }
}

export default Donate;
