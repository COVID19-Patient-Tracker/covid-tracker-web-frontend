import React from "react";

const ReadOnlyRow = ({ newresult}) => {
  return (
    <tr>
      <td>{newresult.NIC}</td>
      <td>{newresult.hospital}</td>
      <td>{newresult.reason}</td>
    </tr>
  );
};

export default ReadOnlyRow;
