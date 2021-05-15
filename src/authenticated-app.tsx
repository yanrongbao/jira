import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "context/auth-context";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project-screen";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/libs";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        porjectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type={"link"}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  porjectButton={
                    <ButtonNoPadding
                      onClick={() => setProjectModalOpen(true)}
                      type={"link"}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={window.location.pathname + "/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
        }}
      ></ProjectModal>
    </Container>
  );
};

const PageHeader = (props: { porjectButton: JSX.Element }) => {
  return (
    <Header between>
      <HeaderLeft gap>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={logout}>登出</Menu.Item>
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}>hi, {user?.name}</a>
    </Dropdown>
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
