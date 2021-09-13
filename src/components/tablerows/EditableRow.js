import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
}) => {
  return (
    <tr>
      <td>
        <input 
          type="text"
          required="required"
          placeholder="Enter NIC"
          name="NIC"
          value={editFormData.NIC}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <select
          required="required"
          name="testtype"
          value={editFormData.testtype}
          onChange={handleEditFormChange}>
          <option value="select">--Enter test type--</option>
          <option value="PCR">PCR</option> 
          <option value="Antigen">Antigen</option>
        </select>
      </td>
      <td>
        <select
          required="required"
          name="result"
          value={editFormData.result}
          onChange={handleEditFormChange}>
          <option value="select">--Enter result--</option>
          <option value="Pending">Pending</option>
          <option value="Positive">Positive</option> 
          <option value="Negative">Negative</option>
        </select>
      </td>
      <td>
        <button style={{width:"70px",height:"35px"}} type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;
