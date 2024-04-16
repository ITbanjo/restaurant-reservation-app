import React, { useState, useEffect } from "react";
import SeatOptions from "./SeatOptions";
import { useParams, useHistory } from "react-router-dom";
import { getReservationByReservationId, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const [seatReservationError, setSeatReservationError] = useState(null);
  const [seatTablesError, setSeatTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadSeatReservation, []);

  async function loadSeatReservation() {
    const abortController = new AbortController();
    setSeatReservationError(null);
    setSeatTablesError(null);
    // try {
    //   setTables(await listTables(abortController.signal));
    //   setReservation(
    //     await getReservationByReservationId(
    //       reservation_id,
    //       abortController.signal
    //     )
    //   );
    // } catch (error) {
    //   setSeatReservationError(error);
    // }
    //Load Tables

    listTables(abortController.signal)
      .then(setTables)
      .catch(setSeatTablesError);

    //Load Reservation
    getReservationByReservationId(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setSeatReservationError);

    return () => abortController.abort();
  }

  if (tables.length) {
    return (
      <>
        <h1 className="mt-3">Seat Reservation</h1>
        <ErrorAlert error={seatReservationError} />
        <ErrorAlert error={seatTablesError} />
        <div>
          <SeatOptions tables={tables} reservation={reservation} />
        </div>
      </>
    );
  } else {
    return <h4>Loading...</h4>;
  }
}

export default SeatReservation;
