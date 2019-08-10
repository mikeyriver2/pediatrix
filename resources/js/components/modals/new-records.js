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
import NewPatient from './new-patient';
import * as helpers from '../../helpers/validations'

export default class NewRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            full_name: "",
            patients: [],
            disableDiv: false,
            modal: {
                type: "",
                show: false
            },
            selected_patient: {},
            errors: {}
        }

        this.handleQuickSearch = this.handleQuickSearch.bind(this);
        this.showSuggestions = this.showSuggestions.bind(this);
        this.selectPatient = this.selectPatient.bind(this);
        this.showNewPatientModal = this.showNewPatientModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount(){
        var interval = setInterval(()=>{
            if(document.getElementById("new-record-modal")){
                document.getElementById("new-record-modal").addEventListener("click", (e)=>{
                    console.log(e.target.className);
                    if(!e.target.className.includes("ignore-listener")){
                        console.log('disabling div');
                        this.setState({disableDiv: true});
                    }else{
                        console.log('ignoring div');
                    }
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
            selected_patient: patient,
            disableDiv: true 
        })
    }

    showNewPatientModal(){
        console.log('ass');
        this.setState(prevState => ({
            modal: {
                ...prevState.modal,
                type: "new-patient",
                show: !prevState.modal.show
            },
            disableDiv: true
        }))
    }

    closeModal(){
        this.setState(prevState => ({
            modal: {
                ...prevState.modal,
                type: "",
                show: false
            } 
        }))
    }

    showSuggestions(){
        if(!this.state.disableDiv && this.state.patients && this.state.full_name != ""){
            if(this.state.patients.length > 0){
                return (
                    <div className="ignore-listener suggestions-patients">
                        {this.state.patients.map(patient=>{
                            return (
                                <div key={patient.id} onClick={e=>this.selectPatient(patient)} className="ignore-listener suggestion-patient">
                                    {patient.full_name}
                                </div>
                            )
                        })
                        }
                        <div onClick={this.showNewPatientModal} className="ignore-listener suggestion-patient">
                            <b className="ignore-listener">New Patient . . .</b>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="suggestions-patients">
                        <div onClick={this.showNewPatientModal} className="ignore-listener suggestion-patient">
                            <b className="ignore-listener">New Patient . . .</b>
                        </div>
                    </div>
                )
            }
        }
    }

    handleOnChange(e, type){
        let isError = false;
        let errorCase = ""
        switch(type){
            case "weight":
                isError = helpers.validateIsNumeric(e.target.value,type);
                errorCase = "is not a valid weight";
                break;
        }
        let errors = this.state.errors;
        if(!isError){
            errors[type] = errorCase;
            this.setState({
                errors: errors
            })
        }else if (errors[type]){
            delete errors[type];
            this.setState({
                errors: errors
            })
        }
    }

    render(){
        return (
            <div>
                <Modal id="new-record-modal" show={this.props.show} onHide={()=>this.props.closeModal()}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>New Record</h5>
                        <Form>
                            <Form.Label>Patient</Form.Label>
                            <div className="patient-suggestions-container">
                                <Form.Control className="ignore-listener" value={this.state.selected_patient.id ? this.state.selected_patient.full_name : this.state.full_name} id="records-patient-name" onFocus={()=>{this.setState({disableDiv: false, full_name: " "})}} onChange={this.handleQuickSearch} type="text" placeholder="Enter Patient Name" />
                                <button onClick={()=>{this.setState({selected_patient: {}})}} type="button" className="close">
                                    <span>x</span>
                                </button>
                                {this.showSuggestions()}
                            </div>

                            <Form.Label>Weight</Form.Label>   
                            <Form.Control onChange={e=>this.handleOnChange(e,"weight")} type="text" placeholder="10 lbs" />
                            <p style={{display: this.state.errors.weight ? "block" : "none"}}>Weight is Invalid</p>
                            
                            <Form.Label>Temperature</Form.Label>   
                            <Form.Control type="text" placeholder="36 °C" />

                            <Form.Label>Diagnosis</Form.Label>   
                            <Form.Control as="textarea" rows="3"/>

                            <Form.Label>Prescription</Form.Label>   
                            <Form.Control as="textarea" rows="3"/>

                            <Button variant="success">SAVE</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                {(this.state.modal.type == "new-patient" && this.state.modal.show) &&
                    <NewPatient 
                        show = {this.state.modal.type == "new-patient" && this.state.modal.show}
                        closeModal = {this.closeModal}
                        parentComponent = "NewRecord"
                        selectPatient = {this.selectPatient}
                    />
                }
            </div>
        )
    }

}
