import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import { next, previous, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleClick(event) {
    switch (event.target.id) {
      case "next":
        history.push({
          pathname: "/dashboard",
          search: `?date=${next(date)}`,
        });
        break;
      case "previous":
        history.push({
          pathname: "/dashboard",
          search: `?date=${previous(date)}`,
        });
        break;
      case "today":
        history.push({
          pathname: "/dashboard",
          search: `?date=${today()}`,
        });
        break;
    }
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />

      <button onClick={handleClick} id="previous">
        Previous Day
      </button>
      <button onClick={handleClick} id="today">
        Today
      </button>
      <button onClick={handleClick} id="next">
        Next Day
      </button>

      <ReservationList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
