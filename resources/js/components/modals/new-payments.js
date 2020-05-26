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
import Summary from '../summaries/summary';
import QuickSummary from '../summaries/quick-summary';
import SummaryWithLabel from '../summaries/summary-with-label';
import * as helpers from '../../helpers/validations';

export default class NewPayments extends Component {
  constructor() {
    super();
    this.state = {
      full_name: '',
      patients: [],
      disableDiv: false,
      selected_patient: {},
      amount: 0,
      status: 'Complete',
      errors: {},
    };

    this.handleQuickSearch = this.handleQuickSearch.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var interval = setInterval(() => {
      if (document.getElementById('new-payments-modal')) {
        document.getElementById('new-payments-modal').addEventListener('click', (e) => {
          if (!e.target.className.includes('ignore-listener')) {
            this.setState({ disableDiv: true });
          } else {
          }
        });
        clearInterval(interval);
      }
    }, 1000);
  }

  handleQuickSearch(e) {
    this.setState({
      full_name: e.target.value,
      disableDiv: false,
    }, () => {
      axios.get(`${'/api/patients/qs' + '?full_name='}${this.state.full_name}`).then((res) => {
        this.setState({
          patients: res.data,
        });
      });
    });
  }

  selectPatient(patient) {
    this.setState({
      selected_patient: patient,
      disableDiv: true,
    });
  }

  showSuggestions() {
    if (!this.state.disableDiv && this.state.patients && this.state.full_name != '') {
      if (this.state.patients.length > 0) {
        return (
          <div className="ignore-listener suggestions-patients">
            {this.state.patients.map((patient) => (
              <div key={patient.id} onClick={(e) => this.selectPatient(patient)} className="ignore-listener suggestion-patient">
                {patient.full_name}
              </div>
            ))}
          </div>
        );
      }
    }
  }

  handleSubmit() {
    const { selected_patient, amount, status } = this.state;
    const values = {
      patient: selected_patient,
      amount,
      status,
    };
    axios.post('/api/payments/store', values).then((res) => {
      this.props.closeModal();
    });
  }

  handleOnChange(e, type) {
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'amount':
        isError = !helpers.validateIsNumeric(e.target.value, type);
        errorCase = 'is not a valid weight';
        this.setState({
          amount: `${e.target.value}`,
        });
        break;
      default:
        this.setState({
          [type]: `${e.target.value}`,
        });
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
    return (
      <Modal id="new-payments-modal" show={this.props.show} onHide={() => this.props.closeModal()}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h5>New Payment</h5>
          <Form>
            <Form.Label>Patient</Form.Label>
            <div className="patient-suggestions-container">
              <Form.Control value={this.state.selected_patient.id ? this.state.selected_patient.full_name : ''} onChange={this.handleQuickSearch} type="text" placeholder="Enter Patient Name" />
              {this.showSuggestions()}
            </div>
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="Php">PhP</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) => this.handleOnChange(e, 'amount')}
                placeholder="Enter Amount"
              />
            </InputGroup>


            <Form.Label>Status</Form.Label>
            <Form.Control
              onChange={(e) => this.handleOnChange(e, 'status')}
              as="select"
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Incomplete</option>
            </Form.Control>

            <Button onClick={this.handleSubmit} variant="success">SAVE</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
