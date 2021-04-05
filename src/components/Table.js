import React from "react";
import { DataGrid } from "@material-ui/data-grid";


function Table({ rows,columns }) {
  return (
    <div style={{ height: 400, width: "68%", backgroundColor: "#ff9100" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rows.length}
        disableColumnSelector={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        disableExtendRowFullWidth={true}
        hideFooter={true}
      />
    </div>
  );
}
export default Table;
