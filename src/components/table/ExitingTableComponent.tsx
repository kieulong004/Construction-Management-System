import React, { useRef } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ExitingTableProps {
  title: string;
  data: string[];
  seriesData: { name: string; type: string; stack: string; data: number[] }[];
  darkMode: boolean;
  name: string;
  xAxisData: string[];
}

interface TableRow {
  key: string;
  name: string;
  [key: string]: string | number;
}

const ExitingTableComponent: React.FC<ExitingTableProps> = ({
  title,
  name,
  data,
  xAxisData,
  seriesData,
  darkMode,
}) => {
  const tableRef = useRef(null);
  const columns: ColumnsType<TableRow> = [
    {
      title: name,
      dataIndex: "name",
      key: "name",
      "align": "center" as const,
    },
    ...data.map((item, index) => ({
      title: item,
      dataIndex: data[index],
      key: data[index],
      "align": "center" as const,
    })),
  ];

  const tableData: TableRow[] = xAxisData.map((item, rowIndex) => {
    const row: TableRow = { key: rowIndex.toString(), name: item };
    seriesData.forEach((vehicle, colIndex) => {
      row[data[colIndex]] = vehicle.data[rowIndex];
    });
    return row;
  });

  const totalRow: TableRow = { key: "total", name: "Tổng" };
  seriesData.forEach((vehicle, colIndex) => {
    totalRow[data[colIndex]] = vehicle.data.reduce((acc, val) => acc + val, 0);
  });

  tableData.push(totalRow);

  return (
    <div
      ref={tableRef}
      style={{
      overflowX: "auto",
      padding: "0 14px",
      backgroundColor: darkMode ? "#393835" : "#f0f0f0",
      color: darkMode ? "#ffffff" : "#000000",
      borderLeft: darkMode ? "1px solid #000" : "1px solid #D6D6D6",
      borderRight: darkMode ? "1px solid #000" : "1px solid #D6D6D6", // Added borderRight to match borderLeft
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>{title}</h2>
      <Table
      columns={columns}
      dataSource={tableData}
      
      pagination={false}
      rowClassName={(_, index) =>
        index === tableData.length - 1
        ? "bold-row"
        : `${darkMode ? "dark-mode" : "light-mode"}-${
          index % 2 === 0 ? "odd" : "even"
          }-row`
      }
      />
    </div>
  );
};

export default ExitingTableComponent;
