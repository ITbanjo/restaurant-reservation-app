import React from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SearchForm({
  setReservations,
  setPhoneNumber,
  phoneNumber,
  setShowList,
  setSearchError,
  searchError,
}) {
  function handleChange(event) {
    setPhoneNumber({
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const list = await listReservations(phoneNumber);
      setReservations(list);
      setShowList(true);
    } catch (error) {
      setSearchError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <ErrorAlert error={searchError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="search">Search</label>
          <input
            id="search"
            value={phoneNumber.mobile_number}
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
