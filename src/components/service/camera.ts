import { AxiosResponse } from "axios";
import { ICamera, IDevice } from "../common/type";
import intance from "../config/api";

export const getCameras = async (): Promise<ICamera[]> => {
  try {
    const response: AxiosResponse<ICamera[]> = await intance.get(
      "/api/cameras"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDevices = async (): Promise<IDevice[]> => {
    try {
      const response: AxiosResponse<IDevice[]> = await intance.get(
        "/api/devices"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

export const getCamerasById = async (id:string): Promise<ICamera[]> => {
  try {
    const response: AxiosResponse<ICamera[]> = await intance.get(
      `/api/cameras/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDevicesById = async (id:string): Promise<IDevice[]> => {
    try {
      const response: AxiosResponse<IDevice[]> = await intance.get(
        `/api/devices/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  