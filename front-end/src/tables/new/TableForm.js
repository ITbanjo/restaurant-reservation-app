import React, { useState } from "react";
import { createTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function TableForm({ emptyTableData, newTable, setNewTable }) {
  const history = useHistory();

  function handleChange(event) {
    setNewTable({
      ...newTable,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createTable(newTable);
      setNewTable(emptyTableData);
      history.push(`/dashboard`);
    } catch (error) {
      // display both past-date and Tuesday errors at once if necesarry
      //handleDateErrors(newReservation.reservation_date, error);
      throw error;
    }
  }

  function handleCancel() {
    setNewTable(emptyTableData);
    history.goBack();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="table_name">Table Name</label>
          <input
            id="table_name"
            value={newTable.table_name}
            name="table_name"
            placeholder="Table Name"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="capacity">Capacity</label>
          <input
            id="capacity"
            value={newTable.capacity}
            name="capacity"
            placeholder="capacity"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <button onClick={handleCancel} className="btn btn-secondary mr-1">
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TableForm;
