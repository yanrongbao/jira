import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useLocation } from "react-router";
import { useProjectId } from "utils/project";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProjectId(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [params, setParams] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
      name: params.name || undefined,
    }),
    [projectId, params]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
