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
