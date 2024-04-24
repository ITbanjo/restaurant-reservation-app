import React, { useState } from "react";
import { listReservations } from "../utils/api";

function SearchForm({
  setReservations,
  reservations,
  setSearch,
  search,
  setShowList,
}) {
  function handleChange(event) {
    setSearch({
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    console.log(search);
    try {
      listReservations(search).then(setReservations);
      setShowList(true);
    } catch (error) {
      throw error;
    }
    return () => abortController.abort();
  }

  return (
    <div>
      {/* <ErrorAlert error={newTableError} /> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="search">Search</label>
          <input
            id="search"
            value={search.mobile_number}
            name="mobile_number"
            type="tel"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Find
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
