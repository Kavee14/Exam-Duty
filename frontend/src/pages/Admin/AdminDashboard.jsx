import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Sidebar from '../../components/admin components/AdminSidebar';
import Header from '../../components/main components/Header';
import Footer from '../../components/main components/Footer';
import logo from '../../assets/logo.png';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const activePage = "Admin Dashboard";

    const venues = ["Alawattagoda Premadasa Auditorium", "Science Library", "MLT1", "MLT2", "PLT1", "PLT2", "Botany Hall"];

    const [lecturerID, setLecturerID] = useState('');
    const [dutyDate, setDutyDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [venue, setVenue] = useState(venues[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            lec_id: lecturerID,
            duty_date: dutyDate,
            start_time: startTime,
            end_time: endTime,
            course_code: courseCode,
            exam_hall: venue,
        };

        console.log('Form Data Submitted:', formData); // Check inputs sent

        try {
            const response = await axios.post('http://localhost:8000/api/v1/exam-duties/add', formData);
            alert('Form Submitted! Response: ' + response.data);
        } catch (error) {
            console.error('Error submitting the form:', error.response ? error.response.data : error.message);
            alert('Error submitting the form');
        }
    };

    return (
        <Container fluid className="main-container">
            <Sidebar isOpen={isSidebarOpen} />
            <Row>
                <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage} />
                    <Container fluid className="content-container pt-5">
                        <Card className="exam-duty-assign mb-4">
                            <Card.Body>
                                <div className="pl-3">
                                    <img src={logo} alt="EMS Logo" className="logo" />
                                </div>
                                <h1 className="section-title pb-4">Exam Duty Assign</h1>
                                <Form onSubmit={handleSubmit}>
                                    {/* Lecturer ID */}
                                    <Form.Group as={Row} controlId="formLecturerID" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Lecturer ID</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Lecturer ID"
                                                value={lecturerID}
                                                onChange={(e) => setLecturerID(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* Date */}
                                    <Form.Group as={Row} controlId="formDate" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Duty Date</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="date"
                                                value={dutyDate} // Use the correct state variable
                                                onChange={(e) => setDutyDate(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* Start Time */}
                                    <Form.Group as={Row} controlId="formStartTime" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Start Time</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="time"
                                                value={startTime} // Use the correct state variable
                                                onChange={(e) => setStartTime(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* End Time */}
                                    <Form.Group as={Row} controlId="formEndTime" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">End Time</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="time"
                                                value={endTime} // Use the correct state variable
                                                onChange={(e) => setEndTime(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* Course Code */}
                                    <Form.Group as={Row} controlId="formSubjectCode" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Course Code</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                value={courseCode} // Use the correct state variable
                                                onChange={(e) => setCourseCode(e.target.value)}
                                                placeholder="Enter Course Code"
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* Venue */}
                                    <Form.Group as={Row} controlId="formVenue" className="mb-3">
                                        <Form.Label column sm={3} className="label-container">
                                            <div className="label-text">Venue</div>
                                            <span className="colon">:</span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                value={venue} // Use the correct state variable
                                                onChange={(e) => setVenue(e.target.value)}
                                            >
                                                {venues.map((hall, idx) => (
                                                    <option key={idx} value={venue}>{venue}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        Assign
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

export default AdminDashboard;
