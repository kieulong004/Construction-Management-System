import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface RateTableProps {
  title: string;
  data: { name: string; value: number }[];
  darkMode: boolean;
  status: string;
  quantity: string;
}

interface TableRow {
  name: string;
  value: number;
}

const RateTableComponent: React.FC<RateTableProps> = ({
  title,
  data,
  darkMode,
  status,
  quantity,
}) => {
  const columns: TableColumn<TableRow>[] = [
    {
      name: status,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: quantity,
      selector: (row) => row.value,
      sortable: true,
    },
  ];

  const tableData: TableRow[] = data.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  return (
    <div
      style={{

        padding: "0 20px",
        backgroundColor: darkMode ? "#393835" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        borderLeft: darkMode ? "1px solid #000" : "1px solid #D6D6D6",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "24px" }}>{title}</h3>
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        paginationRowsPerPageOptions={[3, 6, 9]}
        customStyles={{
          headCells: {
            style: {
              border: darkMode ? "1px solid #f4f4f4" : "1px solid #D6D6D6",
              color: darkMode ? "#fff" : "#000",
              borderColor: darkMode ? "#333" : "#f4f4f4",
              backgroundColor: darkMode ? "#333" : "#f4f4f4",
            },
          },
          rows: {
            style: {
              "&:nth-child(odd)": {
                backgroundColor: darkMode ? "#252526" : "#F5F5F5", // Màu nền cho hàng lẻ
                color: darkMode ? "#E0E0E0" : "#222", // Màu chữ cho hàng lẻ
              },
              "&:nth-child(even)": {
                backgroundColor: darkMode ? "#393835" : "#EAEAEA", // Màu nền cho hàng chẵn
                color: darkMode ? "#E0E0E0" : "#222", // Màu chữ cho hàng chẵn
              },
              "&:hover": {
                backgroundColor: darkMode ? "#383838" : "#ddd",
                cursor: "pointer",
              },
            },
          },
          table: {
            style: {
              borderRadius: "12px 12px 0px 0px",
              border: darkMode ? "1px solid #f4f4f4" : "1px solid #D6D6D6",
              overflow: "hidden",
            },
          },
          pagination: {
            style: {
              borderRadius: "0px 0px 12px 12px",
              border: darkMode ? "1px solid #f4f4f4" : "1px solid #D6D6D6",
              borderTop: darkMode ? "0px solid #f4f4f4" : "0px solid #D6D6D6",
              backgroundColor: darkMode ? "#333" : "#f5f5f5", // Màu nền cho phần phân trang
              color: darkMode ? "#fff" : "#000", // Màu chữ
            },
          },
        }}
      />
    </div>
  );
};

export default RateTableComponent;