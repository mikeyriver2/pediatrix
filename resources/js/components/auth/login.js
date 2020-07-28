import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = props;

  useEffect(() => {
    const login = document.querySelector('.login__form > input:nth-of-type(2)');
    if (login) {
      login.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          console.log('ass')
          handleLogin();
        }
      });
    }
  }, []);

  const handleLogin = () => {
    axios.post('/api/login', {
      email, password,
    }).then((res) => {
      const { data } = res;
      setUser(data.user);
    });
  };

  return (
    <div className="login">
      <img alt="pediatrix" src="/images/pediatrix1.png" />
      <h3>LOG IN</h3>
      <div className="login__form">
        <h3>EMAIL</h3>
        <Form.Control
          onChange={(e) => {
            console.log('ass')
            setEmail(e.target.value);
          }}
          placeholder="Email Address"
        />

        <h3>PASSWORD</h3>
        <Form.Control
          onChange={(e) => {
            console.log('asssseee')
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </div>
      <Button
        onClick={handleLogin}
        variant="success"
      >
        LOG IN
      </Button>

      <p><u>FORGOT PASSWORD?</u></p>
    </div>
  );
};

export default Login;
