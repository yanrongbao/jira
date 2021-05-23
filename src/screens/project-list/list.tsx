import { User } from "screens/project-list/search-panel";
import { Dropdown, Menu, Table, TableProps, Modal } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/rate";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/libs";
import { useProjectModal, useProjectQueryKey } from "./util";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  reFresh?: () => void;
}
export const List = ({ users, reFresh, ...props }: ListProps) => {
  const { open } = useProjectModal();
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      {...props}
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "name",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (value, project) => {
            return project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无";
          },
        },
        {
          render: (value, project) => {
            return <MoreList project={project} />;
          },
        },
      ]}
    />
  );
};

const MoreList = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirm = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk: () => {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={() => editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item key={"delelte"} onClick={() => confirm(project.id)}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
