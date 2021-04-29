import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
export const Login = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login?`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">登录名</label>
        <input type="text" name="" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="" id="password" />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};