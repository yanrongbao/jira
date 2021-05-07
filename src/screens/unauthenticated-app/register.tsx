import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "utils/useAsync";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    try {
      if (cpassword !== values.password) {
        onError(new Error("请确认两次输入密码相同"));
        return;
      }
      await run(register(values));
    } catch (error) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，用户名：{user.name}</div> : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" name="" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" name="" id={"password"} />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input
          placeholder={"确认密码"}
          type="password"
          name=""
          id={"cpassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
