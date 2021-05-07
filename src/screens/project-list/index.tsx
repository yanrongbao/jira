import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/users";

export const ProjectListScreen = () => {
  const [param, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 300);
  const { data: list, isLoading, error } = useProject(debounceParam);
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
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
      ></List>
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
