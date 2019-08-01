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

export default class NewPayments extends Component{
    constructor(){
        super();
        this.state = {
            full_name: "",
            patients: [],
            disableDiv: false,
        }

        this.handleQuickSearch = this.handleQuickSearch.bind(this);
        this.showSuggestions = this.showSuggestions.bind(this);
        this.selectPatient = this.selectPatient.bind(this);
    }

    componentDidMount(){
        var interval = setInterval(()=>{
            if(document.getElementById("new-payments-modal")){
                document.getElementById("new-payments-modal").addEventListener("click", ()=>{
                    this.setState({disableDiv: true});
                });
                clearInterval(interval)
            }
        },1000)   
    }

    handleQuickSearch(e){
        this.setState({
            full_name: e.target.value,
            disableDiv: false
        },()=>{
            axios.get("/api/patients/qs"+"?full_name="+this.state.full_name).then(res=>{
                this.setState({
                    patients: res.data
                })
            })
        });
    }

    selectPatient(patient){
        this.setState({
            selected_patient: patient
        })
    }

    showSuggestions(){
        if(!this.state.disableDiv && this.state.patients && this.state.full_name != ""){
            if(this.state.patients.length > 0){
                return (
                    <div className="suggestions-patients">
                        {this.state.patients.map(patient=>{
                            return (
                                <div key={patient.id} onClick={e=>this.selectPatient(patient)} className="suggestion-patient">
                                    {patient.full_name}
                                </div>
                            )
                        })

                        }
                    </div>
                )
            }
        }
    }

    render(){
        return (
            <Modal id="new-payments-modal" show={this.props.show} onHide={()=>this.props.closeModal()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h5>New Payment</h5>
                    <Form>
                        <Form.Label>Patient</Form.Label>
                        <div className="patient-suggestions-container">
                            <Form.Control onChange={this.handleQuickSearch} type="text" placeholder="Enter Patient Name" />
                            {this.showSuggestions()}
                        </div>
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
