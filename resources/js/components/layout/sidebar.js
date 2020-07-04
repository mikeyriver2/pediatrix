import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
} from 'react-bootstrap';
import { timingSafeEqual } from 'crypto';
import { Link } from 'react-router-dom';
import NewPatient from '../modals/new-patient';
import NewAppointment from '../modals/new-appointment';
import NewPayment from '../modals/new-payments';
import NewRecord from '../modals/new-records';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      modal: {
        type: '',
        show: false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentDidUpdate(prevProps) {
    const { location, hideSideBar } = this.props;
    const { location: prevLoc } = prevProps;

    if (location && location.pathname !== prevLoc.pathname) {
      hideSideBar();
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
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

  handleClick(e) {
    if (!e.target.className.includes('layout-main')
      && this.node && !this.node.contains(e.target)
      && !this.state.modal.show
    ) {
      this.props.hideSideBar();
    }
  }

  triggerModal(modal) {
    this.setState((prevState) => ({
      modal: {
        ...prevState.modal,
        type: modal,
        show: !prevState.modal.show,
      },
    }));
  }

  render() {
    const { isMobile } = this.props;
    return !isMobile ? <div /> : (
      <div ref={(node) => { this.node = node; }} className="layout-sidebar">
        <ul id="sidebar-container" className="sidebar-container sidebar-hidden">
          <li className="sidebar-user-name">
            Welcome,
            {' '}
            <b>Dr. Rivera (Admin)</b>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="sidebar-outter">
            <Link to="/records">View Records</Link>
            <ul className="sidebar-view-records-parent">
              <li onClick={(e) => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
            </ul>
          </li>
          <li className="sidebar-outter">
            View Appointments
            <ul onClick={(e) => this.triggerModal('new-appointment')} className="sidebar-view-records-parent">
              <li className="sidebar-inner">New Appointment</li>
            </ul>
          </li>
          <li className="sidebar-outter">
            <Link to="/patients">View Patients</Link>
            <ul onClick={(e) => this.triggerModal('new-patient')} className="sidebar-view-records-parent">
              <li className="sidebar-inner">New Patient</li>
            </ul>
          </li>
          <li className="sidebar-outter">
            <Link to="/payments">View Payments</Link>
            <ul onClick={(e) => this.triggerModal('new-payment')} className="sidebar-view-records-parent">
              <li className="sidebar-inner">New Payment</li>
            </ul>
          </li>
        </ul>

        {(this.state.modal.type == 'new-patient' && this.state.modal.show)
                    && (
                    <NewPatient
                        {...this.props}
                      show={this.state.modal.type == 'new-patient' && this.state.modal.show}
                      closeModal={this.closeModal}
                    />
                    )}
        {(this.state.modal.type == 'new-appointment' && this.state.modal.show)
                    && (
                    <NewAppointment
                        {...this.props}
                      show={this.state.modal.type == 'new-appointment' && this.state.modal.show}
                      closeModal={this.closeModal}
                    />
                    )}
        {(this.state.modal.type == 'new-payment' && this.state.modal.show)
                    && (
                    <NewPayment
                        {...this.props}
                      show={this.state.modal.type == 'new-payment' && this.state.modal.show}
                      closeModal={this.closeModal}
                    />
                    )}
        {(this.state.modal.type == 'new-record' && this.state.modal.show)
                    && (
                    <NewRecord
                        {...this.props}
                      show={this.state.modal.type == 'new-record' && this.state.modal.show}
                      closeModal={this.closeModal}
                    />
                    )}
      </div>
    );
  }
}
