import { useState, useCallback, useRef } from "react";
import { Table, Card, Button, Image, Spin } from "antd";
import ExitingChartComponent from "../../../components/chart/ExitingChartComponent";
import { useChartData } from "../../../components/data";
import ExitingTableComponent from "../../../components/table/ExitingTableComponent";
import DataFilter from "../../../date";
import "../../../style/workers.css";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import { ICamera, IVehicle_event } from "../../../components/common/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCameras } from "../../../components/service/camera";
import { getInOutData } from "../../../components/service/check_in_out";
import useTheme from "../../../hooks/useTheme";

const ExitingPage = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cameraId, setCameraId] = useState<number[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle_event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chart5 } = useChartData(startDate, endDate, cameraId);
  const contentRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();
  dayjs.extend(utc);
  const { t } = useTranslation(["dashboard"]);

  const handleFilter = useCallback(
    async (startDate: string, endDate: string, camera_id: number[]) => {
      setStartDate(startDate);
      setEndDate(endDate);
      setCameraId(camera_id);
      setIsLoading(true);
      try {
        const [vehicleData, camerasData] = await Promise.all([
          getInOutData<IVehicle_event>(
            startDate,
            endDate,
            camera_id,
            "vehicles"
          ),
          getCameras(),
        ]);
        const mergedData = vehicleData.map((vehicle: IVehicle_event) => {
          const camera = camerasData.find(
            (camera: ICamera) => camera.id === vehicle.camera_id
          );
          return {
            ...vehicle,
            camera_name: camera ? camera.name : "Unknown Camera",
          };
        });
        setVehicles(mergedData);
      } catch (error) {
        console.error("Error fetching camera data:", error);
      } finally {
        setIsLoading(false);
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
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      align: "center" as const,
      render: (text: string) =>
        dayjs.utc(text).format(" HH:mm:ss | DD/MM/YYYY"),
    },
    {
      title: t("table-taps.inout"),
      dataIndex: "inout",
      align: "center" as const,
      key: "inout",
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
    {
      title: "Loại xe",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      align: "center" as const,
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
    <div style={{ backgroundColor: chart5.darkMode ? "#393835" : "#f0f0f0" }}>
      <DataFilter onFilter={handleFilter} darkMode={chart5.darkMode} />
      <div className="chart-workers">
        <ExitingChartComponent
          title={chart5.title}
          tooltip={chart5.tooltip}
          legend={chart5.legend}
          data={chart5.data}
          xAxisData={chart5.xAxisData}
          name={chart5.name}
          quantity={chart5.quantity}
          seriesData={chart5.seriesData}
          darkMode={chart5.darkMode}
        />
        <ExitingTableComponent
          title={chart5.title}
          data={chart5.data}
          xAxisData={chart5.xAxisData}
          name={chart5.name}
          seriesData={chart5.seriesData}
          darkMode={chart5.darkMode}
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
        {isLoading ? (
          <Spin tip="Loading...">
            <Table
              columns={columns}
              dataSource={vehicles.map((item) => ({
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
          </Spin>
        ) : (
          <Table
            columns={columns}
            dataSource={vehicles.map((item) => ({
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
        )}
      </Card>
    </div>
  );
};

export default ExitingPage;
