import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [param, setParams] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const client = useHttp();
  const debounceParam = useDebounce(param, 300);
  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParam),
    }).then(setList);
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        users={users}
        setParams={setParams}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
