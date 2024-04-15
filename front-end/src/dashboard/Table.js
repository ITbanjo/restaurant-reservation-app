import React from "react";

function Table({ table }) {
  const { table_id, table_name, capacity } = table;
  return (
    <tr>
      <th scope="row">{table_name}</th>
      <td>{capacity}</td>
      <td data-table-id-status={table_id}>Free/Occupied</td>
    </tr>
  );
}

export default Table;
