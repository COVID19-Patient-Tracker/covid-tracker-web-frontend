import React, { useState } from "react";
import "./../../components/css/table.css"
import "./../../components/css/forms.css"
import data from "./mock-data -id.json";
import './history';

import { useHistory } from 'react-router-dom';
//import ReadOnlyRow from "./components/ReadOnlyRowMain";

const ReadOnlyRow = ({ newresult, handleEditClick, handleDeleteClick }) => {
  const history = useHistory();
  const handleClick = () => history.push('/hospital/user/currentStatus');
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

const WardTransfer = () => {
  const [results] = useState(data);

  return (
    <div className="create">
    <div className="app-container">
      <h2>Record patient’s current status</h2>
      <form>
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((newresult) => (
              <ReadOnlyRow newresult={newresult}/>
                
            ))}
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
};

export default WardTransfer;
