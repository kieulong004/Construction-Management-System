export interface IEvent {
  id: string;
  device_id: string;
  employee_id: string;
  employee_name: string;
  event_code: string;
  event_time: string;
  normal_image: string;
  yolo_image: string;
  safety_hat: number;
  safety_vest: number;
}

export interface IIn_Out_Event {
  id: string;
  camera_id: string;
  time: string;
  inout: string;
  file_save_location: string;
}

export interface ISafety_Event {
  id: string;
  camera_id: string;
  time: string;
  description: string;
  save_file_location: string;
}

export interface IVehicle_event {
  id: string;
  camera_id: string;
  inout: string;
  save_file_location: string;
  time: string;
  vehicle_type: string;
}

export interface ICamera {
  IP?: string;
  RTSP_link?: string;
  id: string;
  location?: string;
  name?: string;
  password?: string;
  username?: string;
}

export interface IDevice {
  id: string;
  device_description?: string;
  device_ip?: string;
  device_location?: string;
  device_mac?: string;
  device_name?: string;
  device_password?: string;
  device_status?: string;
  device_username?: string;
}
