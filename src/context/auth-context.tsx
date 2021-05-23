import { User } from "../screens/project-list/search-panel";
import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageError, FullPageLoading } from "components/libs";
import { useQueryClient } from "react-query";

interface AuthFrom {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 第一步：创建一个context
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthFrom) => Promise<void>;
      login: (form: AuthFrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

// 第二步：创建一个AuthProvider，将方法，熟悉赋值给value
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isIdle,
    isLoading,
    error,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();
  const login = (form: AuthFrom) => auth.login(form).then(setUser);
  const register = (form: AuthFrom) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      queryClient.clear();
      setUser(null);
    });

  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (error) {
    return <FullPageError error={error} />;
  }
  // return AuthContext
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

//第三步，创建一个useAuth hook，返回context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在Provider中使用");
  }
  return context;
};
