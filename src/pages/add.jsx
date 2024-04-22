import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

const Add = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    };

    const [permit, setPermit] = useState({
        permitName: '',
        endDate: '',
        submitterName: '',
        status: 'active', // Default status as active
        submittedDate: formatDate(new Date()) // Set to current date
    });

    const handleChange = (event) => {
        setPermit((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8800/permits', permit);
            navigate('/');
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    if (!isAuthenticated) {
        navigate('/'); // Redirect to home if not authenticated
        return null;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                Add new Permit
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
                label="End Date"
                type="date"
                onChange={handleChange}
                name="endDate"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Submitted Date"
                type="date"
                onChange={handleChange}
                name="submittedDate"
                value={permit.submittedDate}
                InputLabelProps={{
                    shrink: true,
                }}
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    name="status"
                    value={permit.status}
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" size="large" onClick={handleClick}>
                    Add
                </Button>
            </Box>
        </Container>
    );
};

export default Add;