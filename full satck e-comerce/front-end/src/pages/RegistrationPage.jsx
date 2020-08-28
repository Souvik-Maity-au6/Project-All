import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import '../styles/RegistrationPage.css';

const RegistrationPage = (props) => {
    // console.log(props);
    return (
        <div className="page-container container mt-3">
            <div className="form-container">
                <RegistrationForm props={props} />
            </div>
        </div>
    );
};

export default RegistrationPage;
