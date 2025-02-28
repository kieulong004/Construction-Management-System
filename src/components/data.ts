import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import { useInOut, useSafety, useVehicles } from "../hooks/useInOut";

export const useChartData = (startDate: string, endDate: string, camera_id: number[]) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation(["dashboard"]);
  const { inOutCounts, timeInOut } = useInOut(startDate, endDate, camera_id);
  const { vehicleCounts, timeVehicle } = useVehicles(startDate, endDate, camera_id);
  const { safetyCounts, timeSafety } = useSafety(startDate, endDate, camera_id);

  const commonProps = {
    tooltip: "axis",
    legend: "0%",
    darkMode: darkMode,
  };


  return {
    chart1: {
      ...commonProps,
      title: t("charts1.workers"),
      xAxisData: [
        t("charts1.day_1"),
        t("charts1.day_2"),
        t("charts1.day_3"),
        t("charts1.day_4"),
      ],
      seriesData: [30, 45, 50, 40],
      day: t("charts1.day"),
    },
    chart2: {
      ...commonProps,
      title: t("charts2.work_progress"),
      xAxisData: [
        t("charts2.contractor_A"),
        t("charts2.contractor_B"),
        t("charts2.contractor_C"),
      ],
      seriesData: [
        {
          name: t("charts2.completed"),
          type: "bar",
          stack: "tasks",
          data: [10, 15, 12],
        },
        {
          name: t("charts2.unfinished"),
          type: "bar",
          stack: "tasks",
          data: [5, 8, 6],
        },
      ],
      contractor: t("charts2.contractor"),
    },
    chart3: {
      ...commonProps,
      title: t("charts3.worker_count"),
      xAxisData: [
        t("charts3.contractor_A"),
        t("charts3.contractor_B"),
        t("charts3.contractor_C"),
      ],
      data: [
        { value: 20, name: t("charts3.contractor_A") },
        { value: 15, name: t("charts3.contractor_B") },
        { value: 10, name: t("charts3.contractor_C") },
      ],
      tooltip: "item",
      contractor: t("charts3.contractor"),
    },
    event: {
      ...commonProps,
      title: t("table-taps.recent_events"),
      xAxisData: [
        t("table-taps.contractor_A"),
        t("table-taps.contractor_B"),
        t("table-taps.contractor_C"),
      ],
      data: [
        { value: 2, name: t("table-taps.contractor_A") },
        { value: 2, name: t("table-taps.contractor_B") },
        { value: 1, name: t("table-taps.contractor_C") },
      ],
      tooltip: "item",
      legend: "5%",
      contractor: t("table-taps.contractor"),
    },
    chart4: {
      ...commonProps,
      title: t("charts4.the_number_of_workers_violating_safety"),
      xAxisData: timeSafety,
      seriesData: [
        {
          data: safetyCounts.map((item) => item.novestCount),
          type: "bar",
          name: t("charts4.safety_vest"),
          stack: "total",
        },
        {
          data: safetyCounts.map((item) => item.nohelmetCount),
          type: "bar",
          name: t("charts4.safety_hat"),
          stack: "total",
        },

      ],
      quantity: t("charts4.quantity"),
      data: [t("charts4.safety_hat"), t("charts4.safety_vest")],
      name: t("charts8.time_of_day"),
    },
    chart5: {
      ...commonProps,
      title: t("charts5.vehicle_count"),
      xAxisData: timeVehicle,
      seriesData: [
        {
          data: vehicleCounts.map((item) => item.totalIn),
          type: "bar",
          stack: "bicycle",
          name: t("charts5.vehicleIn"),
        },
        {
          data: vehicleCounts.map((item) => item.totalOut),
          type: "bar",
          stack: "bicycle",
          name: t("charts5.vehicleOut"),
        }
      ],
      quantity: t("charts5.quantity"),
      data: [t("charts5.vehicleIn"), t("charts5.vehicleOut")],
      name: t("charts8.time_of_day"),
    },
    chart6: {
      ...commonProps,
      title: t("charts6.worker_check_in_out"),
      xAxisData: timeInOut,
      seriesData: [
        {
          data: inOutCounts.map((item) => item.inCount),
          type: "bar",
          name: t("charts6.check_in"),
          stack: "total",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
        },
        {
          data: inOutCounts.map((item) => item.outCount),
          type: "bar",
          name: t("charts6.check_out"),
          stack: "total",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
        },
      ],
      quantity: t("charts6.quantity"),
      data: [t("charts6.check_in"), t("charts6.check_out")],
      name: t("charts8.time_of_day"),
      page: t("charts6.number_of_rows_per_page"),
    },
    chart7: {
      ...commonProps,
      title: t("charts7.safety_training_rate"),
      data: [
        { value: 90, name: t("charts7.trained") },
        { value: 10, name: t("charts7.not_trained") },
      ],
      tooltip: "item",
      status: t("charts7.status"),
      quantity: t("charts7.quantity"),
    },
    chart8: {
      ...commonProps,
      title: t("charts8.workers_on_site"),
      SeriesData: [
        {
          data: [20, 35, 50, 80, 65, 45, 30, 25],
          type: "line",
          name: t("charts8.quantity"),
          smooth: true,
          areaStyle: {},
        },
      ],
      xAxisData: timeInOut,
      name: t("charts8.time_of_day"),
      quantity: t("charts8.quantity"),
    },
  };
};
