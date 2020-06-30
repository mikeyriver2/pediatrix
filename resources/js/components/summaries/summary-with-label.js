import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';
import SearchBar from '../modules/searchbar';

class SummaryWithLabel extends Component{
    constructor(props){
        super(props);
        this.state = {
            filter: 'All',
            filterIndex: 0
        }
    }

    renderSummarySimple = (summary) => {
        let elements = [];
        let url = 'records';
        const { parent, history } = this.props;
        if (parent === 'ViewRecords') {
            url = 'records'
        } else if (parent === 'ViewPatients') {
            url = 'patients';
        }
        (summary && summary.length > 0) &&
        summary.map((value,index)=>{
            const { id } = value;
            elements.push(
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
                        <p style={{padding: parent === "ViewPatients" ? "10px" : "", textAlign:"right",color:"rgba(41, 54, 97, 0.5)"}}>InPatient</p>
                    </Col>
                    <Row style={{width:"100%"}}>
                        <Col xs={8} className="no-right-padding summary-item">
                            <h6 className="item-created-at">
                                {/*dis a filler div*/}
                            </h6>
                        </Col>
                        <Col style={{textAlign: "right"}} xs={4}>
                            <a 
                                onClick={()=> {history.push({
                                    pathname: `/${url}/${id}`
                                })}}
                                style={{
                                    fontWeight:"bold",
                                    textDecorationLine:"underline",
                                    color:"#7896FF", 
                                    marginRight: "10px"
                                }}
                            >
                                View
                            </a>
                            <a
                                onClick={()=> {history.push({
                                    pathname: `/${url}/${id}`,
                                    state: {edit: true}
                                })}}
                                style={{
                                    fontWeight:"bold",
                                    textDecorationLine:"underline",
                                    color:"#7896FF"
                                }}
                            >
                                Edit
                            </a>
                        </Col>
                    </Row>
                </Row>
            )            
        })
        return elements;
    }

    renderSummaryFancy = () => {
        let elements = [];
        let url = 'payments';
        const { parent, history, summary } = this.props;
        if (parent === 'ViewPayments') {
            url = 'payments';
        } 
        let name = "";
        let bottomText = "";
        let status = "PENDING";
        let time = ""; //if appointments, iz like a 10am-11am
        if(summary){
            summary.map((data)=>{
                const { id } = data;
                name = data.full_name;
                if(parent == "ViewPayments"){
                    bottomText = `P${data.amount}.00`;
                    time = `Created at ${data.created_at}`;
                }
            
                elements.push(
                    <Row className="bottom-top-borders item-row-container">
                        <Col xs={8} className="no-right-padding summary-item">
                            <h6 className="item-header">
                                {name && name.toUpperCase()}
                            </h6>
                            <h6 className="item-desc">
                                {bottomText}
                            </h6>
                        </Col>
                        <Col xs={4} className="completed summary-item-label">
                            <h6 className="status">
                                {status}
                            </h6>
                            <p style={{textAlign:"right",color:"rgba(41, 54, 97, 0.5)"}}>InPatient</p>
                        </Col>
                        <Row style={{width:"100%"}}>
                            <Col xs={8} className="no-right-padding summary-item">
                                <h6 className="item-created-at">
                                    {time}
                                </h6>
                            </Col>
                            <Col style={{textAlign: "right"}} xs={4}>
                            <a 
                                onClick={()=> {history.push({
                                    pathname: `/${url}/${id}`
                                })}}
                                style={{
                                    fontWeight:"bold",
                                    textDecorationLine:"underline",
                                    color:"#7896FF", 
                                    marginRight: "10px"
                                }}
                            >
                                View
                            </a>
                            <a
                                onClick={()=> {history.push({
                                    pathname: `/${url}/${id}`,
                                    state: {edit: true}
                                })}}
                                style={{
                                    fontWeight:"bold",
                                    textDecorationLine:"underline",
                                    color:"#7896FF"
                                }}
                            >
                                Edit
                            </a>
                        </Col>
                        </Row>
                    </Row>
                )
            });
        }
        return elements;
    }

    handleRender = () => { 
        const { header, parent, summary, search } = this.props;
        let filterBy;
        if (search) filterBy = search.filterBy;


        const from_dashboard = false; //this will be a prop soon
        const styles = {
            border: from_dashboard ? "" : "0px",
            marginBottom: from_dashboard ? "" : "0px"
        }
        const showEditButton = true;

        switch(parent){
            case "ViewPayments":
                return this.renderSummaryFancy(summary);
            default:
                return this.renderSummarySimple(summary);

        }
    }

    render(){
        const { filter, filterIndex } = this.state;
        const { header, parent, summary, search } = this.props;
        let filterBy, searchUrl;
        if (search) filterBy = search.filterBy;
        searchUrl = search ? search.searchUrl : '';

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
                                <span>Filter</span>
                                {
                                    filterBy.map((value,index)=>{
                                        return (
                                            <a 
                                              key={index} 
                                              style={{
                                                fontWeight: index === filterIndex ? "bold" : ""
                                              }}
                                              onClick={() => {
                                                this.setState({
                                                    filter: value,
                                                    filterIndex: index
                                                });
                                              }}
                                            >
                                              {value}
                                            </a>
                                        )
                                    })
                                }
                            </nav>
                        }
                        {searchUrl !== '' &&
                            <SearchBar
                                filter={filter}
                                search={search}
                            />
                        }
                    </div>
                    }
                </div>
                <div className="summary-items">
                    { this.handleRender() }
                    {/* <a className="view-all">View All Appointments ></a> */}
                </div>
            </div>
        )
    }
}

export default withRouter(SummaryWithLabel);