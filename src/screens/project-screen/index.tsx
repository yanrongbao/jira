import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic-screen";
import { KanbanScreen } from "screens/kanban-screen";

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </>
  );
};
