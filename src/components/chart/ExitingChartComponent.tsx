import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";

interface ExitingChartComponentProps {
  data: string[];
  title: string;
  tooltip: string;
  legend: string;
  darkMode: boolean;
  xAxisData: string[];
  name: string;
  quantity: string;
  seriesData: { name: string; type: string; stack: string; data: number[] }[];
}

const ExitingChartComponent: React.FC<ExitingChartComponentProps> = ({
  data,
  name,
  title,
  darkMode,
  tooltip,
  xAxisData,
  legend,
  quantity,
  seriesData,
}) => {
  console.log(quantity)
  const { t } = useTranslation(["dashboard"]);
  useEffect(() => {
    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById("charts5"));
    chart.setOption({
      backgroundColor: backgroundColor,
      title: {
        text: title,
        left: "center",
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
      },
      tooltip: {
        trigger: tooltip,
        backgroundColor: backgroundColor,
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
        axisPointer: { type: "shadow" },
      },
      toolbox: {
        top: "10px",
        feature: {
          dataView: { show: true, readOnly: false }, 
          magicType: { show: true, type: ["line", "bar"] }, 
          restore: { show: true }, 
          saveAsImage: { show: true }, 
        },
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { color: textColor },
      },
      legend: {
        data: data,
        bottom: legend,
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        name: name,
        axisLine: { lineStyle: { color: textColor }, },
        axisLabel: {  rotate: 45  },
      },
      yAxis: {
        type: "value",
        name: quantity,
        axisLine: { lineStyle: { color: textColor } },
      },
      series: seriesData.map((item) => ({
        name: item.name,
        type: item.type,
        stack: item.stack,
        data: item.data,
      })),
      
    });

    window.addEventListener("resize", () => {
      chart.resize();
    });

    return () => {
      window.removeEventListener("resize", () => {
        chart.resize();
      });
    };
  }, [
    data,
    darkMode,
    title,
    tooltip,
    legend,
    quantity,
    seriesData,
    xAxisData,
    name,
    t,
  ]);

  return <div id="charts5" style={{ width: "100%", height: "581px" }}></div>;
};

export default ExitingChartComponent;
