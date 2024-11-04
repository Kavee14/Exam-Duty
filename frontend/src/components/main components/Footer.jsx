import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container fluid className={styles.footerContainer}>
                    {/* First Section: Logo */}
                    <Row>
                        <Col md={1}>
                            <Row><br/></Row>
                            <Row>
                                <img src={logo} alt="EMS Logo" className={styles.logo} /> </Row>
                        </Col>

                        {/* Second Section: Description */}
                        <Col md={3}>
                            <Row><br/></Row>
                            <Row>
                            <p className={styles.description}>
                                Please obtain an email and password from the EMS administrator in the Science Faculty of the University of Ruhuna.
                            </p></Row>
                        </Col>

                        <Col md={4}></Col>

                        {/* Third Section: Contact Information */}
                        <Col md={3}>
                            <Row>
                                <p className={styles.contact}>Contact Us</p>
                            </Row>
                            <Row>
                            <p className={styles.contactInfo}>
                                Department of Computer Science, Faculty of Science,University of Ruhuna<br/>
                                Phone: 041 2222681<br/>
                                Email: ems@sci.ruh.ac.lk
                            </p></Row>
                        </Col>
                    </Row>
                </Container>
            <div className={styles.footerBottom}>
                <p>© {new Date().getFullYear()} Department of Computer Science</p>
            </div>
        </footer>
    )
}

export default Footer;
