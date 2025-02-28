import React, { useRef } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface CheckTableProps {
  title: string;
  data: string[];
  seriesData: {
    name: string;
    type: string;
    smooth: boolean;
    symbol: string;
    symbolSize: number;
    data: number[];
  }[];
  darkMode: boolean;
  name: string;
  xAxisData: string[];
  page: string;
}

interface TableRow {
  key: string;
  name: string;
  [key: string]: string | number;
}

const CheckTableComponent: React.FC<CheckTableProps> = ({
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
    },
    ...data.map((item, index) => ({
      title: item,
      dataIndex: data[index],
      key: data[index],
    })),
  ];

  const tableData: TableRow[] = xAxisData.map((item, rolIndex) => {
    const row: TableRow = { key: rolIndex.toString(), name: item };
    seriesData.forEach((vehicle, colIndex) => {
      row[data[colIndex]] = vehicle.data[rolIndex];
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
        padding: "0 14px",
        backgroundColor: darkMode ? "#393835" : "#f0f0f0",
        color: darkMode ? "#ffffff" : "#000000",
        borderLeft: darkMode ? "1px solid #000" : "1px solid #D6D6D6",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>{title}</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowClassName={(_, index) =>
          `${darkMode ? "dark-mode" : "light-mode"}-${
            index % 2 === 0 ? "odd" : "even"
          }-row`
        }
        style={{
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default CheckTableComponent;