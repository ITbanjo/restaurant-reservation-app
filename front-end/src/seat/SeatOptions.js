import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { seatReservationWithTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatOptions({ tables, reservation, setSeatError }) {
  const [selectedTable, setSelectedTable] = useState(tables[0]);
  //const [seatError, setSeatError] = useState(null);
  const history = useHistory();

  function handleChange(event) {
    setSelectedTable(
      tables.find((table) => table.table_id == event.target.value)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSeatError(null);
    try {
      await seatReservationWithTable(selectedTable.table_id, {
        reservation_id: reservation.reservation_id,
      });
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
  }

  return (
    <div>
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
