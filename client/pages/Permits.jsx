import axios from 'axios';
import React, { useEffect } from 'react';

const Permits = () => {

    const [permits, setPermits] = React.useState([]);

    useEffect(() => {

        const fetchAllPermits = async () => {
            try{
                const response = await axios.get('http://localhost:8800/permits');
                setPermits(response.data);
            } catch(error) {
                alert(error.message);
                console.log(error);
            }
        }
        fetchAllPermits()
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/permits/${id}`);
            window.location.reload();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <div>
             <h1>City of Orlando Permits</h1>
             <div className='permits'>
                {permits.map((permit) => (
                    <div className='permit' key={permit.dbid}>
                        <h2>{permit.permitName}</h2>
                        <p>{permit.endDate}</p>
                        <p>{permit.submitter}</p>
                        <span>{permit.status}</span> 
                        <button className="delete" onClick={() => handleDelete(permit.dbid)}>Delete</button>
                        <button className="update"><Link to={`/update/${permit.dbid}`}>Update</Link></button>
                    </div>
                ))}
             </div>
        </div>
    );
};

export default Permits;
