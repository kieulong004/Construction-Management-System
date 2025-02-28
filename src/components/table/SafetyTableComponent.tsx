import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface SafetyTableProps {
  title: string;
  seriesData: {
    name: string;
    type: string;
    stack: string;
    data: number[];
  }[];
  name: string;
  darkMode: boolean;
  xAxisData: string[];
  data: string[];
}

interface TableRow {
  key: string;
  name: string;
  [key: string]: string | number;
}

const SafetyTableComponent: React.FC<SafetyTableProps> = ({
  xAxisData,
  title,
  seriesData,
  darkMode,
  name,
  data,
}) => {
  const columns: ColumnsType<TableRow> = [
    {
      title: name,
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    ...data.map((item, index) => ({
      title: item,
      dataIndex: data[index],
      key: data[index],
      align: "center" as const,
    })),
  ];

  const tableData: TableRow[] = xAxisData.map((item, rolIndex) => {
    const row: TableRow = { key: rolIndex.toString(), name: item };
    seriesData.forEach((vehicle, colIndex) => {
      row[data[colIndex]] = vehicle.data[rolIndex];
    });
    return row;
  });

  return (
    <div
      style={{
        padding: "0 20px",
        backgroundColor: darkMode ? "#393835" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        borderLeft: darkMode ? "1px solid #000" : "1px solid #D6D6D6",
      }}
    >
      <h2 style={{ fontSize: "24px", textAlign: "center",marginBottom: "24px"  }}>{title}</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowClassName={(_, index) =>
          index % 2 === 0
            ? darkMode
              ? "dark-mode-even-row"
              : "light-mode-even-row"
            : darkMode
            ? "dark-mode-odd-row"
            : "light-mode-odd-row"
        }
        style={{
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default SafetyTableComponent;
