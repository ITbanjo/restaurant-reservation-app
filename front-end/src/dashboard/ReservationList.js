import React from "react";
import Reservation from "./Reservation";

function ReservationList({ reservations }) {
  return reservations.length ? (
    reservations.map((reservation) => <Reservation reservation={reservation} />)
  ) : (
    <h5 className="pt-3">There are no reservations set for this date.</h5>
  );
}

export default ReservationList;
