import React from "react";
import './../history';

import { useHistory } from 'react-router-dom';

const ReadOnlyRow = ({ newresult, handleEditClick, handleDeleteClick }) => {
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

export default ReadOnlyRow;
