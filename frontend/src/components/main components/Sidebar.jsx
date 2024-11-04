import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './Sidebar.css';
import logo from '../../assets/logo.png';

function Sidebar({ isOpen }) {
    const location = useLocation(); // Get the current location

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="pl-3">
                <img src={logo} alt="EMS Logo" className="sidebar-logo" />
            </div>
            <Nav className="flex-column">
                <Nav.Link
                    href="/dashboard"
                    className={location.pathname === '/dashboard' ? 'active' : ''}
                >
                    Dashboard
                </Nav.Link>

                <Nav.Link
                    href="/profile"
                    className={location.pathname === '/profile' ? 'active' : ''}
                >
                    Profile
                </Nav.Link>

                <Nav.Link
                    href="/duties"
                    className={location.pathname === '/duties' ? 'active' : ''}
                >
                    Duties
                </Nav.Link>

                <Nav.Link
                    href="/report"
                    className={location.pathname === '/report' ? 'active' : ''}
                >
                    Report
                </Nav.Link>
            </Nav>
        </div>
    );
}

export default Sidebar;
