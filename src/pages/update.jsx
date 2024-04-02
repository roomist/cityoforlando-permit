import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {

    const[permit, setPermit] = useState({
        permitName: '',
        endDate: '',
        submitterName: '',
        status: '',
        submittedDate: '2024-03-31'
    });

    const navigate = useNavigate();
    const location = useLocation();
    const permitId = location.pathname.split('/')[2];

    const handleChange = (event) => {
        setPermit((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8800/permits/' + permitId, permit);
            alert("Succesfully Updated Permit");
            navigate('/');
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                Update Permit
            </Typography>
            <TextField
                label="Permit Name"
                placeholder="Permit Name"
                onChange={handleChange}
                name="permitName"
                fullWidth
                margin="normal"
            />
            <TextField
                label="End date"
                placeholder="End date"
                onChange={handleChange}
                name="endDate"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Submitter"
                placeholder="Submitter"
                onChange={handleChange}
                name="submitterName"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status"
                placeholder="Status"
                onChange={handleChange}
                name="status"
                fullWidth
                margin="normal"
            />
            <Box display="flex" justifyContent="center">
                <Button variant="contained" size="large" onClick={handleClick}>
                    Update
                </Button>
            </Box>
        </Container>
    );
};

export default Update