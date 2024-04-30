import React from "react";
import { finishReservation } from "../utils/api";

function Table({ table, setTablesError, loadDashboard }) {
  const { table_id, table_name, capacity, reservation_id } = table;

  async function modalFinish() {
    const abortController = new AbortController();
    try {
      const modalMsg = `Is this table ready to seat new guests? This cannot be undone.`;
      const result = window.confirm(modalMsg);
      if (result) {
        await finishReservation(table.table_id, abortController.signal);
        await loadDashboard();
      }
    } catch (error) {
      setTablesError(error);
    }
    return () => abortController.abort();
  }

  function finishButton() {
    if (reservation_id) {
      return (
        <button
          className="btn btn-danger btn-block"
          onClick={modalFinish}
          data-table-id-finish={table.table_id}
        >
          Finish
        </button>
      );
    }
  }

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
      <td>{finishButton()}</td>
    </tr>
  );
}

export default Table;
