import React from "react";
import Table from "./Table";

function TableList({ tables, setTablesError, loadDashboard }) {
  return tables.length ? (
    <table class="table border table-striped">
      <thead>
        <tr>
          <th scope="col">Table</th>
          <th scope="col">Capacity</th>
          <th scope="col">Availability</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => (
          <Table
            table={table}
            setTablesError={setTablesError}
            loadDashboard={loadDashboard}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <h5 className="pt-3">There are no available tables.</h5>
  );
}

export default TableList;
