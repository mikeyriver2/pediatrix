/* eslint-disable react/jsx-props-no-spreading */
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
import axios from 'axios';
import { fi } from 'date-fns/locale';
import * as helpers from '../../../helpers/validations';

const Payment = (props) => {
  const [patient, setPatient] = useState({});
  const [clonedPatient, setClonedPatient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useState(() => {
    const { match } = props;
    const { params } = match;

    axios.get(`/api/payments/${params.paymentId}`).then((res) => {
      const { data } = res;
      setPatient(data);
      setClonedPatient(data);
    });
  }, []);

  useState(() => {
    setClonedPatient(patient);
  }, [patient.amount, patient.status]);

  const { full_name: fullName, amount, status } = patient;
  const { full_name: cFullName, amount: cAmount, status: cStatus } = clonedPatient;

  const handleChange = (e, type = '') => {
    const { target } = e;
    const { value } = target;
    const clonedErrors = { ...errors };
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'amount':
        isError = !helpers.validateIsNumeric(e.target.value, type);
        errorCase = 'is not a valid number';
        clonedPatient.amount = value;
        break;
      default:
        clonedPatient[type] = value;
        break;
    }

    if (isError) {
      clonedErrors[type] = errorCase;
    } else if (clonedErrors[type]) {
      delete clonedErrors[type];
    }
    setErrors(clonedErrors);
  };

  const handleUpdate = () => {
    const { match } = props;
    const { params } = match;
    const { paymentId } = params;

    axios.put('/api/payments', {
      payment: clonedPatient,
      paymentId,
    }).then((res) => {
      setPatient(res.data);
      setEditMode(false);
    });
  };

  return (
    <div className="payment">
      <h5>Payment</h5>
      <Form>
        <Form.Label>Patient</Form.Label>
        <div className="patient-suggestions-container">
          <Form.Control
            /* keep code for future purposes :)
                {...(!editMode && {
                  value: fullName,
                })
                }
            */
            value={fullName}
            type="text"
            placeholder="Enter Patient Name"
            disabled
          />
        </div>

        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="Php">PhP</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            disabled={!editMode}
            value={editMode ? cAmount : amount}
            onChange={(e) => handleChange(e, 'amount')}
            placeholder="Enter Amount"
          />
        </InputGroup>
        <p
          className="error"
          style={{
            display: (errors.amount && editMode)
              ? 'block'
              : 'none',
          }}
        >
          Invalid Amount
        </p>


        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={editMode ? cStatus : status}
          onChange={(e) => handleChange(e, 'status')}
          disabled={!editMode}
        >
          <option>Completed</option>
          <option>Pending</option>
          <option>Incomplete</option>
        </Form.Control>

        <Button
          onClick={() => { setEditMode(!editMode); }}
          variant="success"
          style={{
            marginBottom: editMode ? '0px' : '',
          }}
        >
          {
            editMode
              ? 'STOP EDIT MODE'
              : 'Edit'
          }
        </Button>

        {editMode
          && (
          <Button
            onClick={handleUpdate}
            variant="primary"
          >
            SAVE
          </Button>
          )}
      </Form>
    </div>
  );
};

export default withRouter(Payment);
