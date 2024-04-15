import React, { useState } from "react";
import TableForm from "./TableForm";

function CreateTable() {
  const emptyTableData = {
    table_name: "",
    capacity: "",
  };
  const [newTable, setNewTable] = useState(emptyTableData);

  return (
    <div>
      <h1>Create Table</h1>
      <TableForm
        emptyTableData={emptyTableData}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </div>
  );
}

export default CreateTable;
