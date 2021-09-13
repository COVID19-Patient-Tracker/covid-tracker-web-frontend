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
          name="hospital"
          value={editFormData.hospital}
          onChange={(e) => handleEditFormChange(e.target.value)}>
          <option value="select">--Select the hospital--</option>
          <option value="pcr">District General Hoaspital Nawalapitiya</option> 
          <option value="antigen">National Hospital of Sri Lanka, Colombo</option>
        </select>
      </td>
      <td>
        <input 
          type="text"
          required="required"
          placeholder="Enter reason for transfer"
          name="reason"
          value={editFormData.reason}
          onChange={handleEditFormChange}
        ></input>
      </td>
    </tr>
  );
};

export default EditableRow;
