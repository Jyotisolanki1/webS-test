import React from 'react';
import Container from 'react-bootstrap/Container';
import {NavDropdown} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation} from '../slices/usersApiSlice.js';
import { logout } from '../slices/authSlice.js';


function Header() {
  const {userInfo} = useSelector((state)=>state.auth); 

const dispatch = useDispatch();
const navigate = useNavigate();

const [logoutApiCall] = useLogoutMutation();


const logoutHandler = async () => {
  try {    
    await logoutApiCall().unwrap();
    dispatch(logout());
   
    navigate('/login');
  } catch (err) {
   
    console.error(err);
  }
};


  return (
    <>
    <Navbar expand="lg"  bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href="#home">User_auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <>
              <NavDropdown title= {userInfo.name} id='userName'>
                <LinkContainer to = '/profile'>
                  <NavDropdown.Item>
                    profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to ="/users">
                  <NavDropdown.Item>
                   users near by you
                  </NavDropdown.Item>
                </LinkContainer>
                              
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
              </>
            ):(<>
            <LinkContainer to="/login">
            <Nav.Link >
                <FaSignInAlt/> SignIn
            </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
            <Nav.Link >
            <FaSignOutAlt/> SIgnOut
            </Nav.Link>
            </LinkContainer>
            </>)}
            
           
            
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;