import React, { useState } from "react";
import { Table, TableColumnsType, Col, Row, Divider, Button, Form } from "antd";
import * as dayjs from "dayjs";
import { InputComponent } from "../components/InputComponent";
import { DatePickerComponent } from "../components/DatePickerComponent";
import { PoweroffOutlined } from "@ant-design/icons";
interface DataType {
  key: React.Key;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  address: string | null;
  tags: string[] | null;
  date: string | null;
}
interface InputType {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
  date: string;
}
const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    date: "01.01.2023",
  },
  {
    key: "2",
    firstName: "Jimsdfadsfsasdasdasdas",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    date: "11/12/2023",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    date: "02-09-1998",
  },
];
const columns: TableColumnsType<DataType> = [
  { title: "key", dataIndex: "key", key: "key" },
  { title: "firstName", dataIndex: "firstName", key: "firstName" },
  { title: "age", dataIndex: "age", key: "age" },
  { title: "address", dataIndex: "address", key: "address" },
  { title: "tags", dataIndex: "tags", key: "tags" },
  { title: "date", key: "date", dataIndex: "date" },
];
const App: React.FC = () => {
  const [InputChangeState, setInputChangeState] = useState({} as InputType);
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };
  function InputChange(record: any) {
    setInputChangeState(record);
  }
  const handleClick = (event: any) => {
    const { name, value } = event.target;
    setInputChangeState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("save");
  };
  //----
  return (
    <>
      <Row gutter={50}>
        <Col span={18} push={6} style={{ backgroundColor: "darkkhaki" }}>
          <Row>
            <Button
              htmlType="reset"
              icon={<PoweroffOutlined />}
              size="middle"
              type="primary"
              style={{ margin: "8px 8px" }}
              // onClick={(e) => onClear(e)}
            >
              All clear
            </Button>
            <Button
              size="middle"
              type="primary"
              style={{ margin: "8px 8px" }}
              onClick={(e) => onSave(e)}
            >
              Save
            </Button>
          </Row>
          <Table
            style={{ paddingTop: "10px" }}
            onRow={(record) => {
              return {
                onClick: (event: React.MouseEvent<any, MouseEvent>) => {
                  InputChange(record);
                },
              };
            }}
            dataSource={data}
            columns={columns}
          ></Table>
        </Col>
        <Col span={6} pull={18} style={{ backgroundColor: "darkblue" }}>
          <InputComponent
            key={"firstName"}
            name={"firstName"}
            value={InputChangeState.firstName}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
          <InputComponent
            key={"age"}
            name={"age"}
            value={InputChangeState.age}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
          <InputComponent
            key={"address"}
            name={"address"}
            value={InputChangeState.address}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
          <InputComponent
            key={"lastName"}
            name={"lastName"}
            value={InputChangeState.lastName}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
          <InputComponent
            key={"tags"}
            name={"tags"}
            value={InputChangeState.tags}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
          <DatePickerComponent
            key={"date"}
            format={"DD.MM.YYYY"}
            value={dayjs(InputChangeState.date)} //string ifadeyi datapictera çevirdik
          />
        </Col>
      </Row>

      <Divider orientation="right">Horizontal</Divider>

      <Row gutter={30} justify="space-around">
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>

      <Divider orientation="left">Responsive</Divider>
      <Row>
        <Col
          span={6}
          xs={{ order: 1 }}
          sm={{ order: 2 }}
          md={{ order: 3 }}
          lg={{ order: 4 }}
        >
          1 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 2 }}
          sm={{ order: 1 }}
          md={{ order: 4 }}
          lg={{ order: 3 }}
        >
          2 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 3 }}
          sm={{ order: 4 }}
          md={{ order: 2 }}
          lg={{ order: 1 }}
        >
          3 col-order-responsive
        </Col>
        <Col
          span={6}
          xs={{ order: 4 }}
          sm={{ order: 3 }}
          md={{ order: 1 }}
          lg={{ order: 2 }}
        >
          4 col-order-responsive
        </Col>
      </Row>

      <Row style={style}>
        {/*xs, sm, md, lg, xl içindeki sayılar  sütunu ekranın o anki değerine göre(sm,md,...) büyük veya küçük gösterecek  */}
        {/* xs	screen < 576px */}
        {/* // sm screen ≥ 576px */}
        {/* md	screen ≥ 768px */}
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <InputComponent
            key={"firstName"}
            name={"firstName"}
            value={InputChangeState.firstName}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <InputComponent
            key={"firstName"}
            name={"firstName"}
            value={InputChangeState.firstName}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <InputComponent
            key={"firstName"}
            name={"firstName"}
            value={InputChangeState.firstName}
            allowClear
            disabled={false}
            onChange={handleClick}
          />
        </Col>
      </Row>
    </>
  );
};
export default App;
