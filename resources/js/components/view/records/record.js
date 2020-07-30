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
import { connect } from 'react-redux';
import * as helpers from '../../../helpers/validations';
import axios from 'axios';
import SummaryWithLabel from '../../summaries/summary-with-label';

const Record = (props) => {
  const [record, setRecord] = useState({});
  const [clonedRecord, setClonedRecord] = useState({});

  const [records, setRecords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [showRecords, setShowRecords] = useState(false);

  useState(() => {
    const { match, location } = props;
    const { state } = location;
    const { params } = match;

    axios.get(`/api/records/${params.recordId}`).then((res) => {
      const { data } = res;
      setRecord(data);
      setClonedRecord(data);
      axios.get(`/api/records/filter?patientId=${data.patient_id}`).then((resFoo) => {
        setRecords(resFoo.data);
      });
    });

    if (state && state.edit) {
      setEditMode(true);
    }
  }, []);

  const handleChange = (e, type = '') => {
    const clonedRecordFoo = { ...clonedRecord };
    const { target } = e;
    const { value } = target;
    const clonedErrors = { ...errors };
    let isError = false;
    let errorCase = '';
    switch (type) {
      case 'weight':
        isError = !helpers.validateIsNumeric(value, type);
        errorCase = 'is not a valid number';
        clonedRecordFoo.weight = value;
        break;
      case 'temperature':
        isError = !helpers.validateIsNumeric(value, type);
        errorCase = 'is not a valid number';
        clonedRecordFoo.temperature = value;
        break;
      default:
        clonedRecordFoo[type] = value;
        break;
    }

    setClonedRecord(clonedRecordFoo);
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

    axios.put('/api/records', {
      ...clonedRecord,
    }).then((res) => {
      setRecord(res.data);
      setEditMode(false);
    });
  };

  const borderStyle = {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  };

  const {
    full_name: fullName,
    weight,
    temperature,
    type,
    prescription,
    diagnosis,
    patient_id: patientId,
  } = record;
  const {
    full_name: cFullName,
    weight: cWeight,
    temperature: cTemperature,
    type: cType,
    prescription: cPrescription,
    diagnosis: cDiagnosis,
  } = clonedRecord;

  const { history, isMobile } = props;

  const returnEditMode = () => (
    <Form>
      <Form.Label>Patient</Form.Label>
      <div className="patient-suggestions-container">
        <Form.Control
          value={fullName}
          className="ignore-listener"
          id="records-patient-name"
          type="text"
          placeholder="Enter Patient Name"
          disabled
        />
      </div>

      <Form.Label>Weight</Form.Label>
      <InputGroup>
        <FormControl
          onChange={(e) => handleChange(e, 'weight')}
          value={editMode ? cWeight : weight}
          style={borderStyle}
          type="text"
          placeholder="10"
          disabled={!editMode}
        />
        <InputGroup.Prepend>
          <InputGroup.Text>lbs</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
      <p
        className="error"
        style={{
          display: (errors.weight && editMode)
            ? 'block'
            : 'none',
        }}
      >
        Invalid Weight
      </p>

      <Form.Label>Temperature</Form.Label>
      <InputGroup>
        <Form.Control
          onChange={(e) => handleChange(e, 'temperature')}
          value={editMode ? cTemperature : temperature}
          style={borderStyle}
          type="text"
          placeholder="36"
          disabled={!editMode}
        />
        <InputGroup.Prepend>
          <InputGroup.Text>°C</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
      <p
        className="error"
        style={{
          display: (errors.temperature && editMode)
            ? 'block'
            : 'none',
        }}
      >
        Invalid Temperature
      </p>


      <Form.Label>Diagnosis</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'diagnosis')}
        value={editMode ? cDiagnosis : diagnosis}
        as="textarea"
        rows="3"
        disabled={!editMode}
      />

      <Form.Label>Prescription</Form.Label>
      <Form.Control
        onChange={(e) => handleChange(e, 'prescription')}
        value={editMode ? cPrescription : prescription}
        as="textarea"
        rows="3"
        disabled={!editMode}
      />

      <Button
        onClick={() => { setEditMode(!editMode); }}
        id="button-edit"
        variant="success"
        style={{
          display: isMobile ? '' : 'none',
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
            disabled={Object.keys(errors).length > 0}
            onClick={handleUpdate}
            variant="primary"
            style={{ display: isMobile ? '' : 'none' }}
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
        <p>NAME</p>
        <p>{fullName}</p>
      </div>
      <div className="view-item">
        <p>WEIGHT</p>
        <p>
          {weight}
          {' '}
          lbs.
        </p>
      </div>
      <div className="view-item">
        <p>TEMP °C</p>
        <p>{temperature}</p>
      </div>
      <div className="view-item">
        <p>DIAGNOSIS</p>
        <p>{diagnosis}</p>
      </div>
      <div className="view-item">
        <p>PRESCRIPTION</p>
        <p>{prescription}</p>
      </div>
      <div className="view-edit">
        <Button
          id="button-edit"
          onClick={() => { setEditMode(!editMode); }}
          variant="success"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  const returnSummaries = () => {
    return (
      <div className="record__records">
        <SummaryWithLabel
          summary={records}
          parent="ViewRecord"
          header={`History Records of ${fullName}`}
        />
      </div>
    );
  };

  let returnDom;
  if (showRecords) {
    returnDom = returnSummaries();
  } else if (editMode || !isMobile) {
    returnDom = returnEditMode();
  } else {
    returnDom = returnViewMode();
  }


  return (
    <div className={editMode ? 'record editMode' : 'record viewMode'}>
      <div className="record__upper">
        <Button
          onClick={() => {
            history.push(`/patients/${patientId}`);
          }}
          className="hollow-btn fixed-width"
        >
          PATIENT PROFILE
        </Button>
        <Button
          className={`${showRecords ? 'active' : ''} hollow-btn fixed-width`} 
          onClick={() => { setShowRecords(!showRecords) }}
        >
          HISTORY
        </Button>
        {/* <Button className="hollow-btn fixed-width" variant="success">PAYMENTS</Button>
        <Button className="hollow-btn fixed-width" variant="success">APPOINTMENTS</Button> */}
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

const RecordConnect = connect(mapStateToProps)(Record);

export default withRouter(RecordConnect);
