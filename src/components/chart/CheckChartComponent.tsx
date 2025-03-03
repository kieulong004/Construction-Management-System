import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";

interface CheckChartComponentProps {
  timeStart: string;
  timeEnd: string;
  data: string[];
  title: string;
  tooltip: string;
  legend: string;
  darkMode: boolean;
  xAxisData: string[];
  name: string;
  quantity: string;
  seriesData: {
    name: string;
    type: string;
    smooth: boolean;
    symbol: string;
    symbolSize: number;
    data: number[];
  }[];
}

const CheckChartComponent: React.FC<CheckChartComponentProps> = ({
  data,
  name,
  title,
  timeStart,
  timeEnd,
  darkMode,
  tooltip,
  xAxisData,
  legend,
  quantity,
  seriesData,
}) => {
  console.log(timeStart, timeEnd);
  const { t } = useTranslation(["dashboard"]);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    chartInstance.current = echarts.init(chartRef.current, darkMode ? "dark" : "light");

    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    chartInstance.current.setOption({
      backgroundColor: backgroundColor,
      title: {
        text: `${title} ${timeStart} - ${timeEnd}`,
        left: "10%",
        textStyle: {
          fontSize: 20,
          color: textColor,
          fontFamily: "Arial, sans-serif",
        },
      },
      tooltip: {
        trigger: tooltip,
        backgroundColor: backgroundColor,
        textStyle: { color: textColor, fontFamily: "Arial, sans-serif" },
        axisPointer: { type: "shadow" },
      },
      toolbox: {
        // top: "10px",
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
        nameTextStyle: { fontSize: 12 },
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { fontSize: 12, rotate: 45 },
      },
      yAxis: {
        type: "value",
        name: quantity,
        axisLine: { lineStyle: { color: textColor } },
      },
      series: seriesData.map((item) => ({
        name: item.name,
        type: item.type,
        smooth: item.smooth,
        symbol: item.symbol,
        symbolSize: item.symbolSize,
        data: item.data,
      })),
    });

    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
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
    timeStart,
    timeEnd,
  ]);

  return <div ref={chartRef} style={{ width: "100%", height: "581px" }} />;
};

export default CheckChartComponent;
