import React, { useState } from "react";
import "./../../components/css/table.css"
import "./../../components/css/forms.css"
import data from "./mock-data -id.json";
import './history';
import {Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ReadOnlyRow = ({ newresult}) => {
  const history = useHistory();
  const handleClick = () => history.push('/hospital/user/testResult');
  return (
    <tr>
      <td>{newresult.NIC}</td>
      <td>
        <button
          style={{width:"70px",height:"35px"}}
          type="button"
          onClick={handleClick}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const TestResult = () => {
  const [results] = useState(data);
  const [search, setSearch] = useState('');
  
  const filterID = results.filter(id => {
    return id.NIC.toLowerCase().includes( search.toLowerCase())
  });
  return (
    <div className="create" style={{ margin:"150px auto"}}>
    <Card variant="outlined" >
    <div className="app-container">
      <h2>Record PCR antigen test results</h2>
      <input type="text" placeholder="Search..." onChange={ e => setSearch(e.target.value)}/>

      <form>
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterID.map((newresult) => (
              <ReadOnlyRow newresult={newresult}/>
                
            ))}
          </tbody>
        </table>
      </form>
    </div>
    </Card>
    </div>
  );
};

export default TestResult;
