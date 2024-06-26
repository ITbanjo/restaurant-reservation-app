import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import CreateReservation from "../reservations/edit-new/CreateReservation";
import CreateTable from "../tables/new/CreateTable";
import SeatReservation from "../seat/SeatReservation";
import Search from "../search/Search";
import EditReservation from "../reservations/edit-new/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  const [reservations, setReservations] = useState([]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date || today()}
          reservations={reservations}
          setReservations={setReservations}
        />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation setReservations={setReservations} />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/search">
        <Search reservations={reservations} setReservations={setReservations} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
