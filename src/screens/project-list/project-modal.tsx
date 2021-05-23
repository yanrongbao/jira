import { Form, Button, Drawer, Input, Spin } from "antd";
import { UseSelect } from "components/user-select";
import { useForm } from "antd/es/form/Form";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./util";
import { ErrorBox } from "components/libs";
import { useEffect } from "react";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editProjectId,
    projectDetail,
    isLoading,
  } = useProjectModal();
  const useMutateProject = editProjectId ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectQueryKey()
  );
  const [form] = useForm();
  const title = editProjectId ? "编辑项目" : "创建项目";
  const onFinish = (values: any) => {
    mutateAsync({ ...projectDetail, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(projectDetail);
  }, [projectDetail, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UseSelect defaultOptionName={"负责人"}></UseSelect>
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  创建
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
