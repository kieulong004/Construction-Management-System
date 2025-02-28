import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Table, Select, Image } from "antd";
import useTheme from "../hooks/useTheme";
import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  ICamera,
  IDevice,
  IEvent,
  IIn_Out_Event,
  ISafety_Event,
  IVehicle_event,
} from "./common/type";
import {
  getEvent,
  getInOutEvents,
  getSafetyEvents,
  getVehicleEvents,
} from "./service/works";
import type { ColumnsType } from "antd/es/table";
import { getCameras, getDevices } from "./service/camera";

const { Option } = Select;
dayjs.extend(utc);

type EventType = "events" | "inout" | "safeties" | "vehicles";

type CommonEventType = IEvent | IIn_Out_Event | ISafety_Event | IVehicle_event;

const Dashboard = () => {
  const { t } = useTranslation(["dashboard"]);
  const [eventId, setEventId] = useState<EventType>("events");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [inOuts, setInOuts] = useState<IIn_Out_Event[]>([]);
  const [safeties, setSafeties] = useState<ISafety_Event[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle_event[]>([]);

  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const fetchEvents = async (name: EventType) => {
    try {
      switch (name) {
        case "events": {
          const [eventsData, devicesData] = await Promise.all([
            getEvent(name),
            getDevices(),
          ]);
          const mergedData = eventsData.map((event: IEvent) => {
            const device = devicesData.find(
              (device: IDevice) => device.id === event.device_id
            );
            return {
              ...event,
              device_name: device ? device.device_name : "Unknown Device",
            };
          });
          console.log(mergedData);
          setEvents(mergedData);
          break;
        }
        case "inout": {
          const [inOutData, camerasData] = await Promise.all([
            getInOutEvents(name),
            getCameras(),
          ]);
          const mergedData = inOutData.map((inout: IIn_Out_Event) => {
            const camera = camerasData.find(
              (camera: ICamera) => camera.id === inout.camera_id
            );
            return {
              ...inout,
              camera_name: camera ? camera.name : "Unknown Camera",
            };
          });
          setInOuts(mergedData);
          break;
        }
        case "safeties": {
          const [safetyData, camerasData] = await Promise.all([
            getSafetyEvents(name),
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
          setSafeties(mergedData);
          break;
        }
        case "vehicles": {
          const [vehicleData, camerasData] = await Promise.all([
            getVehicleEvents(name),
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
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(eventId);
  }, [eventId]);

  const handleSelectChange = (value: EventType) => {
    setEventId(value);
    fetchEvents(value);
  };

  const columnEvents: ColumnsType<CommonEventType> = useMemo(
    () => [
      {
        title: t("table-taps.id"),
        dataIndex: "id",
        key: "id",
        
      },
      {
        title: t("table-taps.device_name"),
        dataIndex: "device_name",
        key: "device_name",
        
      },
      {
        title: t("table-taps.time"),
        dataIndex: "event_time",
        key: "time",
        
        render: (text: string) =>
          dayjs.utc(text).format("HH:mm:ss  DD/MM/YYYY"),
      },
      {
        title: t("table-taps.worker_name"),
        dataIndex: "employee_name",
        key: "worker",
        
      },
      {
        title: t("table-taps.safety_hat"),
        dataIndex: "safety_hat",
        key: "safety_hat",
        
      },
      {
        title: t("table-taps.safety_vest"),
        dataIndex: "safety_vest",
        key: "safety_vest",
        
      },
      {
        title: t("table-taps.check_in"),
        dataIndex: "normal_image",
        key: "check_in",
        render: (text: string) => (
          <Image
            src={text}
            alt="check_in"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: t("table-taps.check_out"),
        dataIndex: "yolo_image",
        key: "check_out",
        render: (text: string) => (
          <Image
            src={text}
            alt="check_out"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: t("table-taps.note"),
        dataIndex: "safety_training",
        key: "safety_training",
        
        render: (_: unknown, record: CommonEventType) => {
          if ("safety_hat" in record && "safety_vest" in record) {
            const { safety_hat, safety_vest } = record as IEvent;
            if (safety_hat === 0 && safety_vest === 0) {
              return "Thiếu mũ bảo hộ và thiếu áo bảo hộ";
            } else if (safety_hat === 0) {
              return "Thiếu mũ bảo hộ";
            } else if (safety_vest === 0) {
              return "thiếu áo bảo hộ";
            }
          }
          return "";
        },
      },
      {
        title: t("table-taps.action"),
        dataIndex: "action",
        key: "action",
        render: () => <InfoCircleOutlined />,
      },
    ],
    [t]
  );

  const columnInOuts: ColumnsType<CommonEventType> = useMemo(
    () => [
      {
        title: t("table-taps.id"),
        dataIndex: "id",
        key: "id",
        
      },
      
      {
        title: t("table-taps.camera_name"),
        dataIndex: "camera_name",
        key: "camera_name",
        
      },
      {
        title: t("table-taps.time"),
        dataIndex: "time",
        key: "time",
        
        render: (text: string) =>
          dayjs.utc(text).format("HH:mm:ss  DD/MM/YYYY"),
      },
      {
        title: t("table-taps.inout"),
        dataIndex: "inout",
        key: "inout",
        
      },
      {
        title: t("table-taps.save_file_location"),
        dataIndex: "save_file_location",
        key: "save_file_location",
        render: (text: string) => (
          <Image
            src={text}
            alt="save_file_location"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: t("table-taps.action"),
        dataIndex: "action",
        key: "action",
        render: () => <InfoCircleOutlined />,
      },
    ],
    [t]
  );

  const columnSafeties: ColumnsType<CommonEventType> = useMemo(
    () => [
      {
        title: t("table-taps.id"),
        dataIndex: "id",
        key: "id",
        
      },
      
      {
        title: t("table-taps.camera_name"),
        dataIndex: "camera_name",
        key: "camera_name",
        
      },
      {
        title: t("table-taps.time"),
        dataIndex: "time",
        key: "time",
        
        render: (text: string) =>
          dayjs.utc(text).format("HH:mm:ss | DD/MM/YYYY"),
      },
      {
        title: t("table-taps.description"),
        dataIndex: "description",
        key: "description",
        
      },
      {
        title: t("table-taps.save_file_location"),
        dataIndex: "save_file_location",
        key: "save_file_location",
        render: (text: string) => (
          <Image
            src={text}
            alt="save_file_location"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: t("table-taps.action"),
        dataIndex: "action",
        key: "action",
        render: () => <InfoCircleOutlined />,
      },
    ],
    [t]
  );

  const columnVehicles: ColumnsType<CommonEventType> = useMemo(
    () => [
      {
        title: t("table-taps.id"),
        dataIndex: "id",
        key: "id",
        
      },
      
      {
        title: t("table-taps.camera_name"),
        dataIndex: "camera_name",
        key: "camera_name",
        
      },
      {
        title: t("table-taps.time"),
        dataIndex: "time",
        key: "time",
        
        render: (text: string) =>
          dayjs.utc(text).format("HH:mm:ss | DD/MM/YYYY"),
      },
      {
        title: t("table-taps.inout"),
        dataIndex: "inout",
        key: "inout",
        
      },
      {
        title: t("table-taps.save_file_location"),
        dataIndex: "save_file_location",
        key: "save_file_location",
        render: (text: string) => (
          <Image
            src={text}
            alt="save_file_location"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: t("table-taps.vehicle_type"),
        dataIndex: "vehicle_type",
        key: "vehicle_type",
        
      },
    ],
    [t]
  );

  const columns = useMemo(() => {
    switch (eventId) {
      case "events":
        return columnEvents;
      case "inout":
        return columnInOuts;
      case "safeties":
        return columnSafeties;
      case "vehicles":
        return columnVehicles;
      default:
        return [];
    }
  }, [eventId, columnEvents, columnInOuts, columnSafeties, columnVehicles]);

  const dataSource = useMemo(() => {
    switch (eventId) {
      case "events":
        return events;
      case "inout":
        return inOuts;
      case "safeties":
        return safeties;
      case "vehicles":
        return vehicles;
      default:
        return [];
    }
  }, [eventId, events, inOuts, safeties, vehicles]);

  return (
    <div className="dashboard">
      <div
        className="chart-box"
        id="chart1"
        onClick={() => navigate("/admin/workers")}
      ></div>
      <div
        className="chart-box"
        id="chart2"
        onClick={() => navigate("/admin/progress")}
      ></div>
      <div
        className="chart-box"
        id="chart3"
        onClick={() => navigate("/admin/count")}
      ></div>

      <div className="table-box" style={{ gridColumn: "span 3" }}>
        <div style={{ width: "100%", display: "flex", marginBottom: "14px" }}>
          <h3
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "12px",
              justifyContent: "end",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {t("table-taps.recent_events")}
          </h3>
          <Select
            style={{
              paddingRight: "10px",
              borderRadius: "6px",
              color: darkMode ? "#ffffff" : "#000000",
            }}
            value={eventId}
            onChange={handleSelectChange}
          >
            <Option value="events">Nhận diện khuôn mặt</Option>
            <Option value="safeties">Phát hiện đồ bảo hộ</Option>
            <Option value="inout">Người IN/OUT</Option>
            <Option value="vehicles">Xe IN/OUT</Option>
          </Select>
        </div>
        <Table<CommonEventType>
          columns={columns}
          dataSource={dataSource as CommonEventType[]}
          rowClassName={(_, index) =>
            `${darkMode ? "dark-mode" : "light-mode"}-${
              index % 2 === 0 ? "odd" : "even"
            }-row`
          }
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
