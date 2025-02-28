import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import { useChartData } from "./data";
import { getCameras } from "./service/camera";
import { ICamera } from "./common/type";
import { addDays, format, startOfToday } from "date-fns";

const Charts = () => {
  const { darkMode } = useTheme();
  const [startDate] = useState<Date | string>(startOfToday());
  const [endDate] = useState<Date | string>(addDays(startOfToday(), 1));
  const [cameraData, setCameraData] = useState<number[]>([]);
  const { t, i18n } = useTranslation(["dashboard"]);
  const chartRefs = useRef<{ [key: string]: echarts.EChartsType }>({});
  const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss");
  const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss");
  const { chart1, chart2, chart3, chart4, chart5, chart6, chart7 } =
    useChartData(formattedStartDate, formattedEndDate, cameraData);
  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await getCameras();
        const cameraIds: number[] = response.map((camera: ICamera) =>
          Number(camera.id)
        );
        setCameraData(cameraIds);
      } catch (error) {
        console.error("Error fetching camera data:", error);
      }
    };
    fetchCameraData();
  }, []);


  useEffect(() => {
    const textColor = darkMode ? "#ffffff" : "#000000";
    const backgroundColor = darkMode ? "#1c1c1d" : "#ffffff";

    const chartOptions = [
      {
        id: "chart1",
        option: {
          title: {
            text: chart1.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Youtube Sans, Roboto, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            top: "100%",
            textStyle: { fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: chart1.xAxisData,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { fontSize: "12", color: textColor },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: [
            {
              name: chart1.day,
              data: chart1.seriesData,
              type: "line",
            },
          ],
        },
      },
      {
        id: "chart2",
        option: {
          title: {
            text: chart2.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: chart2.xAxisData,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: {
              textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
            },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: chart2.seriesData.map((series) => ({
            ...series,
          })),
        },
      },
      {
        id: "chart3",
        option: {
          title: {
            text: chart3.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "item",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          series: [
            {
              type: "pie",
              data: chart3.data,
              label: { textStyle: { fontFamily: "Arial, sans-serif" } },
            },
          ],
        },
      },
      {
        id: "chart4",
        option: {
          title: {
            text: chart4.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
            axisPointer: { type: "shadow" },
          },
          legend: {
            data: chart4.data,
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: chart4.xAxisData,
            name: chart4.name,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { textStyle: { color: textColor }, rotate: 45 },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: chart4.seriesData,
        },
      },
      {
        id: "chart5",
        option: {
          title: {
            text: chart5.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
            axisPointer: { type: "shadow" },
          },
          legend: {
            data: chart5.data,
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: chart5.xAxisData,
            name: chart5.name,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { textStyle: { color: textColor }, rotate: 45 },
          },
          yAxis: {
            type: "value",
            name: chart5.quantity,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: chart5.seriesData,
        },
      },
      {
        id: "chart6",
        option: {
          title: {
            text: chart6.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            data: chart6.data,
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: chart6.xAxisData,
            name: chart6.name,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { textStyle: { color: textColor }, rotate: 45 },
          },
          yAxis: {
            type: "value",
            name: chart6.quantity,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: chart6.seriesData,
        },
      },
      {
        id: "chart7",
        option: {
          title: {
            text: chart7.title,
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          color: ["#4caf50", "#f44336"],
          series: [
            {
              type: "pie",
              data: chart7.data,
            },
          ],
        },
      },
      {
        id: "chart8",
        option: {
          title: {
            text: t("charts8.workers_on_site"),
            left: "center",
            textStyle: {
              fontSize: "16",
              color: textColor,
              fontFamily: "Arial, sans-serif",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: backgroundColor,
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          legend: {
            bottom: "0%",
            textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
          },
          xAxis: {
            type: "category",
            data: [
              "0-3h",
              "3-6h",
              "6-9h",
              "9-12h",
              "12-15h",
              "15-18h",
              "18-21h",
              "21-24h",
            ],
            name: t("charts8.time_of_day"),
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { textStyle: { color: textColor }, rotate: 45 },
          },
          yAxis: {
            type: "value",
            name: t("charts8.quantity"),
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          series: [
            {
              data: [20, 35, 50, 80, 65, 45, 30, 25],
              type: "line",
              name: t("charts8.quantity"),
              smooth: true,
              areaStyle: {},
            },
          ],
        },
      },
    ];

    chartOptions.forEach(({ id, option }) => {
      const chartElement = document.getElementById(id);
      if (chartElement) {
        const chart = echarts.init(chartElement);
        chart.setOption(option);
        chartRefs.current[id] = chart;
      }
    });

    const resizeCharts = () => {
      Object.values(chartRefs.current).forEach((chart) => {
        chart.resize();
      });
    };

    window.addEventListener("resize", resizeCharts);

    const currentChartRefs = { ...chartRefs.current };

    return () => {
      window.removeEventListener("resize", resizeCharts);
      Object.values(currentChartRefs).forEach((chart) => {
        chart.dispose();
      });
    };
  }, [
    i18n.language,
    darkMode,
    t,
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    chart6,
    chart7,
  ]);

  return (
    <div className="charts-container">
      <div id="chart1" className="chart"></div>
      <div id="chart2" className="chart"></div>
      <div id="chart3" className="chart"></div>
      <div id="chart4-container" className="chart"></div>
      <div id="chart5-container" className="chart"></div>
      <div id="chart6-container" className="chart"></div>
      <div id="chart7-container" className="chart"></div>
      <div id="chart8-container" className="chart"></div>
    </div>
  );
};

export default Charts;
