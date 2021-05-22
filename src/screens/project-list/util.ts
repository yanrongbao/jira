import { useProjectId } from "./../../utils/project";
import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索等参数
export const useProjectSearchParams = () => {
  const [param, setParams] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParams,
  ] as const;
};

export const useProjectModal = () => {
  const [
    { projectCreate, editProjectId },
    setProjectCreate,
  ] = useUrlQueryParam(["projectCreate", "editProjectId"]);
  // const [{ editProjectId }, setEditProjectId] = useUrlQueryParam([
  //   'editProjectId'
  // ])
  const { data: projectDetail, isLoading } = useProjectId(
    Number(editProjectId)
  );
  const startEdit = (id: number) => setProjectCreate({ editProjectId: id });
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setProjectCreate({ editProjectId: undefined, projectCreate: undefined });
  };
  return {
    editProjectId,
    projectDetail,
    isLoading,
    projectModalOpen: projectCreate === "true" || Boolean(editProjectId),
    open,
    close,
    startEdit,
  };
};
