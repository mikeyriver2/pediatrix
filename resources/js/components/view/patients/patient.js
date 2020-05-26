import React, { useState } from 'react';
import {
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import {
  withRouter,
} from 'react-router-dom';

const Patient = () => {
  useState(() => {

  }, []);

  return (
    <div className="patient">
      <h5>Patient</h5>
      <Form>
        <Form.Label>Patient Name</Form.Label>
        <Form.Control style={{ marginBottom: '10px' }} type="text" placeholder="First Name" />

        <Form.Control style={{ marginBottom: '10px' }} type="text" placeholder="Middle Name" />

        <Form.Control type="text" placeholder="Last Name" />

        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="09178191791" />

        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="pediatrix@gmail.com" />

        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="House No. Street, Brgy, City" />

        <Button variant="success">EDIT</Button>
      </Form>
    </div>
  );
};

export default withRouter(Patient);
