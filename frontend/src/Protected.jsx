import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    const { Cmp } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <Cmp />
        </div>
    );
}

export default Protected;
