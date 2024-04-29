import React from "react";

function Table({ table }) {
  const { table_id, table_name, capacity, reservation_id } = table;
  return (
    <tr>
      <th scope="row">{table_name}</th>
      <td>{capacity}</td>
      <td data-table-id-status={table_id}>
        {reservation_id ? (
          <span className="text-danger">Occupied</span>
        ) : (
          "Free"
        )}
      </td>
    </tr>
  );
}

export default Table;
