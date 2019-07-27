import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';

export default class SearchBar extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return (
      <div className="custom-searchbar">
        <span>:O</span>
        <input type="text" />
      </div>
    )
  }
}