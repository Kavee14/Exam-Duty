import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import UniLogo from '../../assets/UniLogo.png';

const NavBar1 = () => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm pt-0">
            <Container className="d-flex">

                <Navbar.Brand href="/"  >
                    <img
                        src={UniLogo}
                        className="navbar-brand-logo"
                        alt="UOR Logo"
                        style={{ height: '50px'}}
                    />
                </Navbar.Brand>

                {/* Responsive toggle button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

                        <Nav className="align-items-center">
                            <Nav.Item>
                                <span className="navbar-text me-4" style={{ color: '#00568D', fontSize:'16px' }}>You are not logged in</span>
                            </Nav.Item>
                            <button type="submit" className="btn btn-primary btn-sm mb-3">Log In</button>

                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar1;
