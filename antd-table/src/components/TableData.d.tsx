import { ColumnFilterItem, FilterConfirmProps } from "antd/es/table/interface";

export interface DataType {
  key: React.Key;
  id: number;
  name: string;
  email: string;
  address: string;
}
export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
}
