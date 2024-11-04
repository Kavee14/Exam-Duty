import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/main components/Footer';
import NavBar1 from "../../components/main components/NavBar1";
import logo from "../../assets/logo.png";
import './Login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!email) {
            isValid = false;
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            isValid = false;
            formErrors.email = "Email address is invalid";
        }

        if (!password) {
            isValid = false;
            formErrors.password = "Password is required";
        } else if (password.length < 6) {
            isValid = false;
            formErrors.password = "Password must be at least 6 characters";
        }

        setErrors(formErrors);
        return isValid;
    };

    async function handleLogin() {
        try {
            let item = { email, password };
            let result = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(item),
            });
            result = await result.json();

            if (String(result.status) === 'success') {
                console.log("Login successful:", result);//removw this
                const lecturerId = result.user.lec_id; // Assuming lecturerId is part of the response
                console.log("Logged in lecturer ID:", lecturerId);
                localStorage.setItem('lecturerId',lecturerId);
                localStorage.setItem('user-info', JSON.stringify(result.user));

                // Fetch user details including the address
                fetchUserDetails(lecturerId);

                // Redirect based on user type
                if (result.user.usertype === 'admin') {
                    navigate('/admin');
                } else {
                    navigate(`/dashboard`); // Redirect to dashboard with lecturer ID
                }
            } else {
                console.error("Login failed:", result.data.message);
                setErrors({ credentials: 'Invalid email or password' });
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrors({ credentials: 'Something went wrong. Please try again.' });
        }
    }

    async function fetchUserDetails(lecturerId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${lecturerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const userDetails = await response.json();
            if (userDetails) {
                localStorage.setItem('user-info', JSON.stringify(userDetails)); // Store full user details
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleLogin();
        }
    };

    const clearFields = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-page">
            <NavBar1/>
            <Container className="mt-4 col-sm-6 px-1 ">
                <div className="login-container pt-2 mx-lg-1 px-4">
                    <Row className="justify-content-center">
                        <Col md={10} lg={10} className="login-box pt-3">
                            <div className="login-header text-center mb-3">
                                <img src={logo} alt="EMS Logo" className="ems-logo"/>
                            </div>
                            <div className="text-center mb-4">
                                <p className="login-title1 mb-0">Welcome To</p>
                                <p className="login-title mb-0">Exam Duty Management System</p>
                                <p className="login-subtitle">Please log into your account.</p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        className="custom-placeholder"
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!errors.email || !!errors.credentials}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        className="custom-placeholder"
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!errors.password || !!errors.credentials}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password || errors.credentials}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="justify-content-end pt-3 ">
                                    <button type="button" className="btn btn-primary btn-sm mb-3 w-100"
                                            onClick={() => {
                                                clearFields();
                                                navigate('/');
                                            }}>Clear
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-sm mb-3 w-100">Log In
                                    </button>
                                </div>
                                <div className="login-footer text-center">
                                    <p className="mt-4 mb-0">
                                        New member?{' '}
                                        <a href="mailto:ems@sci.ruh.ac.lk"
                                           title="Contact the Department of Computer Science">Contact DCS
                                        </a>
                                    </p>
                                </div>
                            </Form>
                        </Col>
                    </Row>

                    <br/><br/>
                </div>
            </Container>
            <br/><br/>
            <Footer/>
        </div>
    );
}

export default LoginPage;
