import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { seatReservationWithTable } from "../utils/api";

function SeatOptions({ tables, reservation, setSeatError }) {
  const [selectedTable, setSelectedTable] = useState(tables[0]);
  const history = useHistory();

  function handleChange(event) {
    setSelectedTable(
      tables.find((table) => table.table_id == event.target.value)
    );
  }

  async function handleSubmit(event) {
    const abortController = new AbortController();
    event.preventDefault();
    setSeatError(null);
    try {
      await seatReservationWithTable(
        selectedTable.table_id,
        {
          reservation_id: reservation.reservation_id,
        },
        abortController.signal
      );
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div className="input-group">
      <select name="table_id" onChange={handleChange} className="custom-select">
        {tables.map((table) => (
          <option value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <div className="input-group-append">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-secondary"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SeatOptions;
