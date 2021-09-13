import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import "../../../../components/css/table.css"
import data from "./mock-data-hos.json";
import ReadOnlyRow from "../../../../components/tablerows/ReadOnlyRowHos";
import EditableRow from "../../../../components/tablerows/EditableRowHos";

const HospitalTransfer = () => {
  const [results, setresults] = useState(data);
  const [addFormData, setAddFormData] = useState({
    NIC: "",
    hospital: "",
    reason: "",
  });

  const [editFormData, setEditFormData] = useState({
    NIC: "",
    hospital: "",
    reason: "",
  });
const [editnewresultId, setEditnewresultId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newnewresult = {
      id: nanoid(),
      NIC: addFormData.NIC,
      hospital: addFormData.hospital,
      reason: addFormData.reason,
    };

    const newresults = [...results, newnewresult];
    setresults(newresults);
  };

const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editednewresult = {
      id: editnewresultId,
      NIC: editFormData.NIC,
      hospital: editFormData.hospital,
      reason: editFormData.reason,
    };
    const newresults = [...results];

    const index = results.findIndex((newresult) => newresult.id === editnewresultId);

    newresults[index] = editednewresult;

    setresults(newresults);
    setEditnewresultId(null);
  };


  return (
    <div className="app-container">
      <h2>Update patient hospital transfer</h2>
      <h3>Transfer history</h3>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Hospital</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {results.map((newresult) => (
              <Fragment>
                {editnewresultId === newresult.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    
                  />
                ) : (
                  <ReadOnlyRow newresult={newresult}/>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h3>Transfer</h3>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="NIC"
          required="required"
          placeholder="Enter NIC"
          onChange={handleAddFormChange}
        />
        <select
          required="required"
          name="hospital"
          onChange={handleAddFormChange}>
          <option value="select">--Select the hospital--</option>
          <option value="District General Hoaspital Nawalapitiya">District General Hoaspital Nawalapitiya</option> 
          <option value="National Hospital of Sri Lanka, Colombo">National Hospital of Sri Lanka, Colombo</option>
        </select>

        <input
          type="text"
          name="reason"
          required="required"
          placeholder="Enter reason for transfer"
          onChange={handleAddFormChange}
        />
        <button style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}>Transfer</button>

        <hr className="hr" />
      </form>
    </div>
  );
};

export default HospitalTransfer;
