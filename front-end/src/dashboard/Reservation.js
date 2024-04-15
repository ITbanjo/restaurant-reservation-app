import React from "react";

function Reservation({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
  } = reservation;

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
        <a href={`/reservations/${reservation_id}/seat`}>
          <button className="btn btn-success btn-lg">Seat</button>
        </a>
      </div>
    </div>
  );
}

export default Reservation;
