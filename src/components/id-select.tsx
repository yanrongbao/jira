import { Select } from "antd";
import { Row } from "type";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "options" | "onChange"> {
  value?: Row | undefined | null;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
  onChange: (value?: number) => void;
}
/**
 * value可以传入各种类型的值
 * onChange只会回掉number ｜ undefined
 * 当isNaN(Number(value))为true的时候代表选择默认值
 * 当选择默认值当时候，onChange才会回掉undefined
 * @param props
 * @returns
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, defaultOptionName, options, onChange, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      {...restProps}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
