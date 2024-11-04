import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../components/admin components/AdminSidebar';
import Header from '../../components/main components/Header';
import Footer from '../../components/main components/Footer';
import './AddLecturers.css';
import logo from '../../assets/logo.png';

function AddLecturers() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [lecturer, setLecturer] = useState({
        lec_id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        position: 'Professor',
        department: 'Computer Science',
    });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const activePage = "ADMIN DASHBOARD";

    const positions = ["Professor", "Associate Professor", "Lecturer", "Assistant Lecturer"];
    const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry"];

    // Update state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLecturer({ ...lecturer, [name]: value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/lecturers/add', lecturer);
            alert('Lecturer added successfully!');
        } catch (error) {
            if (error.response) {
                alert(`Failed to add lecturer: ${error.response.data.message || 'Unknown error'}`);
            } else {
                alert('Failed to add lecturer: ' + error.message);
            }
        }
    };

    return (
        <Container fluid className="main-container">
            <Sidebar isOpen={isSidebarOpen} />
            <Row>
                <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage} />

                    <Container fluid className="content-container pt-5">
                        <Card className="lecturer-details mb-4 px-5">
                            <Card.Body>
                                <div className="pl-3">
                                    <img src={logo} alt="EMS Logo" className="logo"/>
                                </div>
                                <h3 className="text-title pb-3 mt-3" style={{fontWeight: 'bold', textAlign:'center'}}>Lecturer Details</h3>
                                <br/>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} controlId="formLecID" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Lecturer ID</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="lec_id"
                                                placeholder="Enter Lecturer ID"
                                                value={lecturer.lec_id}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formName" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Name</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="name" // Matches with the backend
                                                placeholder="Enter Full Name"
                                                value={lecturer.name}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formEmail" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Email</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                value={lecturer.email}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPhone" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Phone Number</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                placeholder="Enter Phone Number"
                                                value={lecturer.phone}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formAddress" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Address</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="Address"
                                                placeholder="Enter Address"
                                                value={lecturer.Address}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPosition" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Position</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                name="position"
                                                value={lecturer.position}
                                                onChange={handleInputChange}
                                            >
                                                {positions.map((position, idx) => (
                                                    <option key={idx} value={position}>{position}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formDepartment" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Department</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                name="department"
                                                value={lecturer.department}
                                                onChange={handleInputChange}
                                            >
                                                {departments.map((department, idx) => (
                                                    <option key={idx} value={department}>{department}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="btn-sm mt-5">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <Footer />
                </div>
            </Row>
        </Container>
    );
}

export default AddLecturers;
