import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "utils/useAsync";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { user, login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
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
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
