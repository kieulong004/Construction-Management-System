import { useEffect } from "react";
import * as echarts from "echarts";

interface ProgressChartComponentProps {
  title: string;
  xAxisData: string[];
  YAxisData?: string[];
  seriesData: { name: string; type: string; stack: string; data: number[] }[];
  tooltip: string;
  legend: string;
  darkMode: boolean;
  contractor?: string;
}

const ProgressChartComponent: React.FC<ProgressChartComponentProps> = ({
  title,
  xAxisData,
  seriesData,
  darkMode,
  tooltip,
  legend,
  contractor,
}) => {

  useEffect(() => {
    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById("chart2"));
    chart.setOption({
      backgroundColor: backgroundColor,
      title: {
        text: title,
        left: "center",
        textStyle: {
          color: textColor,
          fontFamily: "Youtube Sans, Roboto, sans-serif",
        },
        top: "10px",
      },
      tooltip: {
        trigger: tooltip,
        backgroundColor: backgroundColor,
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
      },
      legend: { 
        bottom: legend, 
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" } 
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { color: textColor },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { color: textColor },
      },
      series: seriesData.map((item) => ({
        name: item.name,
        data: item.data,
        type: item.type,
        stack: item.stack,
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
  }, [darkMode, title, xAxisData, seriesData, legend, tooltip, contractor]);

  return <div id="chart2" style={{ width: "100%", height: "581px", }}></div>;
};

export default ProgressChartComponent;
