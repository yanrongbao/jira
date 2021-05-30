import { Divider, List, Popover, Typography } from "antd";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./libs";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, refetch } = useProject();
  const pinnedProject = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project) => (
          <List key={project.id}>
            <List.Item.Meta title={project.name} />
          </List>
        ))}
        <Divider />

        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </List>
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
