import { User } from "../screens/project-list/search-panel";
import React, { useState, ReactNode } from "react";
import * as auth from "auth-provider";

interface AuthFrom {
  username: string;
  password: string;
}

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
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthFrom) => auth.login(form).then(setUser);
  const register = (form: AuthFrom) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

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
