import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaChevronDown, FaSearch, FaTimes, FaDownload, FaEye, FaUserPlus } from 'react-icons/fa';
import Sidebar from "../../components/main components/Sidebar";
import Header from "../../components/main components/Header";
import Footer from "../../components/main components/Footer";
import axios from 'axios';
import './DutiesPage.css';

function DutiesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [lecturerId, setLecturerId] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [lecturers, setLecturers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const activePage = "Duties";

  useEffect(() => {
    const lec_id = localStorage.getItem("lecturerId");
    setLecturerId(lec_id);

    if (lec_id) {
      axios.get(`/api/duties/schedule/${lec_id}`)
          .then(response => {
            setSchedule(response.data);
          })
          .catch(error => console.error("Error fetching schedule:", error));

      // Fetch lecturers for substitute request
      axios.get(`/api/lecturers/${lec_id}`)
          .then(response => {
            setLecturers(response.data);
          })
          .catch(error => console.error("Error fetching lecturers:", error));
    }
  }, []);

  const handleDownloadSchedule = () => {
    if (schedule) {
      // Logic to download the schedule file
      alert('Downloading schedule...');
    } else {
      alert('No schedule available to download.');
    }
  };

  const handleViewSchedule = () => {
    if (schedule) {
      // Logic to view the schedule (could be opening a modal or redirecting)
      alert('Viewing schedule...');
    } else {
      alert('No schedule available to view.');
    }
  };

  const handleRequestSubstitute = () => {
    if (selectedLecturer) {
      // Logic to send substitute request to the selected lecturer
      axios.post(`/api/request-substitute`, {
        requesterId: lecturerId,
        substituteLecturerId: selectedLecturer.id
      })
          .then(response => {
            alert(`Request sent to ${selectedLecturer.name}`);
          })
          .catch(error => console.error("Error requesting substitute:", error));
    } else {
      alert('Please select a lecturer to request a substitute.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const matchedLecturer = lecturers.find(lecturer => lecturer.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setSelectedLecturer(matchedLecturer);
  };

  return (
      <Container fluid className="duties-page-container">
        <Sidebar isOpen={isSidebarOpen} />
        <Row>
          <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage} />
            <Container fluid className="content-container py-4">
              <Container className="content-wrapper">
                <Row className="section-row">
                  <Col lg={6} className="section-col">
                    {/* Exam Duty Schedule Section */}
                    <Card className="schedule-card">
                      <Card.Body className="text-center">
                        <h3 className="card-title">Exam Duty Schedule</h3>
                        <p className="text-muted text-center">Quickly access or download your duty schedule.</p>
                        <div className="button-group mt-5">
                          <Button variant="primary" className="action-btn" onClick={handleViewSchedule}>
                            <FaEye className="me-2" /> View
                          </Button>
                          <Button variant="outline-primary" className="action-btn" onClick={handleDownloadSchedule}>
                            <FaDownload className="me-2" /> Download
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={6} className="section-col">
                    {/* Add Substitutes Section */}
                    <Card className="substitute-card">
                      <Card.Body>
                        <h3 className="card-title text-center">Add Substitute</h3>
                        <p className="text-muted text-center">
                          Need a substitute? Connect with lecturers here.
                        </p>
                        <Form className="mt-3">
                          <InputGroup className="search-input-group mb-5">
                            <InputGroup.Text><FaChevronDown /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search lecturers"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Text><FaSearch /></InputGroup.Text>
                            <InputGroup.Text><FaTimes onClick={() => setSearchQuery('')} /></InputGroup.Text>
                          </InputGroup>
                          <Button variant="primary" className="w-50 request-btn" onClick={handleRequestSubstitute}>
                            <FaUserPlus className="me-2" /> Request
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Container>
            <Footer />
          </div>
        </Row>
      </Container>
  );
}

export default DutiesPage;
