import React, {useState} from "react"
import "./SearchEngine.css"
import axios from "axios";

export default function SearchEngine(){
  const[searchQuery, setSearchQuery] = useState("")
  const[casesFound, setCasesFound] = useState([])

  function handleSubmit(event){
    // ALWAYS MAKE THE API REQUEST ON FORM SUBMIT
    event.preventDefault();
    if(casesFound){
      alert("Case/Cases Found")
    }else{
      alert("Case not found")
    }
    handleSearch()
  }

  function handleResponse(response){
    console.log(response)
    setCasesFound(response.data)
    // Clears input VALUE (which is searchQuery) after response is recieved
    setSearchQuery('')
  }

  function handleInputChange(event){
    setSearchQuery(event.target.value)
  }

  // FUNCTION TO MAKE THE API CALL, CALLED UPON SUBMIT
  function handleSearch(){
    axios.get('http://localhost:5000/search_case',{params:{case_file:searchQuery}})
    .then(handleResponse)
    .catch((error)=>{
      console.log("Error: ",error)
    })

  }

  return (<div>
    <form onSubmit={handleSubmit}>
      <legend>Search for a Case File:</legend>
      {/* ensures that the input value is always tied to the search query state */}
      <input onChange={handleInputChange} value={searchQuery} type="search" placeholder="Eg. Arson"/>
      <input type="submit" value="Submit"/>

    </form>
    {/* && is for conditional rendering in javascript */}
 {casesFound.length > 0 && (
        <div>
          <h1>Cases Found:</h1>
          <ul>
            {casesFound.map(function (caseFound, index) {
              return (
                <div key={index}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Case</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{caseFound.case_file}</td>
                        <td>{caseFound.name}</td>
                        <td>{caseFound.surname}</td>
                        <td>{caseFound.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </ul>
        </div>
      )}
  </div>)
}