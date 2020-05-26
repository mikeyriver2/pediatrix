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

const Record = () => {
  useState(() => {

  }, []);

  const borderStyle = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  };

  return (
    <div className="record">
      <h5>Record</h5>
      <Form>
        <Form.Label>Patient</Form.Label>
        <div className="patient-suggestions-container">
          <Form.Control
            className="ignore-listener"
            id="records-patient-name"
            type="text"
            placeholder="Enter Patient Name"
          />
        </div>

        <Form.Label>Weight</Form.Label>
        <InputGroup>
          <FormControl style={borderStyle} type="text" placeholder="10" />
          <InputGroup.Prepend>
            <InputGroup.Text>lbs</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>

        <Form.Label>Temperature</Form.Label>
        <InputGroup>
          <Form.Control style={borderStyle} type="text" placeholder="36" />
          <InputGroup.Prepend>
            <InputGroup.Text>°C</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>

        <Form.Label>Diagnosis</Form.Label>
        <Form.Control as="textarea" rows="3" />

        <Form.Label>Prescription</Form.Label>
        <Form.Control as="textarea" rows="3" />

        <Button variant="success">Edit</Button>
      </Form>
    </div>
  );
};

export default withRouter(Record);
