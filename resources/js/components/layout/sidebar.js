import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {
    Row,
} from 'react-bootstrap';

export default class Sidebar extends Component{
    constructor(){
        super()
        this.state = {

        }
        //this.node = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        console.log('qweqweqwe');
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e){
        if (this.node && !this.node.contains(e.target)) {
            this.props.hideSideBar();
            console.log('You clicked outside of me!');
        }
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
                        <ul className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Appointment</li>
                        </ul>
                    </li>
                    <li className="sidebar-outter">
                        View Patients
                    <ul className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Patient</li>
                        </ul>
                    </li>
                    <li className="sidebar-outter">
                        View Payment
                        <ul className="sidebar-view-records-parent">
                            <li className="sidebar-inner">New Payment</li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}