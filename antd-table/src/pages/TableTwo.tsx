import { Table, Tag } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";

export const TableTwo = () => {
  const [alreadySelectedRows, setAlreadySelectedRows] = useState([]);

  interface DataType {
    key: number;
    id: number;
    name: string;
    grade: string;
  }
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Grade",
      dataIndex: "grade",
      render: (tag: string) => {
        const color = tag.includes("A")
          ? "Green"
          : tag.includes("C")
          ? "Red"
          : "Blue";
        return <Tag color={color}>{tag}</Tag>;
      },
      // onCell: () => ({ Tag }),
    },
  ];
  const dataSrc: DataType[] = [
    { key: 1, id: 1, name: "Name 1", grade: "C" },
    { key: 2, id: 2, name: "Name 2", grade: "B" },
    { key: 3, id: 3, name: "Name 3", grade: "A+" },
    { key: 4, id: 4, name: "Name 4", grade: "A" },
  ];

  const rowSelection: TableRowSelection<{
    key: number;
    id: number;
    name: string;
    grade: string;
  }> = {
    type: "checkbox",
    onSelect: (record) => {
      console.log(record);
    },
    // satırların hepsi seçildiğinde true döner
    onSelectAll: (record) => {
      console.log(record);
    },
    onCell: (record, rowIndex) => {
      return {
        // chechbox veya radio buton cevresine tıklandıgında calısıyor tam anlamadım
        onClick: (ev) => {
          console.log(record, rowIndex);
          console.log(ev.target);
          console.log("Content: ", ev.currentTarget);
        },
      };
    },
    onSelectMultiple: (record) => {
      console.log(record);
    },
    // renderCell: (checked, record, idx, originNode) => {
    //   if (idx === 0) {
    //     return {
    //       children: originNode,
    //       props: { rowSpan: 2 },
    //     };
    //   } else if (idx === 1) {
    //     return {
    //       children: originNode,
    //       props: { rowSpan: 0, hidden: true },
    //     };
    //   }
    // },
    // renderCell: (_value, _record, _index, originNode) => ({
    //   props: { "data-testid": "table-row-selections-cell" },
    //   children: originNode,
    // }),
    selectedRowKeys: alreadySelectedRows,
    onChange: (keys: any, selectedRow) => {
      setAlreadySelectedRows(keys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "even",
        text: "Select even rows",
        onSelect: (allKeys) => {
          const evenRows: any = allKeys.filter((e: any) => {
            return e % 2 == 0;
          });
          setAlreadySelectedRows(evenRows);
        },
      },
      {
        key: "excellent",
        text: "Select A and A+",
        onSelect: (allKeys) => {
          const excellentRows: any = allKeys.filter((e: any) => {
            return dataSrc.find((person) => {
              return person.key == e && person.grade.includes("A");
            });
          });
          console.log(excellentRows);

          setAlreadySelectedRows(excellentRows);
        },
      },
    ],
  };

  return (
    <>
      {alreadySelectedRows}
      <Table
        style={{ marginTop: "20px" }}
        columns={columns}
        dataSource={dataSrc}
        rowSelection={rowSelection}
      ></Table>
    </>
  );
};
