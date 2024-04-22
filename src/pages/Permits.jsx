import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook

const Permits = () => {
    const [permits, setPermits] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0(); // Destructure isAuthenticated from useAuth0

    useEffect(() => {
        fetchPermits();
    }, []);

    const fetchPermits = () => {
        axios.get('http://localhost:8800/permits')
            .then(response => {
                setPermits(response.data);
            })
            .catch(error => console.error('Error fetching permits:', error));
    };

    const deletePermit = (permitId) => {
        axios.delete(`http://localhost:8800/permits/${permitId}`)
            .then(() => {
                fetchPermits(); // Refresh the list after deletion
            })
            .catch(error => {
                alert('Failed to delete permit');
                console.error('Error deleting permit:', error);
            });
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h4" sx={{ margin: 2 }}>Permit Dashboard</Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Permit ID</TableCell>
                            <TableCell>Permit Name</TableCell>
                            <TableCell>Submitter Name</TableCell>
                            <TableCell>Submitted Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permits.map((permit) => (
                            <TableRow key={permit.permitId}>
                                <TableCell>{permit.permitId}</TableCell>
                                <TableCell>{permit.permitName}</TableCell>
                                <TableCell>{permit.submitterName}</TableCell>
                                <TableCell>{permit.submittedDate}</TableCell>
                                <TableCell>{permit.endDate}</TableCell>
                                <TableCell>{permit.status}</TableCell>
                                <TableCell>
                                    {isAuthenticated && (
                                        <>
                                            <Button color="primary" onClick={() => navigate(`/update/${permit.permitId}`)}>
                                                Update
                                            </Button>
                                            &nbsp;{/* Space between buttons */}
                                            <Button color="secondary" onClick={() => deletePermit(permit.permitId)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isAuthenticated && (
                <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={() => navigate('/add')}>
                    Add Permit
                </Button>
            )}
        </Paper>
    );
};

export default Permits;
