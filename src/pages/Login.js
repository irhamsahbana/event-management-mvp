import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import localforage from 'localforage';
import Wrapper from '../components/Wrapper';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    const users = await localforage.getItem('users');

    if (users) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // Successful login
        setLoginError(false);
        await localforage.setItem('user', user);
        navigate('/');
      } else {
        // Incorrect email or password
        setLoginError(true);
      }
    }
  };

  return (
    <Wrapper>
      <div className="d-flex justify-content-center">
        {/* Use a container with flexbox properties */}
        <div>
          <h1 className="text-center">Login Page</h1>
          {loginError && <Alert variant="danger">Incorrect email or password.</Alert>}
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
