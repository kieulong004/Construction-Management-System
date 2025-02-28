import { useState, useRef, useCallback } from "react";
import { Table, Card, Image, Button } from "antd";
import CheckChartComponent from "../../../components/chart/CheckChartComponent";
import { useChartData } from "../../../components/data";
import CheckTableComponent from "../../../components/table/CheckTableComponent";
import DataFilter from "../../../date/index";
import "../../../style/workers.css";
import { getInOutData } from "../../../components/service/check_in_out";
import { ICamera, IIn_Out_Event } from "../../../components/common/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { getCameras } from "../../../components/service/camera";
import { useTranslation } from "react-i18next";
import useTheme from "../../../hooks/useTheme";

const CheckPage = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cameraId, setCameraId] = useState<number[]>([]);
  const { chart6 } = useChartData(startDate, endDate, cameraId);
  const [inOutData, setinOutData] = useState<IIn_Out_Event[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();
  const { t } = useTranslation(["dashboard"]);
  dayjs.extend(utc);

  const handleFilter = useCallback(
    async (startDate: string, endDate: string, camera_id: number[]) => {
      setStartDate(startDate);
      setEndDate(endDate);
      setCameraId(camera_id);
      try {
        const [inOutEvents, camerasData] = await Promise.all([
          getInOutData<IIn_Out_Event>(startDate, endDate, camera_id, "inout"),
          getCameras(),
        ]);
        const mergedData = inOutEvents.map((event: IIn_Out_Event) => {
          const camera = camerasData.find(
            (camera: ICamera) => camera.id === event.camera_id
          );
          return {
            ...event,
            camera_name: camera ? camera.name : "Unknown Camera",
          };
        });
        setinOutData(mergedData);
      } catch (error) {
        console.error("Error fetching camera data:", error);
      }
    },
    []
  );

  const columns = [
    {
      title: t("table-taps.id"),
      dataIndex: "id",
      key: "id",
      align: "center" as const,
    },
    {
      title: t("table-taps.camera_name"),
      dataIndex: "camera_name",
      key: "camera_name",
      align: "center" as const,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      render: (text: string) =>
        dayjs.utc(text).format(" HH:mm:ss | DD/MM/YYYY"),
      align: "center" as const,
    },
    {
      title: t("table-taps.inout"),
      dataIndex: "inout",
      key: "inout",
      align: "center" as const,
    },
    {
      title: "Ảnh",
      dataIndex: "save_file_location",
      key: "save_file_location",
      align: "center" as const,
      render: (text: string) => (
        <Image
          src={text}
          alt="save_file_location"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
  ];

  const handleExportPDF = async () => {
    if (contentRef.current) {
      const imgData = await domtoimage.toPng(contentRef.current);
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
      pdf.save("export.pdf");
    }
  };
  return (
    <div style={{ backgroundColor: chart6.darkMode ? "#393835" : "#f0f0f0" }}>
      <DataFilter onFilter={handleFilter} darkMode={chart6.darkMode} />
      <div className="chart-workers">
        <CheckChartComponent
          title={chart6.title}
          tooltip={chart6.tooltip}
          legend={chart6.legend}
          data={chart6.data}
          xAxisData={chart6.xAxisData}
          name={chart6.name}
          quantity={chart6.quantity}
          seriesData={chart6.seriesData}
          darkMode={chart6.darkMode}
        />
        <CheckTableComponent
          title={chart6.title}
          data={chart6.data}
          xAxisData={chart6.xAxisData}
          name={chart6.name}
          seriesData={chart6.seriesData}
          darkMode={chart6.darkMode}
          page={chart6.page}
        />
      </div>
      <Card
        title={
          <span style={{ color: darkMode ? "#ffffff" : "#000000" }}>
            Bảng chi tiết
          </span>
        }
        style={{
          margin: 20,
          padding: "0 14px",
          backgroundColor: darkMode ? "#393835" : "#f0f0f0",
          color: darkMode ? "#ffffff" : "#000000",
          borderLeft: darkMode ? "1px solid #fff" : "1px solid #D6D6D6",
        }}
        ref={contentRef}
        extra={
          <Button type="primary" onClick={handleExportPDF}>
            Xuất PDF
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={inOutData.map((item) => ({
            ...item,
            key: item.id,
          }))}
          rowClassName={(_, index) =>
            `${darkMode ? "dark-mode" : "light-mode"}-${
              index % 2 === 0 ? "odd" : "even"
            }-row`
          }
          pagination={{
            pageSizeOptions: ["5", "10"],
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
        />
      </Card>
    </div>
  );
};

export default CheckPage;
