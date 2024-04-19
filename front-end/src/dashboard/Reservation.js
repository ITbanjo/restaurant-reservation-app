import React from "react";
import { listReservations, deleteTableReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

function Reservation({
  reservation,
  date,
  setReservations,
  setReservationsError,
  tables,
}) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
  } = reservation;
  const history = useHistory();
  const table = tables.find((table) => table.reservation_id === reservation_id);

  function timeFormatter(time) {
    const hours = time.substr(0, 2);
    const minutes = time.substr(3, 2);
    if (hours < 12) {
      return `${hours}:${minutes} AM`;
    }
    if (hours == 12) {
      return `${hours}:${minutes} PM`;
    }
    return `${Number(hours) - 12}:${minutes} PM`;
  }

  async function modal() {
    const abortController = new AbortController();
    try {
      const modalMsg = `Is this table ready to seat new guests? This cannot be undone.`;
      const result = window.confirm(modalMsg);
      if (result) {
        await deleteTableReservation(table.table_id);
        listReservations({ date }, abortController.signal)
          .then(setReservations)
          .then(
            history.push({
              pathname: "/dashboard",
              search: `?date=${date}`,
            })
          )
          .catch(setReservationsError);
        return () => abortController.abort();
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="card rounded-0" key={reservation_id}>
      <div className="card-body">
        <h4 className="card-title font-weight-bold">
          {timeFormatter(reservation_time)}
        </h4>
        <p>
          Name:{" "}
          <span className="font-weight-bold">
            {last_name}, {first_name}
          </span>
        </p>
        <p>
          Phone: <span className="font-weight-bold">{mobile_number}</span>
        </p>
        <p>
          Party Size: <span className="font-weight-bold">{people}</span>
        </p>
        {table ? (
          <button
            className="btn btn-danger btn-lg"
            onClick={modal}
            data-table-id-finish={table.table_id}
          >
            Finish
          </button>
        ) : (
          <a href={`/reservations/${reservation_id}/seat`}>
            <button className="btn btn-success btn-lg">Seat</button>
          </a>
        )}
      </div>
    </div>
  );
}

export default Reservation;
