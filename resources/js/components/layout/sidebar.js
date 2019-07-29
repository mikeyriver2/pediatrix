import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {
    Row,
} from 'react-bootstrap';
import NewPatient from '../modals/new-patient';
import NewAppointment from '../modals/new-appointment';
import NewPayment from '../modals/new-payments';

export default class Sidebar extends Component{
    constructor(){
        super()
        this.state = {
           modal: {
               type: "",
               show: false
           }
        }
        //this.node = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        console.log('qweqweqwe');
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClick, false);
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

    handleClick(e){
        if (this.node && !this.node.contains(e.target)) {
            this.props.hideSideBar();
            console.log('You clicked outside of me!');
        }
    }

    triggerModal(modal){
        this.setState(prevState => ({
           modal: {
               ...prevState.modal,
               type: modal,
               show: !prevState.modal.show
           } 
        }))
    }

    render(){
        return (
            <div ref={(node)=>{this.node = node}} className="layout-sidebar">
                <ul id="sidebar-container" className="sidebar-container sidebar-hidden">
                    <li className="sidebar-user-name">
                        Welcome, <b>Dr. Rivera (Admin)</b>
                    </li>
                    <li className="sidebar-outter">
                        View Records
                        <ul className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Record</li>
                        </ul>
                    </li>
                    <li className="sidebar-outter">
                        View Appointments
                        <ul onClick={e => this.triggerModal('new-appointment')} className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Appointment</li>
                        </ul>
                    </li>
                    <li className="sidebar-outter">
                        View Patients
                        <ul onClick={e => this.triggerModal('new-patient')} className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Patient</li>
                        </ul>
                    </li>
                    <li className="sidebar-outter">
                        View Payment
                        <ul onClick={e => this.triggerModal('new-payment')} className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Payment</li>
                        </ul>
                    </li>
                </ul>
                <NewPatient 
                    show = {this.state.modal.type == "new-patient" && this.state.modal.show}
                    closeModal = {this.closeModal}
                />
                <NewAppointment 
                    show = {this.state.modal.type == "new-appointment" && this.state.modal.show}
                    closeModal = {this.closeModal}
                />
                <NewPayment
                    show = {this.state.modal.type == "new-payment" && this.state.modal.show}
                    closeModal = {this.closeModal}
                />
            </div>
        )
    }
}