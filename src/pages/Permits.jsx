import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Permits = () => {

    const [permits, setPermits] = React.useState([]);

    useEffect(() => {

        const fetchAllPermits = async () => {
            try{
                const response = await axios.get('http://localhost:8800/Permits');
                setPermits(response.data);
            } catch(error) {
                alert(error.message);
                console.log(error);
            }
        }
        fetchAllPermits()
    }, []);

    const handleDelete = async (permitId) => {
        try {
            await axios.delete('http://localhost:8800/permits/'+permitId);
            window.location.reload();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <div>
            <section className="hero-section">
            <img className="city-logo" src="https://www.orlando.gov/files/sharedassets/public/v/2/documents/assets-official/cityoforlando_horizontal_logo_official.png" alt="City of Orlando Logo" />
           
            <div className="hero-text"> 
            
            <h1>City of Orlando Permits</h1>
            <p>Apply for permits quickly and easily online.</p>
            <div className='permits'>
                {permits.map((permit) => (
                    <div className='permit' key={permit.permitId}>
                        <h2>{permit.permitName}</h2>
                        <p>{permit.type}</p>
                        <p>{new Date(permit.startDate).toLocaleDateString()}</p>
                        <p>{new Date(permit.endDate).toLocaleDateString()}</p>
                        <p>{permit.submitterName}</p>
                        <p>{permit.status}</p> 
                        <button className="delete" onClick={() => handleDelete(permit.permitId)}>Delete</button>
                        <button className="update"><Link to={`/update/${permit.permitId}`}>Update</Link></button>
                    </div>
                    
                ))}
            </div>
            <br />
            <br />
            <button className="add-permit-button"><Link to="/add">Add Permit</Link></button>
            </div>
            </section>
        </div>
    );
};

export default Permits;