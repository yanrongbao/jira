import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
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
