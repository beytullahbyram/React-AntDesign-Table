import { Button, Form, Input, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: `${i}`,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export const EditableRows2: React.FC = () => {
  const [data, setData] = useState<Item[]>(originData);
  const [editinRow, setEditingRow] = useState<any>(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      render: (text: string, record: Item) => {
        if (editinRow === record.key) {
          return (
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      render: (text: string, record: Item) => {
        if (editinRow === record.key) {
          return (
            <Form.Item name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Actions",
      width: "40%",
      render: (_: string, record: Item) => {
        return (
          <>
            <Form>
              {/* Tıklanan satırın bilgilerini setEditingRow'a gönderir */}
              <Button
                onClick={() => {
                  setEditingRow(record.key);
                  //inputları doldurduk
                  form.setFieldsValue({
                    name: record.name,
                    address: record.address,
                  });
                }}
              >
                Edit
              </Button>
              <Button htmlType="submit">Save</Button>
            </Form>
          </>
        );
      },
    },
  ];
  const onFinish = (values: Item) => {
    const updatedDataSrc = [...data];
    // editinRowdan başla 1.ögeyi kaldır valuesi ekle
    updatedDataSrc.splice(editinRow, 1, { ...values, key: editinRow });
    setData(updatedDataSrc);
    setEditingRow(null);
  };
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Table dataSource={data} columns={columns}></Table>;
      </Form>
    </>
  );
};
