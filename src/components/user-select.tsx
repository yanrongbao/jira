import React from "react";
import { useUsers } from "utils/users";
import { IdSelect } from "./id-select";

export const UseSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};