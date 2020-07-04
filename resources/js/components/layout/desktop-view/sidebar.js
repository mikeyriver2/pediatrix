/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component, useEffect } from 'react';
import {
  withRouter,
} from 'react-router-dom';

const addSvg = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.00008 1.16675C3.78008 1.16675 1.16675 3.78008 1.16675 7.00008C1.16675 10.2201 3.78008 12.8334 7.00008 12.8334C10.2201 12.8334 12.8334 10.2201 12.8334 7.00008C12.8334 3.78008 10.2201 1.16675 7.00008 1.16675ZM6.41675 4.08341V6.41675H4.08341V7.58341H6.41675V9.91675H7.58341V7.58341H9.91675V6.41675H7.58341V4.08341H6.41675ZM2.33341 7.00008C2.33341 9.57258 4.42758 11.6667 7.00008 11.6667C9.57258 11.6667 11.6667 9.57258 11.6667 7.00008C11.6667 4.42758 9.57258 2.33341 7.00008 2.33341C4.42758 2.33341 2.33341 4.42758 2.33341 7.00008Z" fill="black" fillOpacity="0.54" />
  </svg>
);

const sideBarDesktop = (props) => {
  const { location, history } = props;
  const { pathname } = location;

  return (
    <div className="sideBar-desktop">
      <p>
        Welcome <b>Dr. Rivera</b>
      </p>
      <p>
        <b>Admin</b>
      </p>
      <ul>
        <li
          onClick={() => { history.push('/'); }}
          className="sidebar-desktop__item"
        >
          Dashboard
        </li>
        <li
          onClick={() => { history.push('/records'); }}
          className="sidebar-desktop__item"
        >
          View Record
        </li>
        <li className="sidebar-desktop__item sub">
          { addSvg() }
          <span>New Record</span>
        </li>
        <li
          onClick={() => { history.push('/appointments'); }}
          className="sidebar-desktop__item"
        >
          View Appointments
        </li>
        <li className="sidebar-desktop__item sub">
          { addSvg() }
          <span>New Appointments</span>
        </li>
        <li
          onClick={() => { history.push('/patients'); }}
          className="sidebar-desktop__item"
        >
          View Patients
        </li>
        <li className="sidebar-desktop__item sub">
          { addSvg() }
          <span>New Patient</span>
        </li>
        <li
          onClick={() => { history.push('/payments'); }}
          className="sidebar-desktop__item"
        >
          View Payments
        </li>
        <li className="sidebar-desktop__item sub">
          { addSvg() }
          <span>New Payment</span>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(sideBarDesktop);
