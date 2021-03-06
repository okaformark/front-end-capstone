import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
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
import fbConnection from '../../helpers/data/connection';
import donationsData from '../../helpers/data/donationsData';
import './EditDonation.scss';

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
};

class EditDonation extends React.Component {
  state={
    newDonation: defaultDonation,
  }

  componentDidMount() {
    const donationsId = this.props.match.params.id;
    donationsData.getSelectedDonation(donationsId)
      .then(donationsPromise => this.setState({ newDonation: donationsPromise.data }))
      .catch(err => console.error('could not edit', err));
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

  formFieldStringState = (name, e) => {
    const tempDonation = { ...this.state.newDonation };
    tempDonation[name] = e.target.value;
    this.setState({ newDonation: tempDonation });
  }

  foodDescriptionChange = e => this.formFieldStringState('foodDescription', e);

  pickUpLocationChange = e => this.formFieldStringState('pickUpLocation', e);

  eventTypeChange = e => this.formFieldStringState('eventType', e);

  dateChange = e => this.formFieldStringState('date', e);

  timeChange = e => this.formFieldStringState('time', e);

  foodImageUrlChange = e => this.formFieldStringState('foodImageUrl', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveDonation = { ...this.state.newDonation };
    const donationsId = this.props.match.params.id;
    donationsData.putDonation(saveDonation, donationsId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('could not update doanation', err));
  }

  render() {
    const { newDonation } = this.state;
    return (
      <div className="bg-image">
        <div className="card-donate">
          <div className="EditDonation">
          <h1>Edit your Donation</h1>
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
                value={newDonation.time.toString()}
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
            <Button className="btn btn-outline-info">Update</Button>
          </Form>
        </div>
      </div>
      </div>
    );
  }
}

export default EditDonation;
