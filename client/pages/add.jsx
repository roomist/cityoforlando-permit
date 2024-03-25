import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const[permit, setPermit] = useState({
        permitName: '',
        endDate: '',
        submitter: '',
        status: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setPermit((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8800/permits', permit);
            navigate('/');
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    return (
        <div className='form'>
            <h1>Add new Permit</h1>
            <input type="text" placeholder="Permit Name" onChange={handleChange} name="permitName" />
            <input type="text" placeholder="end date" onChange={handleChange} name="endDate"/>
            <input type="text" placeholder="submitter" onChange={handleChange} name="submitter"/>
            <input type="text" placeholder="status" onChange={handleChange} name="status"/>

           <button className='formButton' onClick={handleClick}>Add</button>
        </div>
    )
};

export default Add
