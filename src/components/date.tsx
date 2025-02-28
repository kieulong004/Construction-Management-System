import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

export interface IVehicle_event {
  id: string;
  camera_id: string;
  inout: string;
  save_file_location: string;
  time: string;
  vehicle_type: string;
}

const data: IVehicle_event[] = [
  {
    id: '1',
    camera_id: 'cam1',
    inout: 'in',
    save_file_location: '/path/to/file1.jpg',
    time: '2023-10-01 10:00:00',
    vehicle_type: 'Motorbike',
  },
  {
    id: '2',
    camera_id: 'cam2',
    inout: 'out',
    save_file_location: '/path/to/file2.jpg',
    time: '2023-10-01 11:00:00',
    vehicle_type: 'Bicycle',
  },
  {
    id: '3',
    camera_id: 'cam3',
    inout: 'in',
    save_file_location: '/path/to/file3.jpg',
    time: '2023-10-01 12:00:00',
    vehicle_type: 'Motorbike',
  },
];

const App: React.FC = () => (
  <Table<IVehicle_event> dataSource={data}>
    <Column title="Giờ trong ngày" dataIndex="id" key="id" />
    <ColumnGroup title="Motorbike">
      <Column title="số lần in" dataIndex="10" key="inout" />
      <Column title="số lần out" dataIndex="inout" key="inout" />
    </ColumnGroup>
    <ColumnGroup title="Bicycle">
      <Column title="số lần in" dataIndex="inout" key="inout" />
      <Column title="số lần out" dataIndex="inout" key="inout" />
    </ColumnGroup>
  </Table>
);

export default App;