import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import Sidebar from '../../components/admin components/AdminSidebar';
import Header from '../../components/main components/Header';
import Footer from '../../components/main components/Footer';
import './UploadPdfs.css';

function UploadPdfs() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState("");
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const activePage = "ADMIN DASHBOARD";

    // Fetch users from the database (sample data used here)
    useEffect(() => {
        // Replace with actual API call to fetch users
        setUsers([
            { id: 1, name: "A.B.C.D.Samarasinghe" },
            { id: 2, name: "W.D.S.Wijewardhana" },
            { id: 3, name: "P.M.Dissanayake" }
        ]);
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (label) => {
        if (file && file.type === "application/pdf") {
            alert(`${label} uploaded successfully!`);
            setFile(null); // Clear file after upload
        } else {
            alert("Please select a valid PDF file.");
        }
    };

    const handleUserSelect = (e) => {
        setSelectedUser(e.target.value);
    };

    return (
        <Container fluid className="main-container">
            <Sidebar isOpen={isSidebarOpen} />
            <Row>
                <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage} />

                    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light mt-md-4">
                        <Card style={{ width: '900px', height: 'auto', marginTop: '130px' ,marginBottom:'130px'}} className="shadow">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <img src={logo} alt="EMS Logo" className="mb-4" style={{ width: '130px' }} />
                                <h2 className="text-title pb-5" style={{fontWeight:'bold'}}>Upload Exam Duty Files</h2>

                                <Form className="w-100 px-5">

                                    <Form.Group as={Row} className="mb-5">
                                        <Form.Label column sm={5} className="text-start pe-3" >
                                            Exam Duty Schedule:
                                        </Form.Label>
                                        <Col sm={5} className="text-start">
                                            <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
                                            <Button variant="primary btn-sm me-3" onClick={() => handleUpload('Exam Duty Schedule')}>Upload</Button>
                                        </Col>
                                    </Form.Group>

                                    {/* Voucher Upload */}
                                    <Form.Group as={Row} className="mb-5">
                                        <Form.Label column sm={5} className="text-start pe-3">
                                            Voucher:
                                        </Form.Label>
                                        <Col sm={5} className="text-start">
                                            <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
                                            <Button variant="primary btn-sm me-3" onClick={() => handleUpload('Voucher')}>Upload</Button>
                                        </Col>
                                    </Form.Group>

                                    {/* User Selection Dropdown */}
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5} className="text-start pe-3" >
                                            Upload Report
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={5} className="text-start ps-5" style={{ color: '#00568D' }}>
                                            Select User:
                                        </Form.Label>
                                        <Col sm={5}>
                                            <Form.Select as="select" value={selectedUser} onChange={handleUserSelect} >
                                                <option value="">Choose a user</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={user.name}>{user.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>

                                    {/* Report Upload */}
                                    <Form.Group as={Row} className="mb-5">
                                        <Form.Label column sm={5} className="text-start ps-5" style={{ color: '#00568D' }}>
                                            Report:
                                        </Form.Label>
                                        <Col sm={5} className="text-start">
                                            <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
                                            <Button variant="primary btn-sm me-3" onClick={() => handleUpload('Report')}>Upload</Button>
                                        </Col>
                                    </Form.Group>
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

export default UploadPdfs;
