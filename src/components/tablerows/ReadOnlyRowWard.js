import React from "react";

const ReadOnlyRow = ({ newresult}) => {
  return (
    <tr>
      <td>{newresult.NIC}</td>
      <td>{newresult.ward}</td>
    </tr>
  );
};

export default ReadOnlyRow;
