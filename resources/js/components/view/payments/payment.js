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

const Payment = () => {
  useState(() => {

  }, []);

  return (
    <div className="payment">
      <h5>Payment</h5>
          <Form>
            <Form.Label>Patient</Form.Label>
            <div className="patient-suggestions-container">
              <Form.Control type="text" placeholder="Enter Patient Name" />
            </div>
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="Php">PhP</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter Amount"
              />
            </InputGroup>


            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Incomplete</option>
            </Form.Control>

            <Button variant="success">Edit</Button>
          </Form>
    </div>
  );
};

export default withRouter(Payment);
