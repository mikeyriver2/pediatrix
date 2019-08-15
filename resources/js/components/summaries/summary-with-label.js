import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';
import SearchBar from '../modules/searchbar';

export default class SummaryWithLabel extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        const { header, parent, summary, filterBy } = this.props;
        const from_dashboard = false; //this will be a prop soon
        const styles = {
            border: from_dashboard ? "" : "0px",
            marginBottom: from_dashboard ? "" : "0px"
        }
        const showEditButton = true;
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
                            { header }
                        </h6>
                        {filterBy &&
                            <nav className="filter-by">
                                <span>Filter By:</span>
                                {
                                    filterBy.map((value,index)=>{
                                        return (
                                            <a key={index} style={{fontWeight: index === 0 ? "bold" : ""}}>{value}</a>
                                        )
                                    })
                                }
                            </nav>
                        }
                        <SearchBar />
                    </div>
                    }
                </div>
                <div className="summary-items">
                    {
                        (summary && summary.length > 0) &&
                            summary.map((value,index)=>{
                                return (
                                    <Row key={index} className="bottom-top-borders item-row-container">
                                        <Col xs={8} className="no-right-padding summary-item">
                                            <h6 className="item-header">
                                                {value.full_name}
                                            </h6>
                                                <h6 style={{fontSize: parent === "ViewPatients" ? "14px" : ""}} className="item-desc">
                                                    {parent === "ViewPatients" ?
                                                        value.created_at 
                                                        :
                                                        "GENERAL CONSULTATION"
                                                    }
                                                </h6>
                                        </Col>
                                        <Col xs={4} style={{background: parent !== "ViewPayments" ? "transparent" : "" }} className="completed summary-item-label">
                                            {parent === "ViewPayments" &&
                                                <h6 className="status">
                                                    COMPLETED
                                                </h6>
                                            }
                                            <p style={{padding: parent === "ViewPatients" ? "10px" : "", textAlign:"right",color:"rgba(41, 54, 97, 0.5)"}}>InPatient</p>
                                        </Col>
                                        <Row style={{width:"100%"}}>
                                            <Col xs={8} className="no-right-padding summary-item">
                                                <h6 className="item-created-at">
                                                    {parent == "ViewPayments" && value.created_at}
                                                </h6>
                                            </Col>
                                            <Col style={{textAlign: "right"}} xs={4}>
                                                <a style={{fontWeight:"bold",textDecorationLine:"underline",color:"#7896FF", marginRight: "10px"}}>View</a>
                                                <a style={{fontWeight:"bold",textDecorationLine:"underline",color:"#7896FF"}}>Edit</a>
                                            </Col>
                                        </Row>
                                    </Row>
                                )            
                            })
                    }
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