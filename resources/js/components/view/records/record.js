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
import * as helpers from '../../../helpers/validations';

const Record = (props) => {
  const [record, setRecord] = useState({});
  const [clonedRecord, setClonedRecord] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useState(() => {
    const { match, location } = props;
    const { state } = location;
    const { params } = match;

    axios.get(`/api/records/${params.recordId}`).then((res) => {
      const { data } = res;
      setRecord(data);
      setClonedRecord(data);
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
  } = record;
  const {
    full_name: cFullName,
    weight: cWeight,
    temperature: cTemperature,
    type: cType,
    prescription: cPrescription,
    diagnosis: cDiagnosis,
  } = clonedRecord;

  const { history } = props;

  return (
    <div className="record">
      <div className="record__upper">
        <img
          onClick={history.goBack}
          alt="arrow"
          src="/images/arrow.svg"
        />
        <h5>Record</h5>
      </div>
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
    </div>
  );
};

export default withRouter(Record);
