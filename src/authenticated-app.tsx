import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "components/libs";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={logout}>登出</Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
