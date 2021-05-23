import {
  useEditConfig,
  useDeleteConfig,
  useAddConfig,
} from "./use-optimistic-options";
import { Project } from "type/project";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useProjectId = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    [`project`, { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
