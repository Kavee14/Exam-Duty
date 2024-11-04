import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap";
import Sidebar from "../../components/main components/Sidebar";
import Header from "../../components/main components/Header";
import Footer from "../../components/main components/Footer";
import "./Profile.css";

function ProfileSection({ userData, handleChange, isEditing, handleEditClick, handleSaveClick, handleImageChange }) {
    return (
        <section className="profile pt-5">
            <div className="profile-card">
                <div className="profile-image-container">
                    <img src={userData.profileImage} alt="Profile" className="profile-pic" />
                    <label htmlFor="imageUpload" className="edit-icon"><FaUserEdit /></label>
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>
                <h3>{userData.name}</h3>
                <p className="designation">{userData.position}</p>
            </div>

            <div className="details px-5">
                {/* Personal Info Section */}
                <div className="info-block">
                    <p className="text-title" style={{ fontWeight: "400", fontSize: "20px" }}>Personal Information</p>
                    <div className="info-content px-3">
                        {isEditing ? (
                            <Form>
                                <Form.Group as={Row} className="mb-2">
                                    <Form.Label column sm="3">Name:</Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            name="name"
                                            value={userData.name}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Phone No:</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Address:</Form.Label>
                                    <Form.Control
                                        name="address"
                                        value={userData.Address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSaveClick}>Save</Button>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Name:</strong> <span onClick={handleEditClick}>{userData.name}</span></p>
                                <p><strong>Email:</strong> <span>{userData.email}</span></p>
                                <p><strong>Phone No:</strong> <span>{userData.phone}</span></p>
                                <p><strong>Address:</strong> <span>{userData.address}</span></p>
                                <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Academic Info Section */}
                <div className="info-block">
                    <p className="text-title" style={{ fontWeight: "400", fontSize: "20px" }}>Academic Information</p>
                    <div className="info-content px-3">
                        {isEditing ? (
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label>Position:</Form.Label>
                                    <Form.Control
                                        name="position"
                                        value={userData.position}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Department:</Form.Label>
                                    <Form.Control
                                        name="department"
                                        value={userData.department}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSaveClick}>Save</Button>
                            </Form>
                        ) : (
                            <>
                                <p><strong>Position:</strong> <span onClick={handleEditClick}>{userData.position}</span></p>
                                <p><strong>Department:</strong> <span>{userData.department}</span></p>
                                <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Profile() {
    const [lecturerId, setLecturerId] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        department: "",
        profileImage: "profile-picture.png", // Default profile image
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);



    useEffect(() => {
        const lec_id = localStorage.getItem("lecturerId");
        setLecturerId(lec_id);
        console.log("AAA", lec_id)

        if (lec_id) {
            const fetchLecturerData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/lecturers/get/${lec_id}`, {
                        headers: {
                            'Content-Type': 'application/json',

                        },
                    });
                    console.log("Lecturer data:", response.data);
                    setUserData(response.data); // Set the fetched user data
                } catch (error) {
                    alert("Lecturer not found or unable to fetch data. Please check the ID or your connection.");
                } finally {
                    setLoading(false); // Stop loading after fetch attempt
                }
            };

            fetchLecturerData();
        } else {
            // Handle case where lecturerId is not found (user not logged in)
            console.warn("No lecturer ID found in local storage.");
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUserData((prevData) => ({
                ...prevData,
                profileImage: reader.result
            }));
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        axios.put(`/api/lecturers/edit/${lecturerId}`, userData)
            .then(() => {
                alert("Profile updated successfully");
                setIsEditing(false);
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                alert("Error updating profile. Please try again.");
            });
    };

    const activePage = "My Profile";

    return (
        <Container fluid className="main-container">
            <Sidebar isOpen={isSidebarOpen} />
            <Row>
                <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} activePage={activePage} />

                    <Container fluid className="content-container pt-0 pb-5">
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            <ProfileSection
                                userData={userData}
                                handleChange={handleChange}
                                handleImageChange={handleImageChange}
                                isEditing={isEditing}
                                handleEditClick={handleEditClick}
                                handleSaveClick={handleSaveClick}
                            />
                        )}
                    </Container>
                    <Footer />
                </div>
            </Row>
        </Container>
    );
}

export default Profile;
