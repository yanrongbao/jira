import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [param, setParams] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 300);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel
        param={param}
        users={users}
        setParams={setParams}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
