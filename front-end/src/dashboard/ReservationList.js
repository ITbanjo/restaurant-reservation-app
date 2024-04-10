import React from "react";
import Reservation from "./Reservation";

function ReservationList({ reservations }) {
  return (
    <div>
      {reservations.map((reservation) => (
        <Reservation reservation={reservation} />
      ))}
    </div>
  );
}

export default ReservationList;
