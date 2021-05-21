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
  const [{ projectModal }, setProjectModal] = useUrlQueryParam([
    "projectModal",
  ]);

  const open = () => setProjectModal({ projectModal: true });
  const close = () => setProjectModal({ projectModal: undefined });

  return {
    projectModalOpen: projectModal === "true",
    open,
    close,
  };
};
