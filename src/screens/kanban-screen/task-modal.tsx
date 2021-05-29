import { Button, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { TaskTypeSelect } from "components/task-type-select";
import { UseSelect } from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "确定",
      cancelText: "删除",
      title: "确定删除任务吗?",
      onOk: () => {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <FormItem
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </FormItem>
        <FormItem label={"经办人"} name={"processorId"}>
          <UseSelect defaultOptionName={"经办人"} />
        </FormItem>
        <FormItem label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </FormItem>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={startDelete} style={{ fontSize: 14 }} size={"small"}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
