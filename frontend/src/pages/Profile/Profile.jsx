import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap";
import Sidebar from "../../components/main components/Sidebar";
import Header from "../../components/main components/Header";
import Footer from "../../components/main components/Footer";
import "./Profile.css";

function ProfileSection({
  userData,
  handleChange,
  isEditing,
  handleEditClick,
  handleSaveClick,
  handleImageChange,
  isLoading
}) {
  // Separate form data state from the actual user data
  const [formData, setFormData] = useState(userData);

  // Update form data when userData changes
  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  // Handle local form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveClick(formData);
  };

  if (isLoading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <section className="profile pt-5">
      <div className="profile-card">
        <div className="profile-image-container">
          <img
            src={userData?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="profile-pic"
          />
          <label htmlFor="imageUpload" className="edit-icon">
            <FaUserEdit />
          </label>
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <h3>{userData?.name}</h3>
        <p className="designation">{userData?.position}</p>
      </div>

      <div className="details px-5">
        {/* Personal Info Section */}
        <div className="info-block">
          <h4 className="text-title mb-4">Personal Information</h4>
          <div className="info-content px-3">
            {isEditing ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Name:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Email:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData?.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Phone:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="phone"
                      value={formData?.phone || ''}
                      onChange={handleFormChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Address:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="address"
                      value={formData?.address || ''}
                      onChange={handleFormChange}
                    />
                  </Col>
                </Form.Group>
                <div className="text-end">
                  <Button variant="secondary" className="me-2" onClick={() => handleEditClick(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="info-display">
                <Row className="mb-2">
                  <Col sm="3"><strong>Name:</strong></Col>
                  <Col sm="9">{userData?.name}</Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="3"><strong>Email:</strong></Col>
                  <Col sm="9">{userData?.email}</Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="3"><strong>Phone:</strong></Col>
                  <Col sm="9">{userData?.phone}</Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="3"><strong>Address:</strong></Col>
                  <Col sm="9">{userData?.address}</Col>
                </Row>
                <div className="text-end">
                  <Button variant="primary" onClick={() => handleEditClick(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Academic Info Section */}
        <div className="info-block mt-4">
          <h4 className="text-title mb-4">Academic Information</h4>
          <div className="info-content px-3">
            {isEditing ? (
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Position:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="position"
                      value={formData?.position || ''}
                      onChange={handleFormChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">Department:</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      name="department"
                      value={formData?.department || ''}
                      onChange={handleFormChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div className="info-display">
                <Row className="mb-2">
                  <Col sm="3"><strong>Position:</strong></Col>
                  <Col sm="9">{userData?.position}</Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="3"><strong>Department:</strong></Col>
                  <Col sm="9">{userData?.department}</Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  const [lecturerId, setLecturerId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchProfile = async () => {
      const lec_id = localStorage.getItem("lecturerId");
      if (!lec_id) {
        console.warn("No lecturer ID found in local storage.");
        setLoading(false);
        return;
      }

      setLecturerId(lec_id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/lecturers/get/${lec_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isEditing]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/lecturers/upload-image/${lecturerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setUserData(prev => ({
        ...prev,
        profileImage: response.data.imageUrl
      }));
      
      alert("Profile image updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleEditClick = (value) => {
    setIsEditing(value);
  };

  const handleSaveClick = async (formData) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/lecturers/edit/${lecturerId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setUserData(response.data.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container fluid className="main-container">
      <Sidebar isOpen={isSidebarOpen} />
      <Row>
        <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            activePage="My Profile"
          />
          <Container fluid className="content-container pt-0 pb-5">
            <ProfileSection
              userData={userData}
              handleChange={handleSaveClick}
              handleImageChange={handleImageChange}
              isEditing={isEditing}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              isLoading={loading}
            />
          </Container>
          <Footer />
        </div>
      </Row>
    </Container>
  );
}

export default Profile;