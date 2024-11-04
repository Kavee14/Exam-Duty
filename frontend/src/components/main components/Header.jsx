import React from 'react';
import { Navbar, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import profile from '../../assets/profile.png';

function Header({ toggleSidebar, isSidebarOpen, activePage }) {
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        navigate(`/`);
    }

    return (
        <div className={isSidebarOpen ? "shifted" : ""}>
            <div>
                <Navbar bg="white" className="header shadow-sm px-3" expand="lg">
                    <button className="custom-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <Navbar.Collapse className="justify-content-end">
                        <Col md={2} className="d-flex align-items-center">
                            <Navbar.Text className="login-name">
                                {user ? user.name : 'Guest'} {/* Fallback if user is not found */}
                            </Navbar.Text>
                        </Col>
                        <img
                            src={profile}
                            alt="Profile"
                            roundedCircle
                            className="profile-pic ms-2"
                            onClick={logOut}
                        />
                    </Navbar.Collapse>
                </Navbar>

                <div className="header-spacing"></div>

                <div className="active-pg">
                    <h5>{activePage}</h5>
                </div>
            </div>
        </div>
    );
}

export default Header;
