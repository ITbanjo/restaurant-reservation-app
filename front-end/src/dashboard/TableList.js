import React from "react";
import Table from "./Table";

function TableList({ tables }) {
  return tables.length ? (
    <table class="table border">
      <thead class="thead-light">
        <tr>
          <th scope="col">Table</th>
          <th scope="col">Capacity</th>
          <th scope="col">Availablility</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => (
          <Table table={table} />
        ))}
      </tbody>
    </table>
  ) : (
    <h5 className="pt-3">There are no available tables.</h5>
  );
}

export default TableList;
