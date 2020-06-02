import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, withRouter,
} from 'react-router-dom';
import {
  Row,
  Col,
} from 'react-bootstrap';

export default class QuickSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { summary } = this.props;
    return (
      <div className="quick-summary-container">
        {
                    (summary && summary.length > 0)
                        && summary.map((value, index) => (
                          <Row key={index} style={{ paddingTop: index == 0 ? '20px' : '' }} className="quick-summary-item">
                            <Col xs={8} className="qsi-left">
                              <h6>
                                {value.header}
                              </h6>
                            </Col>
                            <Col xs={4} className="qsi-right">
                              <h6>
                                <b>{value.value}</b>
                              </h6>
                            </Col>
                          </Row>
                        ))
                }
      </div>
    );
  }
}
