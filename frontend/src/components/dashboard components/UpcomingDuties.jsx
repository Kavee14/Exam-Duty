import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpcomingDuties.css';

const UpcomingDuties = () => {
    const [duties, setDuties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const lec_id = localStorage.getItem('lecturerId');

        console.log("ABC",lec_id);
        const fetchDuties = async () => {
            try {
                // Replace 'userDutiesApiUrl' with the actual API endpoint
                const response = await axios.get(`http://127.0.0.1:8000/upcoming-duties/${lec_id}`);
console.log("Response 1",response);
                setDuties(response.data);
            } catch (err) {
                setError('Failed to load duties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDuties();
    }, []);

    if (loading) return <p>Loading duties...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="upcoming-duties">
            <h4 className="Title">Upcoming Duties</h4>
            {duties.length > 0 ? (
                duties.map((duty, index) => (
                    <div key={index} className={`duty-box ${index % 2 === 0 ? 'blue-box' : 'white-box'}`}>
                        <div className="duty-date">
                            <span className="date-number">{duty.duty_date}</span>
                        </div>
                        <div className="duty-details">
                            <p>{duty.time}</p>
                            <p>{duty.course_code}</p>
                            <p>{duty.exam_hall}</p>
                        </div>
                    </div>
                ))

                ) : (
                <p className="no-duties">You have no assigned duties.</p>
            )}
        </div>
    );
};

export default UpcomingDuties;
