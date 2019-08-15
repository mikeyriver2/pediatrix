import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class Summary extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const { header, parent, summary } = this.props;
        return (
            <div className="summary-container">
                <div className="summary-headers">
                    <h6 className="sh-top">
                        { header && header}
                    </h6>
                    { summary ?
                            <h4 className="sh-bottom">
                                THIS WEEK
                            </h4>
                        :
                            ""
                    }
                </div>
                <div className="summary-items">
                    {
                        (summary && summary.length > 0) &&
                            summary.map((value,index)=>{
                                return (
                                    <div key={index} className="bottom-top-borders summary-item">
                                        <h6 className="item-header">
                                            {value.full_name}
                                        </h6>
                                        {parent === "ViewRecords" &&
                                            <h6 className="item-desc">
                                                GENERAL CONSULTATION
                                            </h6>
                                        }
                                        <h6 className="item-created-at">
                                            {value.created_at}
                                        </h6>
                                    </div>
                                )            
                            })
                    }
                    <a className="view-all">View All Appointments ></a>
                </div>
            </div>
        )
    }
}