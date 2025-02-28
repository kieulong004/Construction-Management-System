import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IIn_Out_Event, ISafety_Event, IVehicle_event } from "../components/common/type";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getInOutData } from "../components/service/check_in_out";

export const useInOut = (
  startDate: string,
  endDate: string,
  camera_id: number[]
) => {
  const [inOutData, setInOutData] = useState<IIn_Out_Event[]>([]);
  dayjs.extend(utc);

  const timeInOut = useMemo(
    () => [
      "0-3h",
      "3-6h",
      "6-9h",
      "9-12h",
      "12-15h",
      "15-18h",
      "18-21h",
      "21-24h",
    ],
    []
  );

  const fetchInOutData = useCallback(async () => {
    try {
      const response = await getInOutData<IIn_Out_Event>(
        startDate,
        endDate,
        camera_id,
        "inout"
      );
      setInOutData(response);
    } catch (error) {
      console.error("Error fetching camera data:", error);
    }
  }, [startDate, endDate, camera_id]);

  useEffect(() => {
    fetchInOutData();
  }, [fetchInOutData]);

  const filterDataByTimeOfDay = useCallback(
    (data: IIn_Out_Event[], timeOfDay: string[]) => {
      return timeOfDay.map((time) => {
        const [start, end] = time
          .split("-")
          .map((t) => parseInt(t.replace("h", ""), 10));
        const filteredData = data.filter((item) => {
          const hour = dayjs.utc(item.time).hour();
          return hour >= start && hour < end;
        });

        const inCount = filteredData.filter(
          (item) => item.inout === "in"
        ).length;
        const outCount = filteredData.filter(
          (item) => item.inout === "out"
        ).length;

        return { time, inCount, outCount };
      });
    },
    []
  );

  const inOutCounts = useMemo(
    () => filterDataByTimeOfDay(inOutData, timeInOut),
    [inOutData, timeInOut, filterDataByTimeOfDay]
  );

  return { inOutCounts, timeInOut };
};  

export const useSafety = (
  startDate: string,
  endDate: string,
  camera_id: number[]
) => {
  const [safetyData, setSafetyData] = useState<ISafety_Event[]>([]);
  dayjs.extend(utc);

  const timeSafety = useMemo(
    () => [
      "0-3h",
      "3-6h",
      "6-9h",
      "9-12h",
      "12-15h",
      "15-18h",
      "18-21h",
      "21-24h",
    ],
    []
  );

  const fetchSafetyData = useCallback(async () => {
    try {
      const response = await getInOutData<ISafety_Event>(
        startDate,
        endDate,
        camera_id,
        "safeties"
      );
      setSafetyData(response);
    } catch (error) {
      console.error("Error fetching camera data:", error);
    }
  }, [startDate, endDate, camera_id]);

  useEffect(() => {
    fetchSafetyData();
  }, [fetchSafetyData]);

  const filterDataByTimeOfDay = useCallback(
    (data: ISafety_Event[], timeOfDay: string[]) => {
      return timeOfDay.map((time) => {
        const [start, end] = time
          .split("-")
          .map((t) => parseInt(t.replace("h", ""), 10));
        const filteredData = data.filter((item) => {
          const hour = dayjs.utc(item.time).hour();
          return hour >= start && hour < end;
        });

        const nohelmetCount = filteredData.filter(
          (item) => item.description === "nohelmet"
        ).length;
        const novestCount = filteredData.filter(
          (item) => item.description === "novest"
        ).length;

        return { time, nohelmetCount, novestCount };
      });
    },
    []
  );

  const safetyCounts = useMemo(
    () => filterDataByTimeOfDay(safetyData, timeSafety),
    [safetyData, timeSafety, filterDataByTimeOfDay]
  );

  return { safetyCounts, timeSafety };
};

export const useVehicles = (
  startDate: string,
  endDate: string,
  camera_id: number[]
) => {
  const [vehiclesData, setVehiclesData] = useState<IVehicle_event[]>([]);
  dayjs.extend(utc);

  const timeVehicle = useMemo(
    () => [
      "0-3h",
      "3-6h",
      "6-9h",
      "9-12h",
      "12-15h",
      "15-18h",
      "18-21h",
      "21-24h",
    ],
    []
  );

  const fetchVehiclesData = useCallback(async () => {
    try {
      const response = await getInOutData<IVehicle_event>(
        startDate,
        endDate,
        camera_id,
        "vehicles"
      );
      setVehiclesData(response);
    } catch (error) {
      console.error("Error fetching camera data:", error);
    }
  }, [startDate, endDate, camera_id]);

  useEffect(() => {
    fetchVehiclesData();
  }, [fetchVehiclesData]);

  const filterDataByTimeOfDay = useCallback(
    (data: IVehicle_event[], timeOfDay: string[]) => {
      return timeOfDay.map((time) => {
        const [start, end] = time
          .split("-")
          .map((t) => parseInt(t.replace("h", ""), 10));
        const filteredData = data.filter((item) => {
          const hour = dayjs.utc(item.time).hour();
          return hour >= start && hour < end;
        });
  
        const totalIn = filteredData.filter((item) => item.inout === "in").length;
        const totalOut = filteredData.filter((item) => item.inout === "out").length;
  
        return {
          time,
          totalIn,
          totalOut,
        };
      });
    },
    []
  );

  const vehicleCounts = useMemo(
    () => filterDataByTimeOfDay(vehiclesData, timeVehicle),
    [vehiclesData, timeVehicle, filterDataByTimeOfDay]
  );

  return { vehicleCounts, timeVehicle };
};
