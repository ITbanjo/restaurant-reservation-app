import React from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import formatPhoneNumber from "../utils/format-phone-number";

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
      [event.target.name]: formatPhoneNumber(event.target.value),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const list = await listReservations(phoneNumber, abortController.signal);
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
          <label for="search">Phone Number</label>
          <div className="d-flex flex-row">
            <button type="submit" className="btn btn-dark mr-2">
              Find
            </button>
            <input
              id="search"
              value={phoneNumber.mobile_number}
              name="mobile_number"
              type="tel"
              maxLength={14}
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
