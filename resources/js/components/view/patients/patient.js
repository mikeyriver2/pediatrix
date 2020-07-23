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
import * as helpers from '../../../helpers/validations';
import SummaryWithLabel from '../../summaries/summary-with-label';
import { first } from 'lodash';

const Patient = (props) => {
  const [records, setRecords] = useState({});
  const [patient, setPatient] = useState({});
  const [payments, setPayments] = useState({});

  const [clonedPatient, setClonedPatient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const [showRecords, setShowRecords] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  useState(() => {
    const { match, location } = props;
    const { state } = location;
    const { params } = match;

    axios.get(`/api/patients/${params.patientId}`).then((res) => {
      const { data } = res;
      setPatient(data);
      setClonedPatient(data);

      axios.get(`/api/records/filter?patientId=${data.id}`).then((resFoo) => {
        setRecords(resFoo.data);
      });

      axios.get(`/api/payments/filter?patientId=${data.id}`).then((resFoo) => {
        setPayments(resFoo.data);
      });
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

  const { history, isMobile } = props;

  const returnEditMode = () => (
    <Form>
      <Form.Label>Patient Name</Form.Label>
      <div className="patient__fullName">
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
      </div>
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
        id="button-edit"
        onClick={() => { setEditMode(!editMode); }}
        variant="success"
        style={{
          marginBottom: editMode ? '0px' : '',
          display: !isMobile ? 'none' : '',
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
            style={{ display: !isMobile ? 'none' : '' }}
            id="button-save"
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
          style={{ display: !isMobile ? 'none' : '' }}
          onClick={() => { setEditMode(!editMode); }}
          variant="success"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  const returnSummaries = () => {
    let header;
    let toSummary;
    let viewAs;

    if (showPayments) {
      toSummary = payments;
      header = `Payments of ${firstName}`;
      viewAs = 'ViewPayments';
    } else if (showRecords) {
      toSummary = records;
      header = `Records of ${firstName}`;
      viewAs = 'ViewRecord';
    }

    return (
      <div className="record__records">
        <SummaryWithLabel
          summary={toSummary}
          parent={viewAs}
          header={header}
        />
      </div>
    );
  };

  let returnDom;
  if (showRecords || showPayments) {
    returnDom = returnSummaries();
  } else if (editMode || !isMobile) {
    returnDom = returnEditMode();
  } else {
    returnDom = returnViewMode();
  }

  return (
    <div className={editMode ? 'patient editMode' : 'patient viewMode'}>
      <div className="patient__upper">
        <Button
          className={`${showRecords ? 'active' : ''} hollow-btn fixed-width`}
          onClick={() => {
            setShowPayments(false);
            setShowRecords(!showRecords);
          }}
        >
          RECORDS
        </Button>
        <Button
          className={`${showPayments ? 'active' : ''} hollow-btn fixed-width`}
          onClick={() => {
            setShowPayments(!showPayments);
            setShowRecords(false);
          }}
        >
          PAYMENTS
        </Button>
        <Button className="hollow-btn" variant="success">APPOINTMENTS</Button>
      </div>
      { returnDom }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
});

const PatientConnect = connect(mapStateToProps)(Patient);

export default withRouter(PatientConnect);
