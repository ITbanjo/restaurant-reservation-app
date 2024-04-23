import React, { useState } from "react";
import SearchForm from "./SearchForm";
import Reservation from "../dashboard/Reservation";

function Search() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState({});
  const [showList, setShowList] = useState(false);
  const emptyArray = [];

  function renderReservationList() {
    return reservations.length ? (
      reservations.map((reservation) => (
        <Reservation reservation={reservation} />
      ))
    ) : (
      <h5 className="pt-3">No reservations found</h5>
    );
  }

  return (
    <div>
      <h1 className="mt-3">Search</h1>
      <SearchForm
        setReservations={setReservations}
        reservations={reservations}
        setSearch={setSearch}
        search={search}
        setShowList={setShowList}
      />

      {showList ? (
        reservations.length ? (
          reservations.map((reservation) => (
            <Reservation
              reservation={reservation}
              tables={emptyArray}
              loadDashboard={null}
              isSearch={search}
            />
          ))
        ) : (
          <h5 className="pt-3">No reservations found</h5>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Search;
