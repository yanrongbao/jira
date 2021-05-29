import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";
// import { ColumnContainer } from './index'
import { Container } from "./kanban-column";
import { Input } from "antd";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  // 获取路由中id参数
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建版本名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
