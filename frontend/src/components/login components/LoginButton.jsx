import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './stylesLogin.module.css';

const LoginButton = () => {
    return (
        <LinkContainer to="/Login">
            <Button className={styles.customloginbtn}>
                Log in
            </Button>
        </LinkContainer>
    );
};

export default LoginButton
