import React, { useState } from "react";
import { createTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function TableForm({ emptyTableData, newTable, setNewTable }) {
  const [newTableError, setNewTableError] = useState(null);
  const history = useHistory();

  function handleChange(event) {
    if (event.target.name === "capacity") {
      setNewTable({
        ...newTable,
        [event.target.name]: Number(event.target.value), // Set capacity to save as int
      });
    } else {
      setNewTable({
        ...newTable,
        [event.target.name]: event.target.value,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setNewTableError(null);
    try {
      await createTable(newTable, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setNewTableError(error);
      throw error;
    }
    return () => abortController.abort();
  }

  function handleCancel() {
    setNewTable(emptyTableData);
    history.goBack();
  }

  return (
    <div>
      <ErrorAlert error={newTableError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="table_name">Table Name</label>
          <input
            id="table_name"
            value={newTable.table_name}
            name="table_name"
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
            type="number"
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
