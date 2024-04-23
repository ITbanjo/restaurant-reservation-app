import React, { useState } from "react";

function SearchForm() {
  const [search, setSearch] = useState({});

  function handleChange(event) {
    setSearch({
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
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
            name="search"
            type="number"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
