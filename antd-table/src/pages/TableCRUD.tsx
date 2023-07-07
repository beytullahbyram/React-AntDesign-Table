import { Button, Col, Input, Modal, Row, Space, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { DataType, FilterDropdownProps } from "../components/TableData.d";

export const TableCRUD = () => {
  //inputları doldurmak için oluşturduğumuz state
  const [inputData, setInputData] = useState({} as DataType | any | null);
  //modalın açılıp açılmayacağını kontrol ettiğimiz state
  const [isEditing, setIsEditing] = useState(false);
  //modalda ki inputları doldurmak için oluşturduğumu state
  const [isEditingPerson, setIsEditingPerson] = useState<DataType | null>();
  const { Search } = Input;
  const randomId = Math.round(Math.random() * 100);

  //#region DATA  COLUMNS
  const [dataSrc, setDataSrc] = useState<DataType[]>([
    {
      key: "1",
      id: randomId,
      name: "ayşe 1",
      email: "name1@hotmail.com",
      address: "name 1 address",
    },
    {
      key: "2",
      id: randomId + 1,
      name: "ahmet 2",
      email: "2@hotmail.com",
      address: "name 2 address",
    },
    {
      key: "3",
      id: randomId + 2,
      name: "mehmet",
      email: "3@hotmail.com",
      address: "name 3 address",
    },
    {
      key: "4",
      id: randomId + 3,
      name: "veli 4",
      email: "4@hotmail.com",
      address: "name 4 address",
    },
    {
      key: "5",
      id: randomId + 4,
      name: "john 5",
      email: "5@hotmail.com",
      address: "name 5 address",
    },
  ]);

  const columns: any = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
      sorter: (a: DataType, b: DataType) => a.id - b.id,
    },
    {
      key: "2 ",
      title: "Name",
      dataIndex: "name",
      filterIcon: () => {
        return <SearchOutlined />;
      },
      filterDropdown: ({
        setSelectedKeys, //array,  (selectedKeys: React.Key[]) => void;
        selectedKeys, //inputa yazılan anlık değer
        confirm, //aramayı başlatan kabul eden fonksiyon
        clearFilters,
      }: FilterDropdownProps) => {
        return (
          <>
            {/* <Input
              autoFocus
              placeholder="Name searching"
              value={selectedKeys[0]}
              onChange={(e: any) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => confirm()}
              onBlur={() => confirm()}
            ></Input> */}
            <Search
              autoFocus={true}
              value={selectedKeys[0]}
              placeholder="Name searching"
              onChange={(e: any) => {
                //inputtaki değer varsa onu geri döndür
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                //Hiç bir butona veya tuşa basmadan arama yapmak istiyorsak burada confirm() kullanmalıyız ama onchange mantıgından dolayı
                //Tek harf ile menü kapanıyor bunun için içindeki paramete kullanılır
                confirm({ closeDropdown: false });
              }}
              //enter tuşu
              onPressEnter={() => confirm()}
              //input içine değeri yazdıktan sonra herhangi bir yere tıklandığında arama gerçekleşir
              onBlur={() => confirm()}
              //bu secenek input içindeki allowclear ile sildikten sonra tablo eski haline dönmesini saglıyor
              //yani input içinde bir arama vs. saglıyor
              onSearch={() => confirm()}
              enterButton
              allowClear={{
                clearIcon: <DeleteFilled />,
              }}
            />
          </>
        );
      },
      onFilter: (value: string, record: DataType) => {
        //tablodaki değer inputtakini içeriyorsa geri döndür
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    { key: "3", title: "Email", dataIndex: "email" },
    { key: "4", title: "Address", dataIndex: "address" },
    {
      key: "5",
      title: "Actions",
      render: (record: DataType) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditPerson(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeletePerson(record);
              }}
              style={{ color: "red" }}
            />
          </>
        );
      },
    },
  ];
  //#endregion

  //#region Input change
  const onAddingInput = (event: any) => {
    const { name, value } = event.target;
    setInputData((prev: DataType) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputData);
  };
  //#endregion

  //#region Button
  //inputtaki bilgilerle tabloya yeni veri ekler
  const onAddTable = () => {
    setDataSrc((prev) => {
      inputData.id = randomId;
      inputData.key = randomId.toString();
      return [...prev, inputData];
    });
    setInputData(null);
  };
  //tabloya random veri ekler
  const onAdd = () => {
    const newPerson: DataType = {
      key: randomId,
      id: randomId,
      name: `Name ${randomId}`,
      email: `name${randomId}@hotmail.com`,
      address: `name ${randomId} address`,
    };
    setDataSrc((prev) => {
      return [...prev, newPerson];
    });
  };
  //#endregion
  //#region Rowdaki düzenle ve sil butonları
  const onDeletePerson = (record: DataType) => {
    Modal.confirm({
      title: "Are u sure, u want to delete this person",
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        icon: <ExclamationCircleFilled />,
      },
      onOk: () => {
        setDataSrc((prev) => {
          return prev.filter((person) => person.id != record.id);
        });
      },
    });
  };
  //Modal açılır ve inputlar seçilen data ile dolar
  const onEditPerson = (record: DataType) => {
    setIsEditing(true);
    setIsEditingPerson({ ...record });
  };
  //#endregion
  //modaldaki inputu temizler
  const resetEditing = () => {
    setIsEditing(false);
    setIsEditingPerson(null);
  };
  //Tabloda row tıklandığında verileri inputa getirir
  function InputChange(record: any) {
    setInputData(record);
  }
  return (
    <>
      <Space
        size={20}
        style={{ margin: "2% 0% 1% 0%", position: "relative", right: "12%" }}
      >
        <Button type="primary" onClick={onAdd}>
          Random person add
        </Button>
        <Button type="primary" onClick={onAddTable}>
          Input person add
        </Button>
      </Space>
      <Row gutter={30}>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Input
              key="name"
              placeholder="Name"
              name="name"
              value={inputData?.name}
              onChange={onAddingInput}
            />
            <Input
              key="email"
              placeholder="Email"
              name="email"
              value={inputData?.email}
              onChange={onAddingInput}
            />
            <Input
              key="address"
              placeholder="Address"
              name="address"
              value={inputData?.address}
              onChange={onAddingInput}
            />
          </Space>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={19}>
          <Table
            columns={columns}
            dataSource={dataSrc}
            onRow={(record) => {
              return {
                onClick: () => {
                  InputChange(record);
                },
              };
            }}
          ></Table>
          <Modal
            title="Edit person"
            okText="Save"
            visible={isEditing}
            onCancel={() => resetEditing()}
            onOk={() => {
              setDataSrc((prev: any) => {
                return prev.map((person: any) => {
                  return person.id === isEditingPerson?.id
                    ? isEditingPerson
                    : person;
                });
              });
              resetEditing();
            }}
          >
            <Input
              value={isEditingPerson?.name}
              onChange={(e) => {
                setIsEditingPerson((prev: any) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            ></Input>
            <Input
              value={isEditingPerson?.address}
              onChange={(e) => {
                setIsEditingPerson((prev: any) => {
                  return { ...prev, address: e.target.value };
                });
              }}
            ></Input>
            <Input
              value={isEditingPerson?.email}
              onChange={(e) => {
                setIsEditingPerson((prev: any) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            ></Input>
          </Modal>
        </Col>
      </Row>
    </>
  );
};
