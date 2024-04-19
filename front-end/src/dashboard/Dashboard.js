import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import TableList from "./TableList";
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
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();
  const dashboardDate = new Date(date).toLocaleDateString("en-us", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    //Load Reservations
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(
        history.push({
          pathname: "/dashboard",
          search: `?date=${date}`,
        })
      )
      .catch(setReservationsError);
    //Load Tables
    listTables(abortController.signal).then(setTables).catch(setTablesError);
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
      <h1 className="mt-3">Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dashboardDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />

      <div className="mb-2 ">
        <button
          className="btn btn-dark mr-2"
          onClick={handleClick}
          id="previous"
        >
          Previous Day
        </button>
        <button className="btn btn-dark" onClick={handleClick} id="next">
          Next Day
        </button>
        <div className="float-right">
          <button className="btn btn-dark" onClick={handleClick} id="today">
            Today
          </button>
        </div>
      </div>
      <div className="d-md-flex justify-content-between">
        <div className="w-100 mr-1">
          <ReservationList
            reservations={reservations}
            tables={tables}
            loadDashboard={loadDashboard}
          />
        </div>
        <div className="w-100">
          <TableList tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
