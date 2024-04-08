import React, { useEffect, useState } from "react";

function Reservation({ reservation }) {
  return (
    <div
      className="card"
      style={{ width: "100%" }}
      key={reservation.reservation_id}
    >
      <div className="card-body">
        {reservation.reservation_date}
        {reservation.first_name}
      </div>
    </div>
  );
}

export default Reservation;
