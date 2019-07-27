import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';
import SearchBar from '../modules/searchbar';

export default class SummaryWithLabel extends Component{
    constructor(){
        super();
        this.state = {
            
        }
    }

    render(){
        let from_dashboard = false; //this will be a prop soon
        let styles = {
            border: from_dashboard ? "" : "0px",
            marginBottom: from_dashboard ? "" : "0px"
        }
        let showEditButton = true;
        return (
            <div className="summary-container">
                <div style={styles} className="summary-headers">
                    {from_dashboard ?
                    <div> 
                        <h6 className="sh-top">
                            RECENT PAYMENTS
                        </h6>
                        <h4 className="sh-bottom">
                            THIS WEEK
                        </h4>
                    </div>
                    :
                    <div>
                        <h6 style={{marginBottom: ".2rem"}} className="sh-bottom">
                            PAYMENTS
                        </h6>
                        <nav className="filter-by">
                            <span>Filter By:</span>
                            <a><b>All</b></a>
                            <a>Inpatient </a>
                            <a>Outpatient </a>
                        </nav>
                        <SearchBar />
                    </div>
                    }
                </div>
                <div className="summary-items">
                    <Row className="bottom-top-borders item-row-container">
                        <Col xs={8} className="no-right-padding summary-item">
                            <h6 className="item-header">
                                JOHNNY DEPP
                            </h6>
                            <h6 className="item-desc">
                                GENERAL CONSULTATION
                            </h6>
                        </Col>
                        <Col xs={4} className="completed summary-item-label">
                            <h6 className="status">
                                COMPLETED
                            </h6>
                            <p style={{textAlign:"right",color:"rgba(41, 54, 97, 0.5)"}}>InPatient</p>
                        </Col>
                        <Row style={{width:"100%"}}>
                            <Col xs={8} className="no-right-padding summary-item">
                                <h6 className="item-created-at">
                                    10AM-10:30AM
                                </h6>
                            </Col>
                            <Col style={{textAlign: "right"}} xs={4}>
                                <a style={{fontWeight:"bold",textDecorationLine:"underline",color:"#7896FF"}}>Edit</a>
                            </Col>
                        </Row>
                    </Row>
                    <a className="view-all">View All Appointments ></a>
                </div>
            </div>
        )
    }
}