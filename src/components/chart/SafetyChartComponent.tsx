import { useEffect } from "react";
import * as echarts from "echarts";

interface SafetyChartComponentProps {
  title: string;
  xAxisData: string[];
  YAxisData?: string[];
  seriesData: {
    name: string;
    type: string;
    stack: string;
    data: number[];
  }[];
  tooltip: string;
  legend: string;
  quantity?: string;
  darkMode: boolean;
}

const SafetyChartComponent: React.FC<SafetyChartComponentProps> = ({
  title,
  xAxisData,
  YAxisData,
  seriesData,
  darkMode,
  tooltip,
  legend,
  quantity
}) => {
  console.log(YAxisData);
  useEffect(() => {
    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById("chart4"));
    chart.setOption({
      backgroundColor: backgroundColor,
      title: {
        text: title,
        left: "center",
        textStyle: {
          fontSize: 20,
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
      legend: { bottom: legend,marginBottom:"10", textStyle: { fontFamily: "Arial, sans-serif" } },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: {styleText:{ color: textColor },rotate: 45},
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { color: textColor },
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
  }, [darkMode, title, xAxisData, seriesData, legend, tooltip, quantity]);

  return (
    <div
      id="chart4"
      style={{ width: "100%", height: "581px", }}
    ></div>
  );
};

export default SafetyChartComponent;
