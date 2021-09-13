import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import '../../../../components/css/table.css';
import data from "./mock-data.json";
import ReadOnlyRow from "../../../../components/tablerows/ReadOnlyRow";
import EditableRow from "../../../../components/tablerows/EditableRow";

const TestResult = () => {
  const [results, setresults] = useState(data);
  const [addFormData, setAddFormData] = useState({
    NIC: "",
    testtype: "",
    result: "",
  });

  const [editFormData, setEditFormData] = useState({
    NIC: "",
    testtype: "",
    result: "",
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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newnewresult = {
      id: nanoid(),
      NIC: addFormData.NIC,
      testtype: addFormData.testtype,
      result: addFormData.result,
    };

    const newresults = [...results, newnewresult];
    setresults(newresults);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editednewresult = {
      id: editnewresultId,
      NIC: editFormData.NIC,
      testtype: editFormData.testtype,
      result: editFormData.result,
    };

    const newresults = [...results];

    const index = results.findIndex((newresult) => newresult.id === editnewresultId);

    newresults[index] = editednewresult;

    setresults(newresults);
    setEditnewresultId(null);
  };

  const handleEditClick = (event, newresult) => {
    event.preventDefault();
    setEditnewresultId(newresult.id);

    const formValues = {
      NIC: newresult.NIC,
      testtype: newresult.testtype,
      result: newresult.result,
    };

    setEditFormData(formValues);
  };

  return (
    <div className="app-container">
      <h2>Record PCR & antigen test results</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Test Type</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((newresult) => (
              <Fragment>
                {editnewresultId === newresult.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow
                    newresult={newresult}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h3>Add a record</h3>
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
          name="testtype"
          onChange={handleAddFormChange}>
          <option value="select">--Enter test type--</option>
          <option value="PCR">PCR</option> 
          <option value="Antigen">Antigen</option>
        </select>
        <select
          required="required"
          name="result"
          onChange={handleAddFormChange}>
          <option value="select">--Enter result--</option>
          <option value="Pending">Pending</option>
          <option value="Positive">Positive</option> 
          <option value="Negative">Negative</option>
        </select>
                <button style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}>Add</button>

        <hr className="hr" />
         {/* <button style={{width:"200px",height:"35px", marginTop:"10px"}}>Update</button> */}
      </form>
    </div>
  );
};

export default TestResult;
