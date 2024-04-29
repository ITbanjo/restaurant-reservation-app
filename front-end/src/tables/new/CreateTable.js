import React, { useState } from "react";
import TableForm from "./TableForm";

function CreateTable() {
  const emptyTableData = {
    table_name: "",
    capacity: "",
  };
  const [newTable, setNewTable] = useState(emptyTableData);

  return (
    <div className="col-md-6 mt-3">
      <h3>Create Table</h3>
      <TableForm
        emptyTableData={emptyTableData}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </div>
  );
}

export default CreateTable;
