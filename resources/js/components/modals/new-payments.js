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

export default class NewPayments extends Component{
    constructor(){
        super();
        this.state = {
            show_modal: true
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({
            show_modal: !this.state.show_modal
        })
    }

    render(){
        return (
            <Modal id="new-payments-modal" show={this.state.show_modal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h5>New Payment</h5>
                    <Form>
                        <Form.Label>Patient</Form.Label>
                        <Form.Control type="text" placeholder="Enter Patient Name" />

                        <Form.Label>Amount</Form.Label>   
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="Php">PhP</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={()=>{console.log('bleb')}}
                                placeholder="Enter Amount"
                            />
                        </InputGroup>

                        
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select">
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Incomplete</option>
                         </Form.Control>

                         <Button variant="success">SAVE</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}
