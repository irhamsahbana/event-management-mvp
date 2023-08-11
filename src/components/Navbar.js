import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import localforage from 'localforage';
import { Link, useNavigate } from 'react-router-dom';

import linkStyle from '../utils/LinkStyle';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';

const MyNavbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }

    fetchUser();
  }, []);

  const handleLogout = () => {
    localforage.removeItem('user').then(() => {
      console.log('User logged out!');
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MeetUp!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction="horizontal" gap={3}>
              <Link to="/" style={linkStyle}>Event Discovery</Link>
              {user?.role === 'admin' &&
                <>
                  <Link to="/event-creation" style={linkStyle}>Create Event</Link>
                  <Link to="/promotions" style={linkStyle}>Promotions</Link>
                  <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                </>
              }
            </Stack>
          </Nav>
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {!user &&
                <>
                  <Link to="/login" style={linkStyle}>
                    Login
                  </Link>
                  <Link to="/register" style={linkStyle}>
                    Register
                  </Link>
                </>
              }
              {user &&
                <Link to="/" style={linkStyle} onClick={handleLogout}>
                  Logout
                </Link>
              }
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;