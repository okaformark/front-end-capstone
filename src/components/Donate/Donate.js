import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import FileUploader from 'react-firebase-file-uploader';
import {
  FormFeedback,
  FormText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import fbConnection from '../../helpers/data/connection';
import donationsData from '../../helpers/data/donationsData';

fbConnection();

const defaultDonation = {
  foodDescription: '',
  pickUpLocation: '',
  eventType: '',
  date: '',
  time: '',
  foodImageUrl: '',
};

class Donate extends React.Component {
  state = {
    newDonation: defaultDonation,
    image: '',
    imageUrl: '',
    progress: 0,
  }

  handleUpLoadStart = () => this.setState({ progress: 0 })

  handleUpLoadSuccess = (fileName) => {
    this.setState({
      image: fileName,
      progress: 100,
    });
    firebase.storage().ref('foodImages').child(`${fileName}.png`).getDownloadURL()
      .then(url => this.setState({
        imageUrl: url,
      }));
  }

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
    e.preventDefault();
    const saveDonation = { ...this.state.newDonation };
    saveDonation.uid = firebase.auth().currentUser.uid;
    donationsData.postDonation(saveDonation)
      .then(() => this.props.history.push('/home'))
      .then(() => this.props.history.push('/my-donations'))
      .catch(err => console.error('could not create doanation', err));
  }

  render() {
    const { newDonation } = this.state;
    return (
      <div className="Donate col-4">
        <h1>Donate</h1>
        <Form onSubmit={this.formSubmit}>
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
          <Label for="image">UpLoad Image</Label>
          <Input
            type="text"
            className="foodImageSrc"
            width="100%"
            src={newDonation.foodImageUrl}
            placeholder="upload pictures"
            alt=""
            onChange={this.foodImageUrlChange}
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
              name="time"
              id="exampleTime"
              placeholder="time placeholder"
              value={newDonation.time}
              onChange={this.timeChange}
              />
          </FormGroup>
          <Button className="btn btn-outline-info">Donate</Button>
        </Form>
        {/* <label className="">Progress:</label>
        <p>{this.state.progress}</p>
        <label className="">Image:" "</label>
        {this.state.image && <img src={this.state.image} alt="" />}
        <FileUploader
          accept="image/*"
          name='image'
          storageRef={firebase.storage().ref('foodImages')}
          onUpLoadStart={this.handleUpLoadStart}
          onUpLoadSuccess={this.handleUpLoadSuccess}
          onProgress={this.handleProgress}
        />
        <br/> */}
      </div>
    );
  }
}

export default Donate;
