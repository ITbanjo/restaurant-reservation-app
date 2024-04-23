import React from "react";
import Reservation from "./Reservation";

function ReservationList({
  reservations,
  date,
  setReservations,
  setReservationsError,
  tables,
  loadDashboard,
}) {
  return reservations.length ? (
    reservations.map((reservation) => (
      <Reservation
        reservation={reservation}
        tables={tables}
        loadDashboard={loadDashboard}
      />
    ))
  ) : (
    <h5 className="pt-3">No reservations found for this date</h5>
  );
}

export default ReservationList;
