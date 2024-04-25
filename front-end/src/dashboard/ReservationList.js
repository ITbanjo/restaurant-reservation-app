import React from "react";
import Reservation from "./Reservation";

function ReservationList({
  reservations,
  setReservations,
  setReservationsError,
  tables,
  loadDashboard,
  date,
}) {
  return reservations.length ? (
    reservations.map((reservation) => (
      <Reservation
        reservation={reservation}
        tables={tables}
        loadDashboard={loadDashboard}
        setReservations={setReservations}
        setReservationsError={setReservationsError}
        date={date}
      />
    ))
  ) : (
    <h5 className="pt-3">No reservations found for this date</h5>
  );
}

export default ReservationList;
