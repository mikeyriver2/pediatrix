import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {
    Row,
} from 'react-bootstrap';

export default class Layout extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    switchSideBar(){
        let element = document.getElementById('sidebar-container')
        let classes = element.className;
        if(classes.includes("sidebar-hidden")){
            element.classList.remove("sidebar-hidden");
            element.classList.add("sidebar-show");
        }else{
            element.classList.remove("sidebar-show");
            element.classList.add("sidebar-hidden");            
        }
    }

    hideSideBar(){
        let element = document.getElementById('sidebar-container')
        element.classList.remove("sidebar-show");
        element.classList.add("sidebar-hidden");     
    }

    render(){
        return (
            <div className="main-layout">
                <div onClick={this.switchSideBar} className="layout-header">
                    <Row className="layout-main-logo">
                        <img src="/images/pediatrix1.png"/>
                    </Row>
                    <Row className="layout-nav">
                        <h5>HOME</h5>
                    </Row>
                </div>
                <Sidebar
                    hideSideBar = {this.hideSideBar}
                />
            </div>
        )
    }
}