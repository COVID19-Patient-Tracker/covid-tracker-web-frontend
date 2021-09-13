import React from "react";

const ReadOnlyRow = ({ newresult, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{newresult.NIC}</td>
      <td>{newresult.testtype}</td>
      <td>{newresult.result}</td>
      <td>
        <button
          style={{width:"70px",height:"35px"}}
          type="button"
          onClick={(event) => handleEditClick(event, newresult)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
