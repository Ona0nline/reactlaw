// src/components/AddCase.js
import React, { useState } from 'react';
import DataDisplay from './DataDisplay';
import axios from 'axios';

function AddCase() {
    // State declarations
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [caseNumber, setCaseNumber] = useState('');
    const [caseFile, setCaseFile] = useState('');
    const [cases, setCases] = useState([]);
    

    // Event handler for form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Create an object to send with the request
        const caseData = {
            name: name,
            surname: surname,
            email:email,
            case_number: caseNumber,
            case_file: caseFile
    
        };

        // Send POST request
        axios.post('http://localhost:5000/add_case', caseData)
            .then(function(response) {
              console.log(response.data)
                alert(response.data.message);

                setCases(function(prevCases) {
                    return [...prevCases, caseData];
                });
            })
            .catch(function(error) {
                console.error('There was an error!', error);
            });
    }

    // Render the component
    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={function(event) {
                    setName(event.target.value);
                }} 
                placeholder="Name" 
                required 
            />

             <input 
                type="text" 
                value={surname} 
                onChange={function(event) {
                    setSurname(event.target.value);
                }} 
                placeholder="Surname" 
                required 
            />

            <input 
                type="email" 
                value={email} 
                onChange={function(event) {
                    setEmail(event.target.value);
                }} 
                placeholder="Email" 
                required 
            />

            <input 
                type="text" 
                value={caseNumber} 
                onChange={function(event) {
                    setCaseNumber(event.target.value);
                }} 
                placeholder="Case Number" 
                required 
            />
            <input 
                type="text" 
                value={caseFile} 
                onChange={function(event) {
                    setCaseFile(event.target.value);
                }} 
                placeholder="Case File" 
                required 
            />
            <button type="submit">Add Case</button>
        </form>
        <DataDisplay cases={cases}/>
        </div>
    );
}

export default AddCase;
