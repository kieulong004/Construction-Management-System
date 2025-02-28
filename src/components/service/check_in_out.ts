import { AxiosResponse } from "axios";
import intance from "../config/api";

export const getInOutData = async <T>(
    startDate: string,
    endDate: string,
    camera_id: number[],
    endpoint: string
): Promise<T[]> => {
    try {
        const cameraIds = camera_id.join(',');
        const response: AxiosResponse<T[]> = await intance.get(`/api/${endpoint}/filter?fromdate=${startDate}&todate=${endDate}&device_id=[${cameraIds}]`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}