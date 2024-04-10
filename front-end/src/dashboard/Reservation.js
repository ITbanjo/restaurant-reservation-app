import React from "react";

function Reservation({ reservation }) {
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

  return (
    <div className="card" key={reservation.reservation_id}>
      <div className="card-body">
        <h4 className="card-title font-weight-bold">
          {timeFormatter(reservation.reservation_time)}
        </h4>
        <p>
          Name:{" "}
          <span className="font-weight-bold">
            {reservation.last_name}, {reservation.first_name}
          </span>
        </p>
        <p>
          Phone:{" "}
          <span className="font-weight-bold">{reservation.mobile_number}</span>
        </p>
        <p>
          Party Size:{" "}
          <span className="font-weight-bold">{reservation.people}</span>
        </p>
      </div>
    </div>
  );
}

export default Reservation;
