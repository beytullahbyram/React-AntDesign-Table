import { DatePicker } from "antd";
import dayjs from "dayjs";
interface Iparams {
  key: string;
  format: string;
  value: dayjs.Dayjs;
}
export function DatePickerComponent({ key, format, value }: Iparams) {
  return (
    <>
      <DatePicker
        style={{ margin: "10px", width: "100%" }}
        key={key}
        format={format}
        value={value}
      />
    </>
  );
}
