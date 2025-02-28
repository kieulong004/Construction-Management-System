import { AxiosResponse } from "axios";
import { IEvent, IIn_Out_Event, ISafety_Event, IVehicle_event } from "../common/type";
import instance from "../config/api";

const fetchData = async <T>(endpoint: string): Promise<T[]> => {
    try {
        const response: AxiosResponse<T[]> = await instance.get(`/api/${endpoint}?limit=5`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return [];
    }
};

export const getEvent = async (name: string): Promise<IEvent[]> => {
    return fetchData<IEvent>(name);
};

export const getInOutEvents = async (name: string): Promise<IIn_Out_Event[]> => {
    return fetchData<IIn_Out_Event>(name);
};

export const getSafetyEvents = async (name: string): Promise<ISafety_Event[]> => {
    return fetchData<ISafety_Event>(name);
};

export const getVehicleEvents = async (name: string): Promise<IVehicle_event[]> => {
    return fetchData<IVehicle_event>(name);
};