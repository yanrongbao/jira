import { Divider, List, Popover, Typography } from "antd";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./libs";

export const ProjectPopover = (props: {
  onProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects } = useProject();
  const pinnedProject = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project) => (
          <List>
            <List.Item.Meta title={project.name} />
          </List>
        ))}
        <Divider />
        <ButtonNoPadding
          onClick={() => props.onProjectModalOpen(true)}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </List>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
