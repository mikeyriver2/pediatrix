import React, {Fragment,Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';

import { 
    KeyboardDatePicker,
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";

import Summary from '../summaries/summary';
import QuickSummary from '../summaries/quick-summary';
import SummaryWithLabel from '../summaries/summary-with-label';

export default class NewAppointment extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <Modal id="new-appointments-modal" show={this.props.show} onHide={()=>this.props.closeModal()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h5>Request Appointment</h5>
                    <Form>
                        <Form.Label>Patient</Form.Label>
                        <Form.Control type="text" placeholder="Enter Patient Name" />

                        <Form.Label>Appointment Type</Form.Label>
                        <Form.Control as="select">
                            <option>General Consultation</option>
                            <option>Something</option>
                            <option>Something2</option>
                         </Form.Control>

                        
                        <Form.Label>Date of Appointments</Form.Label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            clearable
                            value={new Date()}
                            placeholder="10/10/2018"
                            onChange={()=>{}}
                            minDate={new Date()}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            format="MM/dd/yyyy"
                        />
                        </MuiPickersUtilsProvider>
                        
                        <Button variant="success">SAVE</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}
