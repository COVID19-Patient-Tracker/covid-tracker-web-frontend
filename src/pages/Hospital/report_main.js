import React, { useState } from "react";
import "./../../components/css/table.css"
import "./../../components/css/forms.css"
import {Card } from '@material-ui/core';

import data from "./mock-data -id.json";
import './history';

import { useHistory } from 'react-router-dom';
//import ReadOnlyRow from "./components/ReadOnlyRowMain";

const ReadOnlyRow = ({ newresult}) => {
  const history = useHistory();
  const handleClick = () => history.push('/hospital/user/admitReport');
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

const MainReport = () => {
  const [results] = useState(data);
  const [search, setSearch] = useState('');
  

  const filterID = results.filter(id => {
    return id.NIC.toLowerCase().includes( search.toLowerCase())
  });

  return (
    <div className="create" style={{ margin:"150px auto"}}>
    <Card variant="outlined" >
    <div className="app-container">
      <h2>Update admitted patient details</h2>
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

export default MainReport;
