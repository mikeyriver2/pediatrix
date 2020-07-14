import React, { useEffect, useState } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Button,
} from 'react-bootstrap';


const navBar = (props) => {
  const [mode, setMode] = useState('list');
  /**
   * MODES:
   *  list - tables/listing of info
   *  view - viewing record/patient/payment
   *  edit - editing //
   *  create - creating //
   */

  const { location, history } = props;
  const { pathname } = location;
  let path = 'HOME';
  if (pathname && pathname !== '') {
    if (pathname.includes('patients')) {
      path = 'PATIENTS';
    } else if (pathname.includes('records')) {
      path = 'RECORDS';
    } else if (pathname.includes('payments')) {
      path = 'PAYMENTS';
    }
  }

  useEffect(() => {
    // sample: patient/1 ,  record/1,   payment/1
    const regex = /[a-z]\w+\/\d+/g;
    const match = pathname.match(regex);
    if (match && match.length > 0) {
      setMode('view');
    } else {
      setMode('list');
    }
  }, [pathname]);

  const handleClick = (e) => {
    const { target } = e;
    let action = target.innerText;
    console.log(mode);

    let dom;
    if (mode === 'view') {
      dom = document.querySelector('#button-edit');
    } else if (mode === 'edit') {
      dom = document.querySelector('#button-save');
    }

    if (dom) {
      dom.click();
    }

    if (action) {
      action = action.toLowerCase();
      if (action === 'edit') {
        setMode('edit');
      } else if (action === 'save') {
        setMode('view');
      }
    }
  };

  const handleCancel = (e) => {
    const { target } = e;
    const action = target.innerText;

    if (action === '') {
      history.goBack();
    } else {
      const dom = document.querySelector('#button-edit');
      if (dom) dom.click();
      setMode('view');
    }
  };

  return (
    <div
      style={{justifyContent: mode === 'list' ? 'center' : ''}}
      className="top-nav-desktop"
    >
      {mode !== 'list'
      && (
      <Button onClick={handleCancel} className={`mode-${mode}`}>
        {mode === 'view'
          ? (
            <img
              className="ignore-sidebar"
              alt="arrow"
              src="/images/arrow_2.png"
            />
          )
          : 'Cancel'}
      </Button>
      )}
      <h5>{path}</h5>
      {mode !== 'list'
      && (
      <Button
        onClick={handleClick}
        className={`mode-${mode}`}
      >
        {mode === 'edit'
          ? 'Save'
          : 'Edit'}
      </Button>
      )}
    </div>
  );
};

export default withRouter(navBar);
