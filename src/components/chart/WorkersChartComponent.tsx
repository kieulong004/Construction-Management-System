import { useEffect } from "react";
import * as echarts from "echarts";

interface WorkersChartComponentProps {
  title: string;
  xAxisData: string[];
  YAxisData?: string[];
  seriesData: number[];
  tooltip: string;
  legend: string;
  darkMode: boolean;
}

const WorkersChartComponent: React.FC<WorkersChartComponentProps> = ({
  title,
  xAxisData,
  seriesData,
  darkMode,
  tooltip,
  legend,
}) => {
  useEffect(() => {
    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById("chart1"));
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
      legend: { bottom: legend, textStyle: { fontFamily: "Arial, sans-serif" } },
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
      series: [
        {
          name: title,
          data: seriesData,
          type: "line",
          lineStyle: { color: textColor },
          itemStyle: { color: textColor },
        },
      ],
    });

    window.addEventListener("resize", () => {
      chart.resize();
    });

    return () => {
      window.removeEventListener("resize", () => {
        chart.resize();
      });
    };
  }, [darkMode, title, xAxisData, seriesData, legend, tooltip]);

  return (
    <div
      id="chart1"
      style={{ width: "100%", height: "581px", }}
    ></div>
  );
};

export default WorkersChartComponent;
