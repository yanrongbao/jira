import { Form, Input } from "antd";
import { UseSelect } from "components/user-select";
import { Project } from "type/project";
import { User } from "../../type/User";
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParams: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ param, setParams }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParams({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UseSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => {
            setParams({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
