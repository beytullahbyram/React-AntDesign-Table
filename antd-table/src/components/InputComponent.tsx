import React from "react";
import { Input } from "antd";
interface Iparams {
  key: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  allowClear: boolean | { clearIcon?: React.ReactNode } | undefined;
  disabled: boolean | undefined;
  status?: "" | "error" | "warning" | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
export function InputComponent({
  key,
  name,
  value,
  allowClear,
  disabled,
  onChange,
  status,
}: Iparams) {
  return (
    <>
      <Input
        style={{ margin: "10px" }}
        placeholder="dışarıdan gelen input component"
        key={key}
        name={name}
        value={value}
        allowClear={allowClear}
        disabled={disabled}
        onChange={onChange}
        status={status}
      />
    </>
  );
}
