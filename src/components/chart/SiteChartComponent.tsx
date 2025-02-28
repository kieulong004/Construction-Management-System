import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";

interface SiteChartComponentProps {
  title: string;
  tooltip: string;
  legend: string;
  darkMode: boolean;
  xAxisData: string[];
  name: string;
  quantity: string;
  seriesData: { name: string; type: string; smooth:boolean;areaStyle:object; data: number[] }[];
}

const SiteChartComponent: React.FC<SiteChartComponentProps> = ({
  name,
  title,
  darkMode,
  tooltip,
  xAxisData,
  legend,
  quantity,
  seriesData,
}) => {
  const { t } = useTranslation(["dashboard"]);
  console.log(title);
  useEffect(() => {
    const textColor = darkMode ? "#fff" : "#000";
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById("charts8"));
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
      legend: {
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
        smooth: item.smooth,
        areaStyle: item.areaStyle,
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

  return <div id="charts8" style={{ width: "100%", height: "581px" }}></div>;
};

export default SiteChartComponent;
