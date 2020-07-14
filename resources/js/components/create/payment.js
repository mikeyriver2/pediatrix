import React, { Component } from 'react';
import {
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import {
  withRouter,
} from 'react-router-dom';
import NewPatient from '../modals/new-patient';
import * as helpers from '../../helpers/validations';

class Payment extends Component {
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
      modal: {
        type: '',
        show: false,
      },
    };

    this.handleQuickSearch = this.handleQuickSearch.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPatient = this.fetchPatient.bind(this);
  }

  componentDidMount() {
    // this.fetchPatient();
    const interval = setInterval(() => {
      if (document.querySelector('.new-payment')) {
        console.log('assss');
        document.querySelector('.new-payment').addEventListener('click', (e) => {
          console.log(e.target.className);
          if (!e.target.className.includes('ignore-listener')) {
            console.log('disabling div');
            this.setState({ disableDiv: true });
          } else {
            console.log('ignoring div');
          }
        });
        clearInterval(interval);
      }
    }, 1000);
  }

  fetchPatient(e = null) {
    this.setState({
      full_name: e ? e.target.value : '',
      disableDiv: false,
    }, () => {
      axios.get('/api/patients/qs',
        {
          params: {
            full_name: this.state.full_name,
          },
        }).then((res) => {
        this.setState({
          patients: res.data,
        });
      });
    });
  }

  handleQuickSearch(e) {
    const fullName = e.target.value;
    this.setState({
      full_name: fullName,
      disableDiv: false,
    }, () => {
      if (fullName.replace(/\s/g, '') !== '') {
        axios.get(`${'/api/patients/qs' + '?full_name='}${this.state.full_name}`).then((res) => {
          this.setState({
            patients: res.data,
          });
        });
      }
    });
  }

  selectPatient(patient) {
    this.setState({
      selected_patient: patient,
      disableDiv: true,
    });
  }

  showSuggestions() {
    if (!this.state.disableDiv && this.state.patients && this.state.full_name.replace(/\s/g, '') !== '') {
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
      const { history } = this.props;
      const { payment } = res.data;
      history.push(`/payments/${payment.id}`);
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
    const { full_name: fullName, amount, selected_patient } = this.state;
    const disableSave = Object.keys(this.state.errors).length > 0 || !this.state.selected_patient.id || (amount && amount.replace(/\s/g, '') === '');

    return (
      <div className="create-desktop new-payment">
        <h5>New Payment</h5>
        <Form>
          <Form.Label>Patient</Form.Label>
          <div className="patient-suggestions-container">
            <Form.Control
              value={this.state.selected_patient.id ? this.state.selected_patient.full_name : fullName}
              onChange={this.handleQuickSearch}
              type="text"
              placeholder="Enter Patient Name"
            />
            {selected_patient.id && (
            <button onClick={() => { this.setState({ selected_patient: {} }); }} type="button" className="close">
              <span>x</span>
            </button>
            )}
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
          <p className="error" style={{ display: this.state.errors.amount ? 'block' : 'none' }}>Amount is Invalid</p>

          <Form.Label>Status</Form.Label>
          <Form.Control
            onChange={(e) => this.handleOnChange(e, 'status')}
            as="select"
          >
            <option>Completed</option>
            <option>Pending</option>
            <option>Incomplete</option>
          </Form.Control>

          <div className="create-desktop__submit">
            <Button onClick={this.handleSubmit} disabled={disableSave} variant="success">SAVE</Button>
          </div>
        </Form>
        {(this.state.modal.type == 'new-patient' && this.state.modal.show)
                    && (
                    <NewPatient
                      show={this.state.modal.type == 'new-patient' && this.state.modal.show}
                      closeModal={this.closeModal}
                      parentComponent="NewRecord"
                      selectPatient={this.selectPatient}
                    />
                    )}
      </div>
    );
  }
}

export default withRouter(Payment);
