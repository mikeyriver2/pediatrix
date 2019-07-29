import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import Summary from '../summaries/summary';
import QuickSummary from '../summaries/quick-summary';
import SummaryWithLabel from '../summaries/summary-with-label';

export default class NewPatient extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return (
            <Modal id="new-patient-modal" show={this.props.show} onHide={()=>this.props.closeModal()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h5>New Patient</h5>
                    <Form>
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                        <Form.Control type="text" placeholder="Middle Name" />
                        <Form.Control type="text" placeholder="Last Name" />

                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="" />
                        
                        
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="" />
                        
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="House No. Street, Brgy, City" />
                        
                        <Button variant="success">SAVE</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}
