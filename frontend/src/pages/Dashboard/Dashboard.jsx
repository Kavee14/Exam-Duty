import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Sidebar from "../../components/main components/Sidebar";
import Header from "../../components/main components/Header";
import UpcomingDuties from '../../components/dashboard components/UpcomingDuties';
import Updates from '../../components/dashboard components/Updates';
import Calendar from '../../components/dashboard components/Calendar';
import RequestButton from '../../components/dashboard components/RequestButton';
import Footer from '../../components/main components/Footer';
import './Dashboard.css';


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const activePage = "Dashboard";


    return (
        <Container fluid className="main-container">
            <Sidebar isOpen={isSidebarOpen} />
            <Row>
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
              <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage}/>

              <Container fluid className="content-container py-5">
                <div className="dashboard-content pt-1 px-2 ">
                  <div className="main-sections">
                    <div className="left-section bg-white">
                        <UpcomingDuties />
                    </div>
                    <div className="right-section px-3">
                      <Updates/>
                      <Calendar/>
                      <RequestButton/>
                    </div>
                  </div>
               </div>
              </Container>
            <Footer/>
            </div>
          </Row>
        </Container>
    )
};

export default Dashboard;
