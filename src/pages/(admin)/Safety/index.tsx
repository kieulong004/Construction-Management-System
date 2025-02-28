import { useState, useCallback, useRef } from "react";
import { Table, Card, Button, Spin, Image } from "antd";
import SafetyChartComponent from "../../../components/chart/SafetyChartComponent";
import { useChartData } from "../../../components/data";
import SafetyTableComponent from "../../../components/table/SafetyTableComponent";
import DataFilter from "../../../date";
import "../../../style/workers.css";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import { ICamera, ISafety_Event } from "../../../components/common/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCameras } from "../../../components/service/camera";
import { getInOutData } from "../../../components/service/check_in_out";
import useTheme from "../../../hooks/useTheme";

const SafetyPage = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cameraId, setCameraId] = useState<number[]>([]);
  const [safetyEvents, setSafetyEvents] = useState<ISafety_Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chart4 } = useChartData(startDate, endDate, cameraId);
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
        const [safetyData, camerasData] = await Promise.all([
          getInOutData<ISafety_Event>(
            startDate,
            endDate,
            camera_id,
            "safeties"
          ),
          getCameras(),
        ]);
        const mergedData = safetyData.map((safety: ISafety_Event) => {
          const camera = camerasData.find(
            (camera: ICamera) => camera.id === safety.camera_id
          );
          return {
            ...safety,
            camera_name: camera ? camera.name : "Unknown Camera",
          };
        });
        setSafetyEvents(mergedData);
      } catch (error) {
        console.error("Error fetching safety data:", error);
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
      align: "center" as const,
    },
    {
      title: t("table-taps.description"),
      dataIndex: "description",
      key: "description",
      align: "center" as const,
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
      title: "Ảnh",
      dataIndex: "save_file_location",
      key: "image_url",
      align: "center" as const,
      render: (text: string) => (
        <Image src={text} alt="event_image" style={{ width: 50, height: 50 }} />
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
    <div style={{ backgroundColor: chart4.darkMode ? "#393835" : "#f0f0f0" }}>
      <DataFilter onFilter={handleFilter} darkMode={chart4.darkMode} />
      <div className="chart-workers">
        <SafetyChartComponent
          title={chart4.title}
          seriesData={chart4.seriesData}
          tooltip={chart4.tooltip}
          legend={chart4.legend}
          xAxisData={chart4.xAxisData}
          quantity={chart4.quantity}
          darkMode={chart4.darkMode}
        />
        <SafetyTableComponent
          title={chart4.title}
          seriesData={chart4.seriesData}
          xAxisData={chart4.xAxisData}
          darkMode={chart4.darkMode}
          name={chart4.name}
          data={chart4.data}
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
          <Button type="default" onClick={handleExportPDF}>
            Xuất PDF
          </Button>
        }
      >
        {isLoading ? (
          <Spin tip="Loading...">
            <Table
              columns={columns}
              dataSource={safetyEvents.map((item) => ({
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
            dataSource={safetyEvents.map((item) => ({
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

export default SafetyPage;
