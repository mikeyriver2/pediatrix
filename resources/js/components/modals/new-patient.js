import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import {
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import * as helpers from '../../helpers/validations';

export default class NewPatient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      errors: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    const values = {
      ...this.state,
    };
    axios.post('/api/patients/store', values).then((res) => {
      const { patient } = res.data;
      this.props.closeModal();
      if (this.props.parentComponent) {
        if (this.props.parentComponent === 'NewRecord') {
          this.props.selectPatient(res.data.patient);
        }else{
          history.push(`/patients/${patient.id}`);
        }
      }else{
        history.push(`/patients/${patient.id}`);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleOnChange(e, type) {
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'firstName':
        isError = e.target.value == ''; // cannot be empty
        errorCase = 'is not a valid first name';
        this.setState({
          firstName: `${e.target.value}`,
        });
        break;
      case 'middleName':
        isError = e.target.value == '';
        errorCase = 'is not a valid middle name';
        this.setState({
          middleName: `${e.target.value}`,
        });
        break;
      case 'lastName':
        isError = e.target.value == '';
        errorCase = 'is not a valid last name';
        this.setState({
          lastName: `${e.target.value}`,
        });
        break;
      case 'phoneNumber':
        isError = !helpers.validateIsNumeric(e.target.value, type);
        errorCase = 'is not a valid phone number';
        this.setState({
          phoneNumber: `${e.target.value}`,
        });
        break;
      case 'email':
        isError = !helpers.validateIsEmail(e.target.value, type);
        errorCase = 'is not a valid email';
        this.setState({
          email: `${e.target.value}`,
        });
        break;
      case 'address':
        isError = e.target.value == '';
        errorCase = 'is not a valid address';
        this.setState({
          address: `${e.target.value}`,
        });
        break;
      default:
        console.log('ass');
        break;
    }
    const { errors } = this.state;
    if (isError) {
      errors[type] = errorCase;
      this.setState({
        errors,
      });
    } else if (errors[type]) {
      delete errors[type];
      this.setState({
        errors,
      });
    }
  }

  render() {
    const disableSave = Object.keys(this.state.errors).length > 0 || this.state.firstName == '' || this.state.middleName == '' || this.state.lastName == '' || this.state.phoneNumber == '' || this.state.email == '' || this.state.address == '';
    return (
      <Modal id="new-patient-modal" show={this.props.show} onHide={() => this.props.closeModal()}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h5>New Patient</h5>
          <Form>
            <Form.Label>Patient Name</Form.Label>
            <Form.Control onChange={(e) => { this.handleOnChange(e, 'firstName'); }} style={{ marginBottom: '10px' }} type="text" placeholder="First Name" />
            <p className="error" style={{ display: this.state.errors.firstName ? 'block' : 'none' }}>First Name cannot be empty</p>

            <Form.Control onChange={(e) => { this.handleOnChange(e, 'middleName'); }} style={{ marginBottom: '10px' }} type="text" placeholder="Middle Name" />
            <p className="error" style={{ display: this.state.errors.middleName ? 'block' : 'none' }}>Middle Name cannot be empty</p>

            <Form.Control onChange={(e) => { this.handleOnChange(e, 'lastName'); }} type="text" placeholder="Last Name" />
            <p className="error" style={{ display: this.state.errors.lastName ? 'block' : 'none' }}>Last Name cannot be empty</p>

            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={(e) => { this.handleOnChange(e, 'phoneNumber'); }} type="text" placeholder="09178191791" />
            <p className="error" style={{ display: this.state.errors.phoneNumber ? 'block' : 'none' }}>Phone Number is Invalid</p>

            <Form.Label>Email</Form.Label>
            <Form.Control type="text" onChange={(e) => { this.handleOnChange(e, 'email'); }} placeholder="pediatrix@gmail.com" />
            <p className="error" style={{ display: this.state.errors.email ? 'block' : 'none' }}>Email is Invalid</p>

            <Form.Label>Address</Form.Label>
            <Form.Control onChange={(e) => { this.handleOnChange(e, 'address'); }} type="text" placeholder="House No. Street, Brgy, City" />
            <p className="error" style={{ display: this.state.errors.address ? 'block' : 'none' }}>Address is Invalid</p>

            <Button disabled={disableSave} onClick={this.handleClick} variant="success">SAVE</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
