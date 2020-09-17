import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import NewPatient from './new-patient';
import DatePicker from'../modules/datepicker';
import TimeSlots from'../modules/timeslots';

export default class NewAppointment extends Component {
  constructor() {
    super();
    this.state = {
      full_name: '',
      patients: [],
      disableDiv: false,
      modal: {
        type: '',
        show: false,
      },
      selectedDate: '',
      selectedTime: {
        start: '',
        end: ''
      },
      selected_patient: {},
      consultationType: 'General Consultation',
    };
    this.handleQuickSearch = this.handleQuickSearch.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.showNewPatientModal = this.showNewPatientModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    var interval = setInterval(() => {
      if (document.getElementById('new-appointments-modal')) {
        document.getElementById('new-appointments-modal').addEventListener('click', (e) => {
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

  handleSave() {
    const { 
      full_name, 
      selectedDate, 
      selectedTime 
    } = this.state;

    const params = {
      full_name,
      selectedDate,
      selectedTime
    };

    axios.post('/api/appointments/store', params);
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

  showNewPatientModal() {
    this.setState((prevState) => ({
      modal: {
        ...prevState.modal,
        type: 'new-patient',
        show: !prevState.modal.show,
      },
      disableDiv: true,
    }));
  }

  closeModal() {
    this.setState((prevState) => ({
      modal: {
        ...prevState.modal,
        type: '',
        show: false,
      },
    }));
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
            <div onClick={this.showNewPatientModal} className="ignore-listener suggestion-patient">
              <b className="ignore-listener">New Patient . . .</b>
            </div>
          </div>
        );
      }
      return (
        <div className="suggestions-patients">
          <div onClick={this.showNewPatientModal} className="ignore-listener suggestion-patient">
            <b className="ignore-listener">New Patient . . .</b>
          </div>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <Modal id="new-appointments-modal" show={this.props.show} onHide={() => this.props.closeModal()}>
          <Modal.Header closeButton />
          <Modal.Body>
            <h5>Request Appointment</h5>
            <Form>
              <div className="patient-appointments-container">
                <Form.Label>Patient</Form.Label>
                <Form.Control 
                  onFocus={() => { this.setState({ disableDiv: false, full_name: ' ' }); }} 
                  onChange={this.handleQuickSearch} 
                  value={this.state.selected_patient.id ? this.state.selected_patient.full_name : this.state.full_name} 
                  className="ignore-listener" 
                  type="text" 
                  placeholder="Enter Patient Name" 
                />
                <button onClick={() => { this.setState({ selected_patient: {} }); }} type="button" className="close">
                  <span>x</span>
                </button>
                {this.showSuggestions()}
              </div>
              <Form.Label>Appointment Type</Form.Label>
              <Form.Control
                onChange={(e) => { 
                  this.setState({ consultationType: e.target.value }); 
                }}
                as="select"
              >
                <option>General Consultation</option>
                <option>Something</option>
                <option>Something2</option>
              </Form.Control>


              <Form.Label>Set Appointment time</Form.Label>
              <DatePicker 
                setDate={(selectedDate) => {
                  this.setState({
                    selectedDate
                  });
                }}
              />
              <TimeSlots 
                setTime={(start, end) => {
                  this.setState((prevState) => {
                    return {
                      selectedTime: {
                        ...prevState.selectedTime,
                        start,
                        end
                      }
                    }
                  })
                }}
              />

              <Button 
                variant="success"
                onClick={this.handleSave}
              >
                SAVE
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
