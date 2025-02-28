import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

interface WorkersTableComponentProps {
  title: string;
  xAxisData: string[];
  seriesData: number[];
  darkMode: boolean;
  day: string;
}

interface TableRow {
  day: string;
  value: number;
}

const WorkersTableComponent: React.FC<WorkersTableComponentProps> = ({
  title,
  xAxisData,
  seriesData,
  darkMode,
  day,
}) => {
  const columns: TableColumn<TableRow>[] = [
    {
      name: day,
      selector: (row) => row.day,
      sortable: true,
    },
    {
      name: title,
      selector: (row) => row.value,
      sortable: true,
    },
  ];

  const tableData: TableRow[] = xAxisData.map((item, index) => ({
    day: item,
    value: seriesData[index],
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
      <h2 style={{ textAlign: 'center', margin: '10px 0' }}>{title}</h2>
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        paginationRowsPerPageOptions={[3, 6, 9]}
        customStyles={{
          headCells: {
            style: {
              border: darkMode ? '1px solid #f4f4f4' : '1px solid #D6D6D6',
              color: darkMode ? '#fff' : '#000',
              borderColor: darkMode ? '#333' : '#f4f4f4',
              backgroundColor: darkMode ? '#333' : '#f4f4f4',
            },
          },
          rows: {
            style: {
              '&:nth-child(odd)': {
                backgroundColor: darkMode ? '#252526' : '#F5F5F5', // Màu nền cho hàng lẻ
                color: darkMode ? '#E0E0E0' : '#222', // Màu chữ cho hàng lẻ
              },
              '&:nth-child(even)': {
                backgroundColor: darkMode ? '#393835' : '#EAEAEA', // Màu nền cho hàng chẵn
                color: darkMode ? '#E0E0E0' : '#222', // Màu chữ cho hàng chẵn
              },
              '&:hover': {
                backgroundColor: darkMode ? '#383838' : '#ddd',
                cursor: 'pointer',
              },
            },
          },
          table: {
            style: {
              borderRadius: '12px 12px 0px 0px',
              border: darkMode ? '1px solid #f4f4f4' : '1px solid #D6D6D6',
              overflow: 'hidden',
            },
          },
          pagination: {
            style: {
              borderRadius: '0px 0px 12px 12px',
              border: darkMode ? '1px solid #f4f4f4' : '1px solid #D6D6D6',
              borderTop: darkMode ? '0px solid #f4f4f4' : '0px solid #D6D6D6',
              backgroundColor: darkMode ? '#333' : '#f5f5f5', // Màu nền cho phần phân trang
              color: darkMode ? '#fff' : '#000', // Màu chữ
            },
          },
        }}
      />
    </div>
  );
};

export default WorkersTableComponent;