import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import {
    Row,
} from 'react-bootstrap';
import ViewPatients from '../view/patients/patients';
import ViewRecords from '../view/records/records';

export default class Layout extends Component{
    constructor(){
        super();
        this.state = {
            appHeight: "",
            ass: "ass",
            showSideBar: false
        }
        this.header = React.createRef();
        this.switchSideBar = this.switchSideBar.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            appHeight: document.getElementById('pediatrix').clientHeight
        },()=>{
            //console.log(this.state.appHeight);
            //document.getElementById('sidebar-container').style.height = `${this.state.appHeight}px`;
        })
    }

    switchSideBar(){
        let element = document.getElementById('sidebar-container')
        let classes = element.className;
        if(classes.includes("sidebar-hidden")){
            this.setState({
                showSideBar: true
            },()=>{
                element.classList.remove("sidebar-hidden");
                element.classList.add("sidebar-show");
                document.getElementById('pediatrix').style.height = "100vh"; //temporarily disable scroll
                document.getElementById('pediatrix').style.overflow = "hidden";
            })
        }else{
            this.setState({
                showSideBar: false
            },()=>{
                element.classList.remove("sidebar-show");
                element.classList.add("sidebar-hidden");
                document.getElementById('pediatrix').removeAttribute("style"); //re-enable scroll
            })
        }
    }
    
    hideSideBar(){
        let element = document.getElementById('sidebar-container')
        element.classList.remove("sidebar-show");
        element.classList.add("sidebar-hidden");     
        document.getElementById('pediatrix').removeAttribute("style"); 
    }

    render(){
        return (
            <div ref={this.header} className="main-layout">
                <div onClick={this.switchSideBar} className="layout-header">
                    <Row className="layout-main-logo">
                        <img src="/images/pediatrix1.png"/>
                    </Row>
                    <Row className="layout-nav">
                        <h5 className="layout-main-nav">HOME</h5>
                    </Row>
                </div>
                <Sidebar
                    layoutRef = {this.header}
                    showSideBar = {this.state.showSideBar}
                    hideSideBar = {this.hideSideBar}
                />
                
                <Route exact path={`/`} component={Dashboard}/>
                <Route exact path={`/patients`} component={ViewPatients}/>
                <Route exact path={`/records`} component={ViewRecords}/>
                <Route exact path={`/home`} component={Dashboard}/>
            </div>
        )
    }
}