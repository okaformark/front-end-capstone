import React from 'react';
import {
  FormFeedback,
  FormText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import donationsData from '../../helpers/data/donationsData';

const defaultDonation = {
  foodDescription: '',
  pickUpLocation: '',
  eventType: '',
  date: '',
  time: '',
  foodImageUrl: '',
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
      <div className="EditDonation">
        <h1>Edit Donation</h1>
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
            className="foodImage"
            width="100%"
            src={newDonation.foodImageUrl}
            alt=""
            placeholder="upload pics"
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
          <Button className="btn btn-outline-info">update</Button>
        </Form>
      </div>
    );
  }
}

export default EditDonation;
