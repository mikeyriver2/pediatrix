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
import * as helpers from '../../../helpers/validations';

const Patient = (props) => {
  const [patient, setPatient] = useState({});
  const [clonedPatient, setClonedPatient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useState(() => {
    const { match, location } = props;
    const { state } = location;
    const { params } = match;

    axios.get(`/api/patients/${params.patientId}`).then((res) => {
      const { data } = res;
      setPatient(data);
      setClonedPatient(data);
    });

    if (state && state.edit) {
      setEditMode(true);
    }
  }, []);

  const handleChange = (e, type = '') => {
    const clonedPatientFoo = { ...clonedPatient };
    const { target } = e;
    const { value } = target;
    const clonedErrors = { ...errors };
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'phone_number':
        isError = !helpers.validateIsNumeric(value, type);
        errorCase = 'is not a valid number';
        clonedPatientFoo.phone_number = value;
        break;
      case 'email':
        isError = !helpers.validateIsEmail(value, type);
        errorCase = 'is not a valid email';
        clonedPatientFoo.email = value;
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
    const { patientId } = params;

    axios.put('/api/patients', {
      ...clonedPatient,
    }).then((res) => {
      setPatient(res.data);
      setEditMode(false);
    });
  };

  const {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone_number: phoneNumber,
    email,
    home_address: homeAddress,
  } = patient;

  const {
    first_name: cFirstName,
    middle_name: cMiddleName,
    last_name: cLastName,
    phone_number: cPhoneNumber,
    email: cEmail,
    home_address: cHomeAddress,
  } = clonedPatient;

  const { history } = props;

  const returnEditMode = () => (
    <Form>
      <Form.Label>Patient Name</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'first_name')}
        value={editMode ? cFirstName : firstName}
        style={{ marginBottom: '10px' }}
        type="text"
        placeholder="First Name"
        disabled={!editMode}
      />

      <Form.Control
        onChange={(e) => handleChange(e, 'middle_name')}
        value={editMode ? cMiddleName : middleName}
        style={{ marginBottom: '10px' }}
        type="text"
        placeholder="Middle Name"
        disabled={!editMode}
      />

      <Form.Control
        onChange={(e) => handleChange(e, 'last_name')}
        value={editMode ? cLastName : lastName}
        type="text"
        placeholder="Last Name"
        disabled={!editMode}
      />

      <Form.Label>Phone Number</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'phone_number')}
        value={editMode ? cPhoneNumber : phoneNumber}
        type="text"
        placeholder="09178191791"
        disabled={!editMode}
      />
      <p
        className="error"
        style={{
          display: (errors.phone_number && editMode)
            ? 'block'
            : 'none',
        }}
      >
        Invalid Phone Number
      </p>

      <Form.Label>Email</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'email')}
        value={editMode ? cEmail : email}
        type="text"
        placeholder="pediatrix@gmail.com"
        disabled={!editMode}
      />
      <p
        className="error"
        style={{
          display: (errors.email && editMode)
            ? 'block'
            : 'none',
        }}
      >
        Invalid Email
      </p>

      <Form.Label>Address</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'home_ddress')}
        value={editMode ? cHomeAddress : homeAddress}
        type="text"
        as="textarea"
        rows="3"
        placeholder="House No. Street, Brgy, City"
        disabled={!editMode}
      />

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
            disabled={Object.keys(errors).length > 0}
            onClick={handleUpdate}
            variant="primary"
          >
            SAVE
          </Button>
          )}
      {' '}

    </Form>
  );

  const returnViewMode = () => (
    <div className="view">
      <div className="view-item">
        <p>PATIENT NAME</p>
        <p>
          {`${firstName} ${middleName} ${lastName}`}
        </p>
      </div>
      <div className="view-item">
        <p>PHONE NUMBER</p>
        <p>
          {phoneNumber}
        </p>
      </div>
      <div className="view-item">
        <p>EMAIL</p>
        <p>{email}</p>
      </div>
      <div className="view-item">
        <p>ADDRESS</p>
        <p>{homeAddress}</p>
      </div>
      <div className="view-edit">
        <Button
          onClick={() => { setEditMode(!editMode); }}
          variant="success"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  return (
    <div className={editMode ? 'patient editMode' : 'patient viewMode'}>
      <div className="patient__upper">
        <Button className="hollow-btn" variant="success">RECORD HISTORY</Button>
        <Button className="hollow-btn" variant="success">PAYMENTS</Button>
        <Button className="hollow-btn" variant="success">APPOINTMENTS</Button>
      </div>
      {
        editMode ? returnEditMode() : returnViewMode()
      }
    </div>
  );
};

export default withRouter(Patient);
