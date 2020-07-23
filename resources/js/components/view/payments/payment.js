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
import { connect } from 'react-redux';
import { fi } from 'date-fns/locale';
import * as helpers from '../../../helpers/validations';

const Payment = (props) => {
  const [patient, setPatient] = useState({});
  const [clonedPatient, setClonedPatient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useState(() => {
    const { match, location } = props;
    const { state } = location;
    const { params } = match;

    axios.get(`/api/payments/${params.paymentId}`).then((res) => {
      const { data } = res;
      setPatient(data);
      setClonedPatient(data);
    });

    if (state && state.edit) {
      setEditMode(true);
    }
  }, []);

  useState(() => {
    setClonedPatient(patient);
  }, [patient.amount, patient.status]);

  const { isMobile, history } = props;
  const { 
    patient_id: patientId, 
    full_name: fullName, 
    amount, 
    status 
  } = patient;
  const { full_name: cFullName, amount: cAmount, status: cStatus } = clonedPatient;

  const handleChange = (e, type = '') => {
    const clonedPatientFoo = { ...clonedPatient };
    const { target } = e;
    const { value } = target;
    const clonedErrors = { ...errors };
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'amount':
        isError = !helpers.validateIsNumeric(e.target.value, type);
        errorCase = 'is not a valid number';
        clonedPatientFoo.amount = value;
        break;
      default:
        clonedPatientFoo[type] = value;
        break;
    }

    setClonedPatient(clonedPatientFoo);
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

  const returnEditMode = () => (
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
        id="button-edit"
        onClick={() => { setEditMode(!editMode); }}
        variant="success"
        style={{
          display: !isMobile ? 'none' : '',
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
            id="button-save"
            style={{ display: !isMobile ? 'none' : '' }}
            disabled={Object.keys(errors).length > 0}
            onClick={handleUpdate}
            variant="primary"
          >
            SAVE
          </Button>
          )}
    </Form>
  );

  const returnViewMode = () => (
    <div className="view">
      <div className="view-item">
        <p>PATIENT</p>
        <p>{fullName}</p>
      </div>
      <div className="view-item">
        <p>AMOUNT</p>
        <p>
          Php {amount}
        </p>
      </div>
      <div className="view-item">
        <p>STATUS</p>
        <p>{status}</p>
      </div>
      <div className="view-edit">
        <Button
          onClick={() => { setEditMode(!editMode); }}
          variant="success"
        >
          EDIT
        </Button>
      </div>
    </div>
  );

  let returnDom;
  if (editMode || !isMobile) {
    returnDom = returnEditMode();
  } else {
    returnDom = returnViewMode();
  }

  return (
    <div className={editMode ? 'payment editMode' : 'payment viewMode'}>
      <div className="payment__upper">
        <Button
          className="hollow-btn"
          onClick={() => {
            history.push(`/patients/${patientId}`)
          }}
        >
          Patient Profile
        </Button>
      </div>
      {
        returnDom
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
});

const PaymentConnect = connect(mapStateToProps)(Payment);

export default withRouter(PaymentConnect);
