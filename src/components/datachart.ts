import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import { EChartsOption } from "echarts";

interface CustomEChartsOption extends EChartsOption {
  title?: EChartsOption["title"];
  xAxis?: EChartsOption["xAxis"];
  yAxis?: EChartsOption["yAxis"];
  legend?: EChartsOption["legend"];
  series?: EChartsOption["series"];
}

const useChartData = (titleSize: string): { chart1: CustomEChartsOption } => {
  const { darkMode } = useTheme();
  const { t } = useTranslation(["dashboard"]);

  const textColor = darkMode ? "#ffffff" : "#000000";
  const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

  return {
    chart1: {
      backgroundColor: backgroundColor,
      title: {
        text: t("charts6.worker_check_in_out"),
        left: "center",
        textStyle: {
          fontSize: titleSize,
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
        bottom: "0%",
        data: [t("charts6.check_in"), t("charts6.check_out")],
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
        nameTextStyle: {
          fontSize: 12,
          color: textColor,
          fontFamily: "Arial, sans-serif",
        },
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: { fontSize: 12, rotate: 45 },
        axisPointer: { type: "shadow" },
      },
      yAxis: {
        type: "value",
        name: t("charts6.quantity"),
        axisLine: { lineStyle: { color: textColor } },
      },
      series: [
        {
          data: [20, 35, 50, 80, 65, 45, 30, 25],
          type: "line",
          name: t("charts6.check_in"),
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
        },
        {
          data: [15, 15, 30, 50, 55, 35, 20, 15],
          type: "line",
          name: t("charts6.check_out"),
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
        },
      ],
    },
  };
};

export default useChartData;