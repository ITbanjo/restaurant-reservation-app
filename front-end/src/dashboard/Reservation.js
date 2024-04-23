import React from "react";
import { updateReservationStatus, finishReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

function Reservation({ reservation, tables, loadDashboard, isSearch }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
    status,
  } = reservation;

  const table = tables.find((table) => table.reservation_id === reservation_id);
  const formattedDate = new Date(reservation_date).toLocaleDateString("en-us", {
    timeZone: "UTC",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
    try {
      const modalMsg = `Is this table ready to seat new guests? This cannot be undone.`;
      const result = window.confirm(modalMsg);
      if (result) {
        await finishReservation(table.table_id);
        await loadDashboard();
      }
    } catch (error) {
      throw error;
    }
  }

  function displayStatus() {
    if (status === "booked") {
      return <span className="text-success">Booked</span>;
    }
    if (status === "seated") {
      return <span className="text-danger">Seated</span>;
    }
    if (status === "finished") {
      return <span className="text-secondary">Finished</span>;
    }
  }

  function displayButton() {
    return table ? ( //if reservation_id is associated with a table, display finish button --- This method make sure frontend test 5 passes
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
    );
  }

  return (
    <div className="card rounded-0" key={reservation_id}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title font-weight-bold">
            {isSearch
              ? `${timeFormatter(reservation_time)} - ${formattedDate}`
              : timeFormatter(reservation_time)}
          </h4>
          <h4
            className="card-title font-weight-bold"
            data-reservation-id-status={reservation_id}
          >
            {displayStatus()}
          </h4>
        </div>
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
        {isSearch ? "" : displayButton()}
      </div>
    </div>
  );
}

export default Reservation;
