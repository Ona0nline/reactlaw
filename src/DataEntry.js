// src/components/AddCase.js
import React, { useState } from 'react';
import "./DataEntry.css"

import DataDisplay from './DataDisplay';
import SearchEngine from './SearchEngine';
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
        axios.post('https://case-management-system-flask-35b7ddb675ce.herokuapp.com/add_case', caseData)
            .then(function(response) {
              console.log(response.data)
                alert(response.data.message);

                setCases(function(prevCases) {
                    return [...prevCases, caseData];
                });

                setCaseFile('')
                setCaseNumber('')
                setEmail('')
                setSurname('')
                setName('')
            })
            .catch(function(error) {
                console.error('There was an error!', error);
            });
    }

    // Render the component
    return (
<div>
    <div className="hero">
        <h1 className='head'>Legal Case management system</h1>
        <p>Streamlined case tracking and management system</p>
        </div>

        <div className='capture-container'>
            <div className='scroll'>
<legend><h2>Capture case content:</h2></legend>

        <form className='formCapture'  onSubmit={handleSubmit}>

            <div className='name'>
            <label for="name">Name:</label>
            <input className='textInput'
                type="text" id='name'
                value={name} 
                onChange={function(event) {
                    setName(event.target.value);
                }} 
                placeholder="Franklin" 
                required 
            />
            </div>
           
           <div>
            <label>Surname:</label>
             <input className='textInput'
                type="text" 
                value={surname} 
                onChange={function(event) {
                    setSurname(event.target.value);
                }} 
                placeholder="Saint" 
                required 
            />
           </div>
            
            <div className='email'>
            <label>Email:</label>
            <input className='textInput'
                type="email" 
                value={email} 
                onChange={function(event) {
                    setEmail(event.target.value);
                }} 
                placeholder="saintfrank@gmail.com" 
                required 
            />
            </div>

            <div className='caseNumber'>
            <label className='caseNumberLabel'>Case Number</label>
            <input className='textInput'
                type="text" 
                value={caseNumber} 
                onChange={function(event) {
                    setCaseNumber(event.target.value);
                }} 
                placeholder="LNN-0001" 
                required 
            />
            </div>
            
            
           
            <div className='caseFile'>
            <label>Case file</label>
            <input className='textInput'
                type="text" 
                value={caseFile} 
                onChange={function(event) {
                    setCaseFile(event.target.value);
                }} 
                placeholder="Drug possession" 
                required 
            />
            </div>
            
        <div className='addCaseContainer'>  
            <button className='addCaseButton' type="submit">Add Case</button>
        </div>
            
        </form>
            </div>
        </div>
        
        <br></br>
        <DataDisplay cases={cases}/>
        <SearchEngine/>

        </div>
    );
}

export default AddCase;
