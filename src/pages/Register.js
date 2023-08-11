import React, { useState } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import { nanoid } from 'nanoid';

import Wrapper from '../components/Wrapper';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [registrationError, setRegistrationError] = useState(false);

  const handleRegister = async () => {
    const users = await localforage.getItem('users');

    if (users) {
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        // User with this email already exists
        setRegistrationError(true);
      } else {
        let newUser = { email, password, points: 0, role: 'user', referralCode: nanoid(5) };

        if (referralCode) {
          const referringUser = users.find(u => u.referralCode === referralCode);
          if (referringUser) {
            referringUser.points += 10; // Update points as needed
            newUser.points += 10; // Update points as needed
            const updatedUsers = users.map(u =>
              u.email === referringUser.email ? referringUser : u
            );
            await localforage.setItem('users', updatedUsers);
          } else {
            // Referring user not found
            setRegistrationError(true);
            return;
          }
        }

        await localforage.setItem('users', [...users, newUser]);
        navigate('/login');
      }
    }
  };

  return (
    <Wrapper>
      <div className="d-flex justify-content-center">
        <div>
          <h1 className="text-center">Register Page</h1>
          {registrationError && <Alert variant="danger">Invalid referral code or email already exists.</Alert>}
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
            <Form.Group controlId="referralCode"> {/* Added referral code field */}
              <Form.Label>Referral Code (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" onClick={handleRegister}>
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
