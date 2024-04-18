import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateTableWithReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatOptions({ tables, reservation }) {
  //const validTables = tablesCanAccomodatePartySize(tables, reservation.people);
  const [selectedTable, setSelectedTable] = useState(tables[0]);
  const [updateError, setUpdateError] = useState(null);
  const history = useHistory();

  // function tablesCanAccomodatePartySize(tables, partySize) {
  //   const result = [];
  //   for (let i = 0; i < tables.length; i++) {
  //     const table = tables[i];
  //     if (partySize <= table.capacity) {
  //       result.push(table);
  //     }
  //   }
  //   return result;
  // }

  function handleChange(event) {
    setSelectedTable(
      tables.find((table) => table.table_id == event.target.value)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUpdateError(null);
    try {
      await updateTableWithReservation(selectedTable.table_id, {
        reservation_id: reservation.reservation_id,
      });
      history.push(`/dashboard`);
    } catch (error) {
      setUpdateError(error);
      throw error;
    }
  }

  return (
    <div>
      <ErrorAlert error={updateError} />
      <p>"Table Name" - "Capacity"</p>
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <select name="table_id" onChange={handleChange} className="p-1">
          {tables.map((table) => (
            <option value={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-dark btn-sm ml-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SeatOptions;
