import React from "react";
import {
  updateReservationStatus,
  finishReservation,
  listReservations,
} from "../utils/api";

function Reservation({
  reservation,
  tables,
  loadDashboard,
  phoneNumber,
  setReservations,
  setReservationsError,
  date,
}) {
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

  const table = tables.find((table) => table.reservation_id === reservation_id); // Stores table that reservation is seated at
  const formattedDate = new Date(reservation_date).toLocaleDateString("en-us", {
    timeZone: "UTC",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // Formats the reservation_date for the dashboard view

  // takes time in 24hr format and outputs 12hr - HH:MM
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
      setReservationsError(error);
    }
    return () => abortController.abort();
  }

  async function modalCancel() {
    const abortController = new AbortController();
    try {
      const modalMsg = `Do you want to cancel this reservation? This cannot be undone.`;
      const result = window.confirm(modalMsg);
      if (result) {
        await updateReservationStatus(reservation_id, { status: "cancelled" });
        const list = await listReservations(
          date ? { date } : phoneNumber, //If cancelled from /dashboard, list reservations by date, else list by phoneNumber for /search
          abortController.signal
        );
        setReservations(list);
      }
    } catch (error) {
      console.log(error.message);
      setReservationsError(error);
    }
    return () => abortController.abort();
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
    if (status === "cancelled") {
      return <span className="text-secondary">Cancelled</span>;
    }
  }

  function displayButton() {
    return table ? ( // If reservation is seated, display finish button - (if reservation_id is found to be associated with a table)
      <button
        className="btn btn-danger mr-2"
        onClick={modalFinish}
        data-table-id-finish={table.table_id}
      >
        Finish
      </button>
    ) : (
      <a href={`/reservations/${reservation_id}/seat`}>
        <button className="btn btn-success mr-2">Seat</button>
      </a>
    );
  }

  function cancelButton() {
    if (status === "booked") {
      return (
        <button
          className="btn btn-dark"
          data-reservation-id-cancel={reservation_id}
          onClick={modalCancel}
        >
          Cancel
        </button>
      );
    }
  }

  return (
    <div className="card rounded-0" key={reservation_id}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title font-weight-bold">
            {timeFormatter(reservation_time)}
          </h4>
          <h4
            className="card-title font-weight-bold"
            data-reservation-id-status={reservation_id}
          >
            {displayStatus()}
          </h4>
        </div>
        {phoneNumber && (
          <p>
            Date: <span className="font-weight-bold">{formattedDate}</span>
          </p>
        )}
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
        <div>
          {phoneNumber ? "" : displayButton()}
          <a href={`/reservations/${reservation_id}/edit`}>
            <button className="btn btn-dark mr-2">Edit</button>
          </a>
          {cancelButton()}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
