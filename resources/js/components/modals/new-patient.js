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
import axios from 'axios';

export default class NewPatient extends Component{
    constructor(){
        super();
        this.state = {
            firstName: "",
            middleName: "",
            lastName: "",
            phoneNumber: 0,
            email: "",
            address: "",
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let values = {
            ...this.state
        }
        axios.post('/api/store',values).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
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
                        <Form.Control onChange={e => {this.setState({firstName: e.target.value})}} style={{marginBottom:"0px"}} type="text" placeholder="First Name" />
                        <Form.Control onChange={e => {this.setState({middleName: e.target.value})}} style={{marginBottom:"0px"}} type="text" placeholder="Middle Name" />
                        <Form.Control onChange={e => {this.setState({lastName: e.target.value})}} type="text" placeholder="Last Name" />

                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={e => {this.setState({phoneNumber: e.target.value})}} type="text" placeholder="" />
                        
                        
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={e => {this.setState({email: e.target.value})}} placeholder="pediatrix@gmail.com" />
                        
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={e => {this.setState({address: e.target.value})}} type="text" placeholder="House No. Street, Brgy, City" />
                        
                        <Button onClick={this.handleClick} variant="success">SAVE</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}
