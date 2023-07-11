import type { SelectProps } from "antd";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  message,
  notification,
} from "antd";
import { localeValues } from "../components/ValidateMessageTR.d";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { render } from "react-dom";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
    disabled: false,
  });
}
// const [api, contextHolder] = notification.useNotification();
// const openNotification = () => {
//   api.open({
//     message: "Notification Title",
//     description:
//       "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
//     duration: 0,
//   });
//   console.log("dsasd");
// };
const inputControl = () => {
  message.open({
    type: "warning",
    content: `Contain at least 8 characters,least 1 number, 1 lowercase character (a-z),
    least 1 uppercase character (A-Z)
    contains only 0-9a-zA-Z`,
    duration: 4,
  });
  console.log("sddddddddddd");
};
export const AppForm = () => {
  const handleChange = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <Divider orientation="left" style={{ marginTop: "5%" }}>
        Form
      </Divider>
      <Row style={{ marginLeft: "2%" }}>
        <Col span={8}>
          <Form
            labelCol={{ span: 8, offset: 1 }}
            wrapperCol={{ span: 24 }}
            //Uyarı mesajlarının olduğu değişken, isteğe göre farklı diller ile yapılabilir
            validateMessages={localeValues.Form?.defaultValidateMessages}
            autoComplete="off"
            onFinish={(values) => console.log(values)}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, type: "string", whitespace: true, min: 5 },
              ]}
              hasFeedback
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true, whitespace: true, type: "email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              hasFeedback
              rules={[
                { required: true, whitespace: true, min: 6, max: 15 },
                {
                  type: "regexp",
                  pattern: new RegExp(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                  ),
                },
                {
                  validator: (_, value: string) =>
                    value && value.includes("A")
                      ? Promise.resolve()
                      : Promise.reject("not contain captial letters"),
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                // onSelectCapture={inputControl} //tab ile gelince
                // onMouseEnter={inputControl} //maouse ile üstüne geldiğinde
                onFocus={inputControl}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  type: "regexp",
                  pattern: new RegExp(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                  ),
                },
                ({ getFieldValue }) => ({
                  // (ruleobject,value)
                  // _ => {field: 'confirmPassword', fullField: 'confirmPassword', type: 'string', validator: ƒ}
                  validator(_, value) {
                    // getFieldValue => diğer inputtaki password
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve(); //success
                    }
                    return Promise.reject(new Error("password does not match")); //wrong
                  },
                }),
              ]}
            >
              <Input.Password placeholder="dont + * " onFocus={inputControl} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, whitespace: true }]}
            >
              <Select
                onChange={handleChange}
                style={{ width: 200 }}
                options={options}
              />
            </Form.Item>
            <Form.Item
              name="dateorBith"
              label="Date of Birth"
              rules={[{ required: true, type: "date" }]}
            >
              <DatePicker placeholder="Chose Date of Birth" />
            </Form.Item>
            <Form.Item name="website" label="Website" rules={[{ type: "url" }]}>
              <Input placeholder="Website" />
            </Form.Item>
            <Form.Item
              name="agreement"
              rules={[{ required: true, type: "date" }]}
              valuePropName="checked"
            >
              <Checkbox>
                Agree to our <a href="">Terms and condiotions</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
