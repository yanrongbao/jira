import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Row } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "components/libs";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParams] = useProjectSearchParams();
  const { data: list, isLoading, error } = useProject(useDebounce(param, 300));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row justify={"space-between"} align={"middle"}>
        <h1 style={{ marginBottom: 0 }}>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        param={param}
        users={users || []}
        setParams={setParams}
      ></SearchPanel>
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;
