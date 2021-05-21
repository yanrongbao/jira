import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding } from "components/libs";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParams] = useProjectSearchParams();
  const { data: list, retry, isLoading, error } = useProject(
    useDebounce(param, 300)
  );
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
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        reFresh={retry}
      ></List>
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
