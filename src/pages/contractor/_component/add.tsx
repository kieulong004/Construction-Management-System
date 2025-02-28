import { Form, Input, Button, Card } from "antd";

interface IContractor {
  name: string;
}

const AddContractor = () => {
  const [form] = Form.useForm<IContractor>();

  const onFinish = (values: IContractor) => {
    console.log(values);
  };

  return (
    <Card
      title="Thêm nhà thầu"
      style={{ maxWidth: 600,minHeight:600, margin: "20px auto", padding: 20, backgroundColor: "#fff" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ contractor: "contractor1" }}
        style={{ padding: 20 }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên nhà thầu" }]}
        >
          <Input placeholder="Nhập tên nhà thầu" />
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

export default AddContractor;
