import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './AdminSidebar.css';
import logo from '../../assets/logo.png';

function AdminSidebar({ isOpen }) {
    const location = useLocation();

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="pl-3">
                <img src={logo} alt="EMS Logo" className="sidebar-logo" />
            </div>
            <Nav className="flex-column">
                <Nav.Link
                    href="/admin"
                    className={location.pathname === '/admin' ? 'active' : ''}
                >
                    Assign Duties
                </Nav.Link>

                <Nav.Link
                    href="/add"
                    className={location.pathname === '/add' ? 'active' : ''}
                >
                    Add Lecturers
                </Nav.Link>

                <Nav.Link
                    href="/profile"
                    className={location.pathname === '/profile' ? 'active' : ''}
                >
                    Update Profile
                </Nav.Link>

                <Nav.Link
                    href="/upload"
                    className={location.pathname === '/upload' ? 'active' : ''}
                >
                    Upload Files
                </Nav.Link>
            </Nav>
        </div>
    );
}

export default AdminSidebar;
