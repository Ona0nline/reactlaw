import React from "react";

export default function DataDisplay(props){
  return (<div>
    {props.cases.length > 0 && 
    <table>
      <thead>
        <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Case Number</th>
                        <th>Case File</th>
                    </tr>
      </thead>
      <tbody>
        {props.cases.map(function(caseItem,index){
          return <tr key={index}>
            <td>{caseItem.name}</td>
            <td>{caseItem.surname}</td>
            <td>{caseItem.email}</td>
            <td>{caseItem.case_number}</td>
            <td>{caseItem.case_file}</td>

          </tr>
        })}
      </tbody>
    </table>
    
    }
    
  </div>)
}