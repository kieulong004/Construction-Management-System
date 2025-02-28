import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface EventTableProps {
  title: string;
  data: { name: string; value: number }[];
  darkMode: boolean;
}

interface TableRow {
  eventId: string;
  worker: string;
  contractor: string;
  position: string;
  safetyTraining: string;
  startTime: string;
  endTime: string;
  eventType: string;
}

const EventTableComponent: React.FC<EventTableProps> = ({
  title,
  data,
  darkMode,
}) => {
  const { t } = useTranslation(["dashboard"]);
  const navigate = useNavigate();

  const columns: TableColumn<TableRow>[] = [
    {
      name: t("table-taps.event_id"),
      selector: (row) => row.eventId,
      sortable: true,
    },
    {
      name: t("table-taps.worker"),
      selector: (row) => row.worker,
      sortable: true,
    },
    {
      name: t("table-taps.contractor"),
      selector: (row) => row.contractor,
      sortable: true,
    },
    {
      name: t("table-taps.position"),
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: t("table-taps.safety_training"),
      selector: (row) => row.safetyTraining,
      sortable: true,
    },
    {
      name: t("table-taps.start_time"),
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: t("table-taps.end_time"),
      selector: (row) => row.endTime,
      sortable: true,
    },
    {
      name: t("table-taps.event_type"),
      selector: (row) => row.eventType,
      sortable: true,
    },
  ];

  const tableData: TableRow[] = data.map((item, index) => ({
    eventId: `00${index + 1}`,
    worker: t("table-taps.nguyen_duc_manh"),
    contractor: item.name,
    position: t("table-taps.assistant"),
    safetyTraining: t("table-taps.learned"),
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    eventType: t("table-taps.check_in"),
  }));

  return (
    <div
      style={{
        padding: "0 20px",
        backgroundColor: darkMode ? "#393835" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        borderLeft: darkMode ? "1px solid #000" : "1px solid #D6D6D6",
      }}
      onClick={() => navigate("/admin/events")}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>{title}</h2>
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

export default EventTableComponent;