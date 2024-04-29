import React, { useState } from "react";
import SearchForm from "./SearchForm";
import Reservation from "../dashboard/Reservation";

function Search({ reservations, setReservations }) {
  const [phoneNumber, setPhoneNumber] = useState({});
  const [showList, setShowList] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const emptyArray = [];

  function renderReservationList() {
    return reservations.length ? (
      reservations.map((reservation) => (
        <Reservation
          reservation={reservation}
          tables={emptyArray}
          phoneNumber={phoneNumber}
          setReservations={setReservations}
        />
      ))
    ) : (
      <h5 className="pt-3">No reservations found</h5>
    );
  }

  return (
    <div className="col-md-6">
      <h3 className="mt-3">Search</h3>
      <SearchForm
        setReservations={setReservations}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        setShowList={setShowList}
        setSearchError={setSearchError}
        searchError={searchError}
      />

      {showList ? renderReservationList() : ""}
    </div>
  );
}

export default Search;
