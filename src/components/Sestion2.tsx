import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import { ICamera } from "./common/type";
import intance from "./config/api";
import { Table } from "antd";

const Section2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [cameras, setCameras] = useState<ICamera[]>([]);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const response = await intance.get("/api/cameras");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    getCameras();
  }, []);

  return (
    <section id="section2">
      <div className="half-container">
        <div className="left-half">
          <div
            className="small-card"
            id="chart4"
            onClick={() => navigate("/admin/safety")}
          >
            <div className="chart-container" id="chart4-container"></div>
          </div>
          <div
            className="small-card"
            id="chart5"
            onClick={() => navigate("/admin/exiting")}
          >
            <div className="chart-container" id="chart5-container"></div>
          </div>
          <div
            className="small-card"
            id="chart6"
            onClick={() => navigate("/admin/check")}
          >
            <div className="chart-container" id="chart6-container"></div>
          </div>
        </div>
        <div
          className="right-half"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div
            className="big-card"
            style={{
              width: "100%",
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="info-container" style={{ width: "100%", }}>
              <Table
              dataSource={cameras}
              columns={[
                {
                title: t("section2.id"),
                dataIndex: "id",
                key: "id",
                render: (text) => <span>{text}</span>,
                onHeaderCell: () => ({
                  style: { background: darkMode ? "#3a3b3c" : "#f9f9f9" },
                }),
                },
                {
                title: t("section2.name"),
                dataIndex: "name",
                key: "name",
                render: (text) => <span>{text}</span>,
                onHeaderCell: () => ({
                  style: { background: darkMode ? "#3a3b3c" : "#f9f9f9" },
                }),
                },
                {
                title: t("section2.ip"),
                dataIndex: "IP",
                key: "IP",
                render: (text) => <span>{text}</span>,
                onHeaderCell: () => ({
                  style: { background: darkMode ? "#3a3b3c" : "#f9f9f9" },
                }),
                },
                {
                  title: t("section2.location"),
                  dataIndex: "location",
                  key: "location",
                  render: (text) => <span>{text}</span>,
                  onHeaderCell: () => ({
                    style: { background: darkMode ? "#3a3b3c" : "#f9f9f9" },
                  }),
                  },
              ]}
              rowClassName={(_, index) =>
                `${darkMode ? "dark-mode" : "light-mode"}-${
                  index % 2 === 0 ? "odd" : "even"
                }-row`
              }
              pagination={false}
              rowKey="id"
              />
            </div>
          </div>
          <div
            className="big-card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="small-card"
              id="chart7"
              style={{ width: "100%" }}
              onClick={() => navigate("/admin/rate")}
            >
              <div className="chart-container" id="chart7-container"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;