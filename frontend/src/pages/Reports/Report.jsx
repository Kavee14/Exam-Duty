import React, { useState } from 'react';
import "./Report.css";
import Footer from '../../components/main components/Footer';
import { Container, Row ,Card} from 'react-bootstrap';
import Sidebar from "../../components/main components/Sidebar";
import Header from '../../components/main components/Header';

const Report = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const activePage = "Voucher & Report";

    const handleSeeMore = () => {
        // Logic for viewing more details
    };

    const handleDownload = () => {
        // Logic for downloading the report or voucher
    };

    return (
        <Container fluid className="main-container">
            <Row>
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage}/>

                    <Container fluid className="content-container">

                                <Card className="voucher mb-4">
                                    <Card.Body>
                                    <h2 className="blue-text">Voucher</h2>
                                    <div className="thick-line"></div>
                                    <div className="actions">
                                        <div className="action-items">
                                            <p><i className="fas fa-file-pdf"></i> View the voucher</p>
                                            <p><i className="fas fa-download"></i> Download the voucher</p>
                                        </div>
                                        <div className="buttons">
                                            <button onClick={handleSeeMore}>See More</button>
                                            <button onClick={handleDownload}>Download</button>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>

                                <Card className="report mb-4">
                                    <Card.Body>
                                    <h2 className="blue-text">Report</h2>
                                    <div className="thick-line"></div>
                                    <div className="actions">
                                        <div className="action-items">
                                            <p><i className="fas fa-file-pdf"></i> View the Report</p>
                                            <p><i className="fas fa-download"></i> Download the Report</p>
                                        </div>
                                        <div className="buttons">
                                            <button onClick={handleSeeMore}>See More</button>
                                            <button onClick={handleDownload}>Download</button>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>

                    </Container>
                    <Footer/>
                </div>
            </Row>
        </Container>
    );
};

export default Report;
