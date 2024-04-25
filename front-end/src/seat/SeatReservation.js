import React, { useState, useEffect } from "react";
import SeatOptions from "./SeatOptions";
import { useParams } from "react-router-dom";
import { getReservationByReservationId, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  //const [seatReservationError, setSeatReservationError] = useState(null);
  const [seatError, setSeatError] = useState(null);

  useEffect(loadSeatReservation, []);

  async function loadSeatReservation() {
    const abortController = new AbortController();
    setSeatError(null);
    try {
      //Load Tables
      setTables(await listTables(abortController.signal));

      //Load Reservation
      setReservation(
        await getReservationByReservationId(
          reservation_id,
          abortController.signal
        )
      );
    } catch (error) {
      setSeatError(error);
    }

    return () => abortController.abort();
  }

  if (tables.length) {
    return (
      <>
        <h1 className="mt-3">Seat Reservation</h1>
        <ErrorAlert error={seatError} />
        <div>
          <SeatOptions
            tables={tables}
            reservation={reservation}
            setSeatError={setSeatError}
          />
        </div>
      </>
    );
  } else {
    return <h4>Loading...</h4>;
  }
}

export default SeatReservation;
