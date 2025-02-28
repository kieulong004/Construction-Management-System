import { Form, Input, DatePicker, Select, Button, Card, Row, Col } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

interface ILabor {
  name: string;
  dob: dayjs.Dayjs;
  contractor: string;
  safetyTrainingDate: dayjs.Dayjs;
}

const AddLabor = () => {
  const [form] = Form.useForm<ILabor>();

  const onFinish = (values: ILabor) => {
    const formattedValues = {
      ...values,
      dob: values.dob.format("DD/MM/YYYY"),
      safetyTrainingDate: values.safetyTrainingDate.format("DD/MM/YYYY"),
    };

    console.log(formattedValues);
  };

  return (
    <Card title="Thêm công nhân" style={{ maxWidth: 600, minHeight: 600, margin: "20px auto", padding: 20, backgroundColor: "#fff" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ contractor: "contractor1" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên công nhân" }]}
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nhà thầu"
              name="contractor"
              rules={[{ required: true, message: "Vui lòng chọn Nhà thầu" }]}
            >
              <Select placeholder="Chọn nhà thầu">
                <Option value="contractor1">Nhà thầu 1</Option>
                <Option value="contractor2">Nhà thầu 2</Option>
                <Option value="contractor3">Nhà thầu 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Ngày học an toàn"
          name="safetyTrainingDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày học an toàn!" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" showTime />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddLabor;