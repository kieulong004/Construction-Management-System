import { useEffect } from "react";
import * as echarts from "echarts";

export const useChart = (id: string, options: echarts.EChartsOption) => {
  useEffect(() => {
    console.log(id)
    console.log(options.title)
    const chartElement = document.getElementById(id);
    if (!chartElement) return;

    let chart = echarts.getInstanceByDom(chartElement);
    if (!chart) {
      chart = echarts.init(chartElement);
    }
    chart.setOption(
      {
        ...options,
        title: {
          ...options.title,
        },
        tooltip: {
          ...options.tooltip,
        },
        legend: {
          ...options.legend,
        },
        xAxis: options.xAxis ? { ...options.xAxis } : undefined,
        yAxis: options.yAxis ? { ...options.yAxis } : undefined,
      },
      { notMerge: false, lazyUpdate: true }
    );

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id, options]);
};

