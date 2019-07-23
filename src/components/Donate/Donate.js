import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import fbConnection from '../../helpers/data/connection';

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

  render() {
    console.error(this.state);
    return (
      <div className="Donate col-4">
        <h1>Donate</h1>
        <Form>
          <FormGroup>
            <Label for="foodDescription">Food Description</Label>
            <Input type="textarea" name="text" id="foodDescription" placeholder=" Grilled Chicken, Subs, Sammies, Mashed potatoes, etc" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address 2</Label>
            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input type="text" name="city" id="exampleCity"/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleState">State</Label>
                <Input type="text" name="state" id="exampleState"/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Zip</Label>
                <Input type="text" name="zip" id="exampleZip"/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="eventType">Event Type</Label>
              <Input type="text" name="event" id="eventType" placeholder="Type of Event" />
        </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleTime">Time</Label>
            <Input
              type="time"
              name="time"
              id="exampleTime"
              placeholder="time placeholder"
            />
          </FormGroup>
        </Form>
        <label className="">Progress:</label>
        <p>{this.state.progress}</p>
        <label className="">Image: </label>
        <img src={this.state.image} alt="" />
        <FileUploader
          accept="image/*"
          name='image'
          storageRef={firebase.storage().ref('foodImages')}
          onUpLoadStart={this.handleUpLoadStart}
          onUpLoadSuccess={this.handleUpLoadSuccess}
        />
        <br/>
        <Button className="btn btn-outline-success">Donate</Button>
      </div>
    );
  }
}

export default Donate;
