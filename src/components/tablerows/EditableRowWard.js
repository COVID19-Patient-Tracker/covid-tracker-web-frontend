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
          name="ward"
          value={editFormData.ward}
          onChange={(e) => handleEditFormChange(e.target.value)}>
          <option value="select">--Select the hospital--</option>
          <option value="1">1</option> 
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
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
